# Fake Game Store - Frontend

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/main-picture" alt="Fake Game Store Main Photo" width="400"/>
</div>
<p></p>

## Table of Contents
1. [Welcome](#welcome)
2. [About the Project](#about-the-project)
3. [Technologies Used](#technologies-used)
4. [Setup](#setup)
5. [Website Functionality](#website-functionality)
6. [Not Authorized User](#not-authorized-user)
7. [User](#user)
8. [Admin](#admin)
9. [Features for Future](#features-for-future)

## Welcome
Welcome to the **Fake Game Store** frontend project! This project was created to practice building a user-friendly e-commerce application that communicates with a backend server. You can check out the backend that I developed for the project with my team [here](https://github.com/GreeeenGoo/fake-game-store-backend).

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

When the project is run or the website is accessed, the home page is displayed. This page contains a list of active games - games that have one or more keys and have been activated by an admin for purchase:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/Not-authorized-user-active-games.jpg" alt="Not authorized user active games"/>
</div>
<p></p> 

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

It's important to note that if multiple genres or player supports are selected, any game will be found if it has at least one match from the chosen list. This allows users to efficiently explore the available games even without signing in:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/Not-authorized-user-active-games-with-filters.jpg" alt="Not authorized user active games with filters"/>
</div>
<p></p> 

Additionally, users can see the full information about every game by clicking on it: 

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/Single-game.jpg" alt="Single game"/>
</div>
<p></p> 

Users can also register on the website by following simple instructions. Please note that after registration, the user will not be verified until he completes the verification through his email (see further instructions). Also in the end of registration the user will get a message on his email for his account verification and will be logged in authomatically:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/Sign-up-register-form.jpg" alt="Sign up register form"/>
</div>
<p></p> 

### User

If a user already has an account, he can press the login button after clicking on the round icon in the top corner of the navigation bar. Here, he can enter their email and password to sign in: 

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/Login-form.jpg" alt="Login form"/>
</div>
<p></p>

If the user has a profile but has forgotten his password, he can fill out a form after clicking **FORGOT PASSWORD** on the login page and entering his email:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/Forgot-password-enter-email-form.jpg" alt="Forgot password enter email form"/>
</div>
<p></p>

A verification code will then be sent to his email:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/Forgot-password-reset-code.jpg" alt="Forgot password reset code"/>
</div>
<p></p>

, which he can use after being automatically directed to a new form to enter a new password:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/Forgot-password-new-password-form.jpg" alt="Forgot password new password form"/>
</div>
<p></p>

After changing the password, user needs to log in to access his account with the new password.

Once logged in, the user will see an additional tab on the navigation bar labeled **My Orders**, a cart icon in the right corner, and a new menu accessible through the round icon in the right corner (containing **Profile** and **Sign Out**).

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/Logged-in-user-home-page.jpg" alt="Logged in user home page"/>
</div>
<p></p>

By clicking on **Profile**, the user can view their personal information and the **VERIFY** button:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/User-profile-info.jpg" alt="User profile info"/>
</div>
<p></p>

This button is used to verify the user’s email before allowing them to check out their cart. Pressing this button will open another window for entering the verification code sent to their email after registration (copy only the code after the word "verify" from the email):

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/User-activation-email-message.jpg" alt="User activation email message"/>
</div>
<p></p>

After entering the code, press Enter to verify the user:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/User-verification-entering-code-from-email.jpg" alt="User verification entering code from email"/>
</div>
<p></p>

Once verified, the user's status will change from **UNVERIFIED** to **ACTIVE**, allowing them to check out their cart:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/User-profile-active-status.jpg" alt="User profile active status"/>
</div>
<p></p>

There is also a **Change Password** button in the profile section that allows the user to change their current password to a new one:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/Change-password-form.jpg" alt="Change password form"/>
</div>
<p></p>

After completing the user activation, the user can add games to his cart for checkout. They can do this by clicking the "Add" button in the active games list or on the individual game page (the button will apear there after logging in):

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/Single-game-for-logged-user.jpg" alt="Single game for logged user"/>
</div>
<p></p>

Although they could add games to the cart prior to activation, they could not complete the checkout process:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/Cart-form-with-games.jpg" alt="Cart form with games"/>
</div>
<p></p>

When the cart is full, the user can press the **Checkout** button to change the order status and proceed to the payment section:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/My-orders-with-not-paid-order.jpg" alt="My orders with not paid order"/>
</div>
<p></p>

If the user attempts to add more specific games than available keys allow, a notification will inform them of the issue. After checking out, the user can navigate to the **My Orders** tab to view their orders and pay for the current one. The available time to pay for an order after checkout is 15 minutes; after this period, the order will be canceled, allowing other users to purchase the games.

To pay for the order, press the **Pay** button. Currently, this is a mock function with a simple implementation, similar to sending keys to email without actual payment. Once the payment is processed, the payment status of the order will be changed to "Paid":

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/My-orders-with-paid-order.jpg" alt="My orders with paid order"/>
</div>
<p></p>

, and the user will receive their game keys via email:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/Game-keys-on-email.jpg" alt="Game keys on email"/>
</div>
<p></p>

### Admin

If a user is logged in as an ADMIN, he can perform all the same actions with his profile, but his home window will look different:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/Admin-home-page.jpg" alt="Admin home page"/>
</div>
<p></p>

The admin does not have the cart button or the opportunity to order games (even though admin has acces to this feature on the backend). Additionally, the admin has access to the **All Games** and **All Orders** buttons in the navigation bar.

In the **All Games** tab, the admin can manipulate all the games on the platform with the same filtering system as for active games:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/All-games-for-admin.jpg" alt="All games for admin"/>
</div>
<p></p>

The admin can add a new game by clicking the "Add Game" button:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/New-game-empty-form.jpg" alt="New game empty form"/>
</div>
<p></p>

, and then just fill in all the necessary info:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/New-game-full-form.jpg" alt="New game full form"/>
</div>
<p></p>

Once a game is created, it'll appear in the all games section:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/All-games-for-admin-with-a-new-game.jpg" alt="All games for admin with a new game"/>
</div>
<p></p>

, but it will not be active, meaning it won't appear for Not Authorized Users or Authorized Users in the Active Games tab. The admin can manipulate the game by clicking on it, which allows them to:

- **Open the Game**: This is the same functionality available to regular users.
- **Change the Game**: The create game form will be pre-filled with the game's data for editing.
- **Add Game Key**: This allows the admin to add more keys to the game:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/All-games-for-admin-with-a-new-game_added-key.jpg" alt="All games for admin with a new game added key"/>
</div>
<p></p>

- **Activate/Deactivate Game**: This option is not available if the keys amount is less than 1:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/All-games-for-admin-with-a-new-game-activated-game.jpg" alt="All games for admin with a new game activated game"/>
</div>
<p></p>

After activation, the game will appear in the Active Games tab for users to purchase:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/New-game-in-active-games.jpg" alt="New game in active games"/>
</div>
<p></p>

In the **All Orders** tab, the admin can view all the information about all orders:

<div align="center">
  <img src="https://github.com/GreeeenGoo/fs18_java_frontend/blob/main/assets/All-orders.jpg" alt="All orders"/>
</div>
<p></p>

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
