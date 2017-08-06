# FCC Voting App
This is the code for the FreeCodeCamp Voting App project.

# Project Structure
The code in this project is structured in the following way.  

## Routing
React Router (`react-router-dom`) is used for routing, which is done in the client side. The `<Main>` components is an abstraction that contains the routes to all the major paths. Individual components are then responsible for nested routes.

## React Components
All React components are in the `components` folder. The `index.js` file renders the `<App />` component under a `<BrowserRouter>`, which holds the skeletal structure for each page. Each page in the voting app has a header (a footer to be added later), and the actual content of each page is abstracted in the `<Main>` component.  

An overview of each component is below:
* `<App>`: Top level component, spanning the whole page.
* `<Header>`: The header with the navigation.
* `<Home>`: The content (body) of the home page, containing a list of all the polls, at route `/`.
* `<Main>`: The component that abstracts all the routes for each path.
* `<Poll>`: Each poll displayed in the home page is a `<Poll>` component.

## NPM Scripts
The scripts are used as below:
* `server`: Starts the dev server. This runs `server.js`, which uses `webpack-dev-middleware` to transpile code and `Express` for the server. This also uses the `compression` package to gzip files before sending to the client.
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
