# MyReads Project


## Overview
This is the final assessment project for Udacity's React Fundamentals course. This repository is forked from the starter code(https://github.com/udacity/reactnd-project-myreads-starter).

## Goal
- Load Books by API
- Search Books with a keyword by API
- Change a category of the book to another category

## Page Preview
Main Page             |  Search Page
:-------------------------:|:-------------------------:
<img src='http://drive.google.com/uc?export=view&id=1PFxRfG4Qe4CVc_U5Qp1KCi0bVHiM8vla' width='100%' />  |  <img src='http://drive.google.com/uc?export=view&id=1c5YZKeG6u37LUGX4c75a06NyDoigq2fQ' width='100%' />

## What I learned
- Props & State
- PropTypes
- Class component & Functional component
- Controlled Components with searching books and selecting category
- Lifecycle Events
  - Initial loading books with componentDidMount
  - Update state by new props with getDerivedStateFromProps
  - No re-render the same components with shouldComponentUpdate
- Render loading screen with State
- Routing between the main page and the search page
- Debounce/Throttle when typing keyword on the text input for searching books

## Additional installed npm list
- react-router-dom
- prop-types
- react-loader-spinner
  - https://www.npmjs.com/package/react-loader-spinner

## Start the application

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

