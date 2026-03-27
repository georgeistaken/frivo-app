const db = require('../config/firebase.js');  // Connects the firebase.js file to this one
const admin = require('firebase-admin');  // Import firebase-admin for the file to access and use
const cart = [];  // Creating temp storage to store user items to cart

// Get products from firebase. 
const getProducts = async (req, res) => {
    try {
        console.log("Fetching products from Firebase");  // Used to confirm if the function is running

        /* Fetches all docs from firebase and tells the system to wait 
           (await) until it comes back before continuing to avoid the 
           system from crashing */
        const resultSnapshot = await db.collection('products').get();

        // Converts the firebase docs into a usable array
        const products = resultSnapshot.docs.map(doc => {
            const data = doc.data(); 
            const date = data.createdAt.toDate();

            return{
                id: doc.id,   // Firebase generated document ID
                ...data,
                createdAt: date.toLocaleString()  //making the date an time more readable to users
            };
        });

        res.json(products);  // Sends a response - products - as a JSON response to client

    } catch (error) {
        // If theres an error, send the 500 error with a message.
        console.error(error);
        res.status(500).send(error.message);
    }
};

// Get orders from firebase. 
const getOrders = async (req, res) => {
    try {
        console.log("Fetching orders from Firebase");  // Used to confirm if the function is running

        /* Fetches all docs from firebase and tells the system to wait 
           (await) until it comes back before continuing to avoid the 
           system from crashing */
        const resultSnapshot = await db.collection('orders').get();

        // Converts the firebase docs into a usable array
        const orders = resultSnapshot.docs.map(doc => ({
            id: doc.id,   // Firebase generated document ID
            ...doc.data() // Spreads all fields into new object
        }));

        res.json(orders);  // Sends a response - orders - as a JSON response to client

    } catch (error) {
        // If theres an error, send the 500 error with a message.
        console.error(error);
        res.status(500).send(error.message);
    }
};

// Add an item to cart
const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;  // Gets the product ID from the request. 
        const productDoc = await db.collection('products').doc(productId).get();  // Fetches the document from firebase

        // Defensive programming - Sends an error message if product is not found in the database
        if (!productDoc.exists) {
            return res.status(404).send('Product not found');
        }

        // Adds the product ID and data to the cart if found in the database
        cart.push({
            productId: productDoc.id,
            ...productDoc.data()
        });

        // A response is sent to frontend if item was sucessfully added to the cart.
        res.send('Product added to cart');
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

