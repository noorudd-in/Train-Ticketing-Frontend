# Train E-Ticketing System - Frontend

A simple, minimilistic app that mimic the train e-ticketing application system. Please note this repo contains the frontend of the the app. The backend code of the app is available here: [https://github.com/noorudd-in/Train-Ticketing-Backend](https://github.com/noorudd-in/Train-Ticketing-Backend).

# Demo

The demo of this app is live and is hosted on [train.noorudd.in](https://train.noorudd.in).

## 🛠️ Technologies - Frontend

- `ReactJS`
- `Tailwind CSS`
- `Zustand: For state management`
- `Vite: Optimized bundler for ReactJS`
- `Axios: To handle API calls`
- `React Router DOM: Routes for frontend SPA`
- `DaisyUI: A minimalistic UI component driven library`

## 🛠️ Technologies - Backend

- `MySQL: For realtional databases`
- `ExpressJS: To create and manage server`
- `Mysql2: Driver for MySQL DB`
- `Sequelize: ORM for MySQL`
- `Nodemailer: For sending mails`
- `JWT: For generating and verifying JWT tokens`
- `Bcrypt: For hashing password`
- `Morgan: For logging`
- `Express-rate-limiter: To add rate limiting`
- `HTTP Proxy: To proxy http request to different micro service app`

## 🚦 Running the project

This will guide you how to run the frontend of the app. Make sure you are already running all the backend micro-services. The guide is mentioned in the backend repository.

To run the project in your local environment, follow the below steps:

1. Clone the repository to your local machine.
2. Run `npm install`
3. Then run `npm run dev` and start a development server (By default application will run on port 5173)
4. Open http://localhost:5173 (or the address shown in your console) in your web browser to view the app.

## 🧠 What New I Learnt?

- Micro-service architecture
- How to authenticate and authorize user from scratch.
- How to verify user using email tokens.
- How to interact with MySQL database in NodeJS application.
- Rate-limiting, proxy-middlewares and logging.
- How to create pdf in server and send email using SMTP connections.
- Modularity & Clean Code.
- How does a full stack app flow actually works.
- Concept of Sequelize (as a ORM), migrations, seeders, repositories, MVC architecture, security, etc.

## 🚀 Planned Features

- [x] Allow user to search train routes either by stations or by states.
- [x] Allow user to register, login, authenticate, resend-email if not verified and logout.
- [x] Allow users to add, remove and manage passengers.
- [x] Allow user to select schedules from a range of schedules.
- [x] Allow user to book a ticket.
- [x] Allow user to see all his/her bookings.
- [x] Allow user to cancel ticket.

## 💡 Improvements

- One can add seats and vacancy for each date.
- One can have a ability to confirm a Waiting ticket if someone else cancels.

## Contributing
Contributions are welcome! Please create an issue or submit a pull request.

## License

MIT