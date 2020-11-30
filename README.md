## About

Product Store Management using Express, MongoDB, React JS and Node JS

## Introduction

User Registration and Login functionality with validations using React, NodeJs, ExpressJs and MongoDB and authentication with JWTs. Also includes CRUD functionalities for product. Admin are able to perform full CRUD functions while users can only add view product when signed in.

This project uses the following technologies:

- [React](https://reactjs.org) and [React Router](https://reacttraining.com/react-router/) for frontend
- [Express](http://expressjs.com/) and [Node](https://nodejs.org/en/) for the backend
- [MongoDB](https://www.mongodb.com/) for the database
- [Redux](https://redux.js.org/basics/usagewithreact) for state management between React components

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

What things you need to install the software and how to install them
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)

## Installing

To test on your own computer

- Rename .env.example to .env and add your mongodb uri in the .env file in the server directory.

Install all dependencies

- Go to the server directory (server side). Run **npm install**
- Go to the client directory (client side). Run **npm install**

## Running the project

Run **npm start** in the server side first then 
Run **npm start** in the client side

Server runs on http://localhost:3000 and client on http://localhost:3001

## Quick Start

To Register as an admin

- Route to `http://localhost:3001/admin/signup`

To Register as a user

- Route to `http://localhost:3001/signup`

## Note

- Password should not be less than 8 digits and contain atleats one uppercase and one digit

## Tests
To run unit test, run the following codes in the server directory

 - `npm test`   General routes
 - `npm test test/db/connect.spec.js`  Database configurations
 - `npm test test/controllers/Controller.spec.js` Product and User Controller

## Authors

FULL NAME: AJIBOYE ADEDOTUN
EMAIL: ajiboyeadedotun16@gmail.com

* **Ajiboye Adedotun** - *Product Store Mangement* - [Youngprinnce](https://github.com/youngprinnce)


## License

This project is licensed under the MIT License.