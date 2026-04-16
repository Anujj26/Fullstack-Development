# Assignment Title

Create a functional e-commerce or used-items marketplace website using Node.js and Express, integrated with a NoSQL database like MongoDB.

---

## Aim

To design and develop a full-stack used items e-commerce marketplace (ReMarket) integrated with a backend system using Node.js, Express.js, and MongoDB to securely store and manage users and products dynamically.

---

## Objectives

- To design a responsive and interactive e-commerce interface using HTML, CSS, and Vanilla JavaScript.
- To implement user authentication and authorization logic on both the client and server.
- To integrate the frontend with a backend RESTful API using the Fetch API.
- To develop a secure backend server using Node.js and Express.js supporting CRUD operations.
- To structure, store, and manage user and product data using MongoDB and Mongoose.
- To understand end-to-end full-stack web development concepts and architecture.

---

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js (with CORS & dotenv)
- **Database:** MongoDB (via Mongoose)
- **API Handling:** Fetch API
- **Authentication:** JSON Web Tokens (JWT) & bcrypt

---

## Description

This project is a functional Used Items Marketplace (similar to OLX) that empowers users to buy and sell second-hand goods. 

The website includes functional user authentication systems (login and registration) alongside an active product listing page. Users can browse the marketplace, search for specific items, filter by categories, and post new advertisements with image uploads. 

The backend securely processes these requests, verifies authentication tokens, manages file uploads via Multer, and stores relationship-mapped user and product data in a MongoDB database. This demonstrates complete full-stack integration including UI/UX, complex server-side logic, and database management.

---

## Working

1. User opens the ReMarket application interface.
2. User navigates through the fresh recommendations or uses the Search/Category filter to find items.
3. To sell an item or "Buy Now", the user must register or log in.
4. User fills out the required form (e.g., Post Ad form with images and product details).
5. Data (including multipart/form-data for images) is sent to the backend using the Fetch API (POST request).
6. The Express server receives, validates the JWT, and processes the payload.
7. The data is securely structured and stored into the respective MongoDB collections.
8. A success toast notification is displayed to the user and the page dynamically updates.

---

## Database (MongoDB)

- **Database stores:** User account details and Product advertisements.
- **Collections used:** `users`, `products`
- **Fields stored in Users:**
  - Name
  - Email
  - Phone
  - Password (Hashed)
- **Fields stored in Products:**
  - Title
  - Price
  - Category
  - Description
  - Image URL
  - Seller Reference (Linked to User ID)

---

## Conclusion

The project successfully demonstrates full-stack web development by integrating a dynamic frontend with a robust backend and NoSQL database. It provides hands-on experience with Node.js, Express.js, user authentication, image handling, and MongoDB, illustrating how modern real-world applications manage users and content.

---

## Future Scope

- Add advanced validation and secure error handling.
- Create an admin dashboard to moderate products and manage users.
- Integrate a real payment gateway setup (e.g., Stripe) for actual checkout.
- Deploy using live cloud platforms (Render / Vercel / MongoDB Atlas).
- Enhance the UI aesthetics with modern animated libraries.
