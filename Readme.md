Backend Technology
Node JS, Express JS & MongoDB
Features

1.  User Registration with OTP Verify
2.  User Login System with Email & Password
3.  User reset password if forgetted
4.  User Login with Google accounts
5.  User browse Products of Databases
6.  User can review product
7.  User can add to cart product
8.  User can place order for buy
9.  User can see order status of ordered product
10. User can feedback ourself.
11. User can contact or track our shop
12. As Admin or Manager can access dashboard
13. As Admin or Manager can access analytics
14. As Admin or Manager can access Sales
15. As Admin or Manager can Add Product to database
16. As Admin or Manager can Edit a product of database
17. As Admin or Manager can Delete a product of database
18. As Admin or Manager can Ban a user
19. As Admin or Manager can delete a user
20. As Admin or Manager can see all orders condition
21. As Admin or Manager can update order status [Pending, Delivered, Cancel]
22. As Admin or Manager can see all customers who ordered product
23. As Admin or Manager can see all reviews of customer
24. As Admin or Manager can delete unwanted review from product
    Database Design
    Schema:  
     Users Schema
    Products Schema
    Review Schema
    Category Schema

        API’s Default URL `http://localhost:5000/api`

        Users ->
        [GET]: /users -> Get all users from users’ collection
        [GET]: /users/:id -> Get a user by id from users’ collection
        [POST]: /process-register
        -> Register a user in user collection
        [POST]: /user/verify -> Verify by otp for register user
        [PUT]: /user/:id -> Update a user in user collection
        [DELETE]: /user/:id -> Delete a user in user collection
        [PUT]: /ban-user -> Ban a user from user collection
        [PUT]: /unban-user -> Unban a user from user collection
        [PUT]: /update-password -> Update password for user collection
        [POST]: /forget-password -> Forget password a user
        [PUT]: /reset-password -> Reset password for login user

        Products ->

        [GET]: /products -> Get all products from products collection
        [POST]: /products -> Create a product with image in products collection
        [GET]: /products/search?query=value -> Search a product by query from product collection
        [GET]: /products/:slug -> Get a single product by slug
        [PUT]: /products/:slug -> Update a product by slug products collection
        [DELETE]: /products/:slug -> Delete a product by slug in products collection
        [POST]: /products/:id/reviews -> Add a review in a product in products collection
        [GET]: /products/by-category/:category


        Reviews ->

        [GET]: /reviews -> Get all reviews from reviews collection
        [DELETE]: / reviews/:id -> Delete a review by id from reviews collection

        Categories ->

        [GET]: /categories -> Get all categories
        [GET]: /categories/:slug -> Get all categories by slug
        [PUT]: /categories/:slug -> Update a category by slug
        [DELETE]: /categories/:slug -> Delete a category by slug

        Orders->
        [GET]: /orders -> Get all orders from orders collection
        [POST]: /orders -> Create an order to orders collection
        [DELETE]: /orders/:orderId -> Delete an order from orders collection
        [PATCH]: /orders/update-status -> Update a silly info of order(status) in orders collection

        Auth->
        [POST]: /login -> login a user into website with credentials information
        [POST]: /logout -> logout a user from website
        [POST]: /refresh-token -> generate a refresh token to store user into website as cookie
        [POST]: /protected -> backup token if validation expire refresh token within 7 days


        Middleware auth ->

        isLoggedIn -> check user is logged in into website
        isLoggedOut -> check user is logged out from website
        isAdmin -> check user is admin from website
        isBanned -> check user is banned from website

        Helpers ->
        deleteImage -> delete image when delete a product from database
        emailSender -> Send OTP on email when user register in database

        Backend Packages dependencies ->
        "axios": "^1.7.2",
        "bcrypt": "^5.1.0",
        "bcryptjs": "^2.4.3",
        "body-parser": "^1.20.2",
        "cookie-parser": "^1.4.6",
        "cors": "^2.8.5",
        "dotenv": "^16.3.1",
        "express": "^4.18.2",
        "express-rate-limit": "^6.7.1",
        "express-validator": "^7.0.1",
        "fs.extra": "^1.3.2",
        "google-auth-library": "^9.14.0",
        "http-errors": "^2.0.0",
        "jsonwebtoken": "^9.0.1",
        "mongoose": "^7.4.0",
        "morgan": "^1.10.0",
        "multer": "^1.4.5-lts.1",
        "nodemailer": "^6.9.15",
        "nodemon": "^3.0.1",
        "react-reveal": "^1.2.2",
        "slugify": "^1.6.6",
        "winston": "^2.4.6",
        "xss-clean": "^0.1.4"
