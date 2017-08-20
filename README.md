# FCC Voting App
This is the code for the FreeCodeCamp Voting App project.

# Project Structure
The code in this project is structured in the following way.  

## Routing
React Router (`react-router-dom`) is used for routing, which is done in the client side. The `<Main>` component is an abstraction that contains the routes to all the major paths. Individual components are then responsible for nested routes.

## React Components
All React components are in the `components` folder. The `index.js` file renders the `<App />` component (which holds the skeletal structure for each page) under a `<BrowserRouter>`. Each page in the voting app has a header (a footer to be added later), and the actual content of each page is abstracted in the `<Main>` component.  

An overview of each component is below:
* `<App>`: Top level component, spanning the whole page.
* `<Header>`: The header with the navigation.
* `<Home>`: The content (body) of the home page, containing a list of all the polls, at route `/`.
* `<Main>`: The component that abstracts all the routes for each path.
* `<PollButton>`: Each poll displayed in the home page is a `<PollButton>` component.
* `<Poll>`: The content of the page that contains a poll. This is rendered on every call to `/poll/:id`, where `id` is the index of the poll in the database.
* `<Login>`: The content of the login page, which includes a link to the register page.
* `<Register>`: The content of the registration page. Like `<Login>`, this just contains a form.
* `<Profile>`: The content of the user's profile page.
* `<NewPoll>`: The page where the user can create a new poll.

## NPM Scripts
The scripts are used as below:
* `server`: Starts the dev server. This runs `server.js`, which uses `webpack-dev-middleware` to transpile code and `Express` for the server. This also uses the `compression` package to gzip files before sending to the client. `nodemon` is used to restart the server when the file is changed, and `babel-node` transpiles the code before the server is started.
* `lint:watch`: Runs `lint`, which lints the code, and watches for changes in code and re-runs `lint` each time.
* `start`: Uses `npm-run-all` to parallely run the above two scripts.
* `localtunnel`: Uses the `localtunnel` package to share work-in-progress.
* `share`: Similar to `start`, but also runs `localtunnel`.

## Configuration Files
* `.babelrc` is used for transpiling React and ES6/ES7 code to plain JS.
* `.editorconfig` enforces indenting and other configurations for editors and IDEs.
* `.eslintrc.json` is the ESLint config file.

## Page Source Code
The main source code is in the `src` directory. Sass is used for styling.

## Authentication
Custom authentication is implemented. JWT is used to send encoded data from the server, though the use of JWTs is not fully implemented as of this commit. The `bcrypt` module provides a secure one-way hash to store passwords in the database. During login, the user entered password is compared with the hashed password from the database.

# Database
MongoDB is used for the database, and the MongoDB driver for Node is used to modify the database, which is hosted on mLab. The database will have two collections:
* `polls`. Each document has the structure:
```
{
    title   : "The title of the poll",
    url     : "URL of the poll",
    ops     : [ "Array", "of", "string", "options" ],
    username: "This will be the same as username of users collection"
}
```
* `users`. Each document has the structure:
```
{
    username : "Username chosen by the user",
    polls    : [ "Array", "of", "links", "to", "polls" ],
    name     : "User's name, taken from Google OAuth2",
    pwd      : "bcrypt hashed password"
}
```

# TODOs
* The `/poll/:id` path should be handled by the server, not React-Router.