// Placing an order
const placeOrder = async (req, res) => {
    try {
        const { items } = req.body;  // Get stock and quantity values from the req body

        // Check cart to see if there are products. Returns error and stops if thers nothing.
        if(!items || items.length === 0) {
            return res.status(400).send('No items provided')
        };

        let total = 0;  // Create a variable to collect the totals
        const orderItems = [];  // New array to store items to add to collection
        const stockUpdates = [];  // New array to store the stock amounts to be updated upon validation completion
        
        // Checks if there is stock for each item in cart. 
        for (let item of items) {

            // Checking the format to ensure we have valid crucial data
            if (!item.productId || item.quantity == null || item.quantity <= 0) {
                return res.status(400).send('Invalid items format');
            };

            const productRef = db.collection('products')  // References a specific doc from the database
                                     .doc(item.productId);
            const productDoc = await productRef.get();  // Fetches the document from firebase

            // Defensive programming - Sends an error message if product is not found in the database
            if (!productDoc.exists) {
                return res.status(404).send('Product not found');
            };

            const productData = productDoc.data();  // Extract the data

            // Checks if the order quantity is greater than the available stock
            // Avoids negative stock counts
            if (productData.stock < item.quantity) {
                return res.status(400).send(`${productData.name} stock is too low`);
            }

            // If there is enough stock, decreased by order quantity without resulting in a neg
            const newStockCount = productData.stock - item.quantity;

            // Add to the stock count array only to update after the validation loop successfully finshes
            stockUpdates.push({
                ref: productRef,
                newStockCount: newStockCount
            });

            total += (productData.price*item.quantity);

            // Adds the items to the collection 'orders'
            orderItems.push({
                productId: productDoc.id,
                name: productData.name,
                price: productData.price,
                size: productData.size,
                quantity: item.quantity
            });

        }

        // Update the stock counts
        for (let update of stockUpdates) {
            await update.ref.update({ 
                stock: update.newStockCount
            });
        };

        // Add the order to the firebase database
        const orderRef = await db.collection('orders').add({ 
            items: orderItems,
            total: total,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.json({
            message: 'Order placed successfully',
            total: total,
            orderId: orderRef.id
        });

    } catch (error) {   //shows use the specific errors that may show up when running this function
        console.error(error);
        res.status(500).send(error.message);
    }  
};

//Updating the stock count
const updateStock = async (req, res) => {
    try {
        const productId = (req.params.id);  // Gets the product ID from the URL 
        const { stock } = req.body;  // Get new stock value from the req body.

        // Check to ensure we have valid crucial data
        if (stock == null || stock <0) {
            return res.status(400).send('Invalid stock value');
        }

        const productRef = db.collection('products')  // References a specific doc from the database
                              .doc(productId);
        const productDoc = await productRef.get();  // Fetches the document from firebase

        // Defensive programming - Sends an error message if product is not found in the database
        if (!productDoc.exists) {
            return res.status(404).send('Product to update not found');
        }
      
        await productRef.update({ stock: stock});  // If it exist, update the stock count

        res.send('Product stock successfully updated!');

    } catch (error) {   //shows use the specific errors that may show up when running this function
        console.error(error);
        res.status(500).send(error.message);
    }
};

// Create a new product
const createProduct = async (req,res) => {
    try{
        const { products } = req.body;

        // Validation: check fields received from the user to ensure its safe to use and add to database
        if (!products || products.length === 0) {
            return res.status(400).send('No products provided');
        }

        // Arrays that holds successful and unsuccessful product creations
        const successes = [];
        const failures = [];

        for (let product of products) {
            try {

                const { name, price, stock, size } = product;

                // Validation: check fields received from the user to ensure its safe to use and add to database
                if (!name || price == null || stock == null || size == null) {
                    failures.push({
                        product: product,
                        error: 'Missing required fields'
                    });
                    continue;  // Skip the rest of the code to go to the next iteration
                }  

                const normalizedName = name.trim().toLowerCase();
                const normalizedSize = size.trim().toLowerCase();

                // Stores a query snapshot if the product already exisits
                const duplicateCheck = await db.collection('products')
                    .where('name', '==', normalizedName)
                    .where('size', '==', normalizedSize)
                    .get();

                // Check if theres a duplicate
                if (!duplicateCheck.empty) {
                    failures.push({
                        product,
                        error: 'Product with the same name and size already exists'
                    });
                    continue;
                }
                
                // An obj that holds the values that will be added to the database
                // Object is used instead of the individual var to avoid juggling them. 
                // Keeps everything organised and easier to use
                const newProduct = {
                    name: normalizedName,
                    price: price,
                    stock: stock,
                    size: normalizedSize,
                    createdAt: admin.firestore.FieldValue.serverTimestamp()
                };
                
                // Holds the referece to the database document being added
                const productRef = await db.collection('products').add(newProduct);

                // Add the new product to the createdProducts array 
                successes.push({
                    id: productRef.id,
                    name: normalizedName
                });

            } catch (error) {   //adds failures to the array to display
                failures.push({
                    product: product,
                    error: error.message
                });
            }               
        }

        // Reports sucesses and failures
            res.json({
                message: 'Products processed',
                successes,
                failures
            }); 

    } catch (error) {  // Catches errors and notifies the developer what the error is
        console.error(error);
        res.status(500).send(error.message);
    }
};


// Makes the above functions available to other files
module.exports = {
    getProducts, 
    getOrders,
    addToCart,
    placeOrder,
    updateStock,
    createProduct
};
