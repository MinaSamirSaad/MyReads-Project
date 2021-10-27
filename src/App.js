import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route, Link } from "react-router-dom";
import BookShelf from "./components/BookShelf";
import SearchBooks from './components/searchBooks';

//transfer from class component to functional component.

const BooksApp = () => {


  let [Books, setBooks] = useState([]);
  let [refresh,setrefresh]=useState(false)

//fetch our books from BookAPI.

  useEffect(() => {
    async function fetchMyAPI(){
      let books= await BooksAPI.getAll()
      setBooks(books);
      console.log(books);
    }
    fetchMyAPI()
  }, []);

//create the ubdate function Which allows us to change the book shelf or remove it from the shelf.
  let updateBookShelf=(book,bookShelf)=>{
    let ubdateBookIndex= Books.findIndex((b)=>b.id===book.id)

    ubdateBookIndex===-1?(
      book.shelf=bookShelf&&
      Books.push(book))
      :
      (Books[ubdateBookIndex].shelf=bookShelf)
      setBooks(Books)
      BooksAPI.update(book,bookShelf)
      setrefresh(!refresh)
  }

//use React Router to allows us to build a single-page web application.
// create BookShelf component and send to it some props to use inside it.
  return (
    <div className="app">
    <Route exact path="/" render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">

            <div>

              <BookShelf
                books={Books}
                title="Currently Reading"
                shelfName="currentlyReading" 
                updateFunction={updateBookShelf}
                />

              <BookShelf
                books={Books}
                title="Read"
                shelfName="read" 
                updateFunction={updateBookShelf}/>

              <BookShelf
                books={Books}
                title="Want to Read"
                shelfName="wantToRead" 
                updateFunction={updateBookShelf}/>

            </div>
            </div>

            <div className="open-search">
                    <Link to="/search">add</Link>
            </div>
          </div>
        
    )}/>
  <Route path="/search" render={() => (
    <SearchBooks
      Books={Books}
      updateFunction={updateBookShelf}
    />
  )}/>
  </div>
  );
};
export default BooksApp;
