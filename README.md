# Fake Game Store - Frontend

Welcome to the **Fake Game Store** frontend! This project was created to practice building a user-friendly e-commerce application that communicates with a backend server. You can check out the backend that I developed with my team [here](https://github.com/GreeeenGoo/fake-game-store-backend).

> **Please Note**: This website was developed for educational purposes. All data, including the games and purchases, is entirely fake. You cannot buy any real games through this platform.

### About the Project

This project represents my first large-scale **frontend** work, which I completed over the course of 3 weeks. Its purpose was to enhance my skills in frontend development, server communication, and the design of a seamless user experience for an e-commerce application.

### Technologies Used

- **Build & Development**: Vite, TypeScript, ESLint, Prettier, Autoprefixer, PostCSS
- **UI & Styling**: React, Tailwind CSS, @emotion/react, @mui/material, FontAwesome, Lucide-react, Radix UI
- **Routing & State**: React Router Dom, @tanstack/react-query
- **API & Utilities**: Axios, JWT-Decode, Zod, clsx, tailwind-merge
- **Notifications**: Notistack

### Setup

You can access this app through the following link: [Fake Game Store](https://fake-game-uladkruk-dynsb5rly-greeeengoos-projects.vercel.app/games/active). This version is hosted on Vercel and connected to a database on Render.com. Please note, some performance issues may occur since it's hosted on Render's free tier, which has limitations on space and data access speed.

Alternatively, if you want to run the development version, clone this project, clone the local database (see the instructions for setting up the local backend part [here](https://github.com/GreeeenGoo/fake-game-store-backend?tab=readme-ov-file#local-setup)) and run the following command to connect it to your local database:

```bash
yarn run dev
```

### Website Functionality

When the project is run or the website is accessed, the home page is displayed. This page contains a list of active games - games that have one or more keys and have been activated by an admin for purchase. 

While a user is not signed in, no additional tabs or features are available. The application has three user statuses:

1. **Not Authorized User**: 
   - A visitor who has not signed in and can only view the active games list, login or sign up.

2. **User**: 
   - A registered user who can access additional features once signed in.

3. **Admin**: 
   - An administrative user with full access to manage games and user accounts.

### Not Authorized User

A Not Authorized User can access the active games page and manipulate the list with the following features:

- **Sorting**: Rearrange the list of games based on different criteria.
- **Pagination**: Change the number of games displayed per page.
- **Filtering**: Filter games by genres and player support.
- **Searching**: Search for games using phrases from their titles.

It's important to note that if multiple genres or player supports are selected, any game will be found if it has at least one match from the chosen list. This allows users to efficiently explore the available games even without signing in.

### 🚨*******Here is the SNAPSHOT of active games with all the filtering stuff*******🚨 

Additionally, users can see the full information about every game by clicking on it. 

### 🚨*******Here is the SNAPSHOT of a single game*******🚨 

### Signing Up

Users can also register on the website by following simple instructions. Please note that after registration, the user will not be verified until they complete the verification through their email (see further instructions). Also in the end of registration User will get a message on his email for his account verification.

### 🚨*******Here is the GIF of signing up*******🚨

### User

If a user already has an account, he can press the login button after clicking on the round icon in the top corner of the navigation bar. Here, they can enter their email and password to sign in. 

### 🚨*******Here is the SNAPSHOT OF THE LOGGING FORM*******🚨

If the user has a profile but has forgotten his password, he can fill out a form after clicking **FORGOT PASSWORD** on the login page and entering their email. A verification code will then be sent to their email, which they can use to access a new form and enter a new password.

### 🚨*******Here is the GIF OF CHANGING PASSWORD OF USER*******🚨

Once logged in, the user will see an additional tab on the navigation bar labeled **My Orders**, a cart icon in the right corner, and a new menu accessible through the round icon in the right corner (containing **Profile** and **Sign Out**).

### 🚨*******Here is the SNAPSHOT OF THE LOGGED USER SCREEN*******🚨

By clicking on **Profile**, the user can view their personal information and the **VERIFY** button. This button is used to verify the user’s email before allowing them to check out their cart. Pressing this button will open another window for entering the verification code sent to their email after registration (copy only the code after the word "verify" from the email). After entering the code, press Enter to verify the user. Once verified, the user's status will change from **UNVERIFIED** to **ACTIVE**, allowing them to check out their cart.

### 🚨*******Here is the GIF OF USER PROFILE AND ACTIVATION OF THE PROFILE*******🚨

There is also a **Change Password** button in the profile section that allows the user to change their current password to a new one.

### 🚨*******Here is the SNAPSHOT OF THE CHANGE PASSWORD SCREEN*******🚨

After the user activation is complete, the user can add games to their cart for further checkout. Although they could add games to the cart prior to activation, they could not complete the checkout process. When the cart is full, the user can press the **Checkout** button to change the order status and proceed to the payment section.

### 🚨*******Here is the GIF OF ADDING GAMES TO CART AND CHECKING OUT*******🚨

If the user attempts to add more specific games than available keys allow, a notification will inform them of the issue. After checking out, the user can navigate to the **My Orders** tab to view their orders and pay for the current one. The available time to pay for an order after checkout is 15 minutes; after this period, the order will be canceled, allowing other users to purchase the games.

To pay for the order, press the **Pay** button. Currently, this is a mock function with a simple implementation, similar to sending keys to email without actual payment. Once the payment is processed, the user will receive their game keys via email.

### 🚨*******Here is the GIF OF PAYING FOR GAMES AND GETTING THE KEYS*******🚨

### ADMIN

If a user is logged in as an ADMIN, they can perform all the same actions with their profile, but their home window will look different.

### 🚨*******HERE IS A SCREEN OF THE HOME PAGE OF ADMIN*******🚨

The admin does not have the cart button or the opportunity to order games (this feature is managed on the backend). Additionally, the admin has access to the **All Games** and **All Orders** buttons in the navigation bar.

In the **All Games** tab, the admin can manipulate all the games on the platform with the same filtering system as for active games.

### 🚨*******HERE IS A SNAPSHOT OF THE ALL GAMES SCREEN*******🚨

The admin can add a new game:

### 🚨*******HERE IS A GIF OF ADDING A NEW GAME*******🚨

Once a game is created, it will not be active, meaning it won't appear for Not Authorized Users or Authorized Users in the Active Games tab. The admin can manipulate the game by clicking on it, which allows them to:

- **Open the Game**: This is the same functionality available to regular users.
- **Change the Game**: The create game form will be pre-filled with the game's data for editing.

### 🚨*******HERE IS A SNAPSHOT OF CHANGING THE GAME*******🚨

- **Add Game Key**: This allows the admin to add more keys to the game.
- **Activate/Deactivate Game**: This option is not available if the keys amount is less than 1. 

Once the game is activated, users will be able to see it and choose it for purchase.

### 🚨*******HERE IS THE GIF FOR ADDING THE GAME KEY AND ACTIVATING THE GAME*******🚨

After activation, the game will appear in the Active Games tab for users to purchase.

In the **All Orders** tab, the admin can view all the information about all users.

### 🚨*******HERE IS A SNAPSHOT OF ALL ORDERS*******🚨

### Features for Future

There are still features to be developed in future versions:

#### For Users:
- Creating a review
- Changing user data
- Deleting the profile

#### For Admins:
- Manipulating all users (updating, deleting)
- Updating a User to Admin status
- Manipulating orders (adding, updating status, deleting)

You will see these features in the upcoming versions of the project.

## Thank you for taking the time to look at my project! I would greatly appreciate any feedback or contributions you may have. 😊
