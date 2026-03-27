# FRIVO - Grocery Web Application
____________________________________________________________
FRIVO is a web-based grocery ordering platform designed to improve accessibility for users in rural and suburban areas. It allows users to browse products and place orders. The stores would be able to add and manage products and their stock counts efficiently through a connected backend system.
____________________________________________________________
# Features:
- View available grocery products
- Add items to cart
- Place orders with quantity validation
- Automatic stock updates after purchase
- Backend validation and error handling
____________________________________________________________
# Technologies Used
1. Backend:
- Node.js
- Express.js
- Firebase Firestore
2. Frontend:
- (To be implemented – React / HTML, CSS, JavaScript)
____________________________________________________________
# Project Structure:
- /backend → API (routes, controllers, Firebase integration)
- /frontend → User interface (in development)
____________________________________________________________
# How to Run the Backend
  
1. Install dependencies:
npm install

2. Start the server:
node server.js

3. Server runs on:
http://localhost:3000
_____________________________________________________________
# API Endpoints

Method	→  Endpoint	   →   Description
- GET	  →  /products	 →   Get all products
- GET	  →  /orders	   →   Get all orders
- POST  →  /cart	     →   Add item to cart
- POST	→  /order	     →   Place an order
- PATCH	→  /products/	 →   Update stock
- POST  →  /products   →   Create new product
_______________________________________________
# Firebase Setup
This project requires a Firebase service account key.
1. Create a Firebase project
2. Generate a service account key
3. Place the file in:
backend/config/serviceAccountKey.json

⚠️ This file is NOT included in the repository for security reasons.
_______________________________________________
# Future Improvements
- User authentication system
- Payment integration
- Real-time inventory updates
- Improved UI/UX design
_______________________________________________
# License
This project is licensed under the MIT License.
_______________________________________________
# About This Project
This project was developed as part of a Java & Web Development portfolio. It is also designed with real-world scalability in mind and has potential for commercial use.
