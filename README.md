# Subscription Tracker JS Backend

A simple Node.js backend project that allows users to **create, update, and delete subscription records**. It also includes **user authentication via JWT**, and incorporates **rate limiting and bot protection**.

## Features

- User registration and login using JWT authentication  
- CRUD operations for subscriptions  
- API rate limiting and bot protection using Arject SDK  
- MongoDB for data persistence  
- Clean RESTful API design  

## API Documentation

- 📬 **Postman Collection**: [Subscription Tracker API Collection](./Subscription_Tracker_API.postman_collection.json)  
- 🧩 **ER Diagram**: [Subscription ER Diagram](./Subscription_ER_Diagram.png)

## Tech Stack

- **Node.js** + **Express.js** – Backend framework  
- **MongoDB** + **Mongoose** – Database and ODM  
- **JWT** – Authentication  
- **Arject SDK** – API rate limiting and bot protection  

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/subscription-tracker-js-backend.git
   cd subscription-tracker-js-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file using the `.env.example` template and fill in your credentials.

4. Start the development server:
   ```bash
   npm run dev
   ```

---

Feel free to contribute or raise issues to improve this project!
