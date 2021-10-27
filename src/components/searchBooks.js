import React from "react";
import PropTypes from "prop-types";
import { useState , useEffect} from "react";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";

const SearchBooks = (props) => {
  //use PropTypes to check the types of props.
  SearchBooks.propTypes = {
    Books: PropTypes.array.isRequired,
    updateFunction: PropTypes.func.isRequired,
  };


  let [query, setquery] = useState("");
  let [searchedbooks, setsearchedbooks] = useState([]);

//function to take the value of input and save it inside the state to can use it to search the books.
  const ubdateQuery = (query) => {
    setquery(query);
  };

//search BookApi and filter the result and It shows which books are on the shelves.
useEffect(()=>{
  async function fetchsearchdata(){ 
   
  await BooksAPI.search(query).then((resultes) => {
    if (resultes && resultes.length > 0) {
      for (let i = 0; i < resultes.length; i++) {
        for (let l = 0; l < props.Books.length; l++) {
          if (resultes[i].id === props.Books[l].id) {
            const shelfBooksID = props.Books.findIndex(
              (book) => book.id === resultes[i].id
            );
            resultes[i].shelf = props.Books[shelfBooksID].shelf;
          }
        }
      }
    }
    setsearchedbooks(resultes);
  });}
  fetchsearchdata()
})
 


  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          close
        </Link>

        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => ubdateQuery(event.target.value)}
          />
        </div>
      </div>


      <div className="search-books-results">
        <ol className="books-grid">
          {searchedbooks &&
            searchedbooks.length > 0 &&
            searchedbooks.map((book) => (
              <Book
                key={book.id}
                bookName={book.title}
                authorsName={book.authors}
                url={book.imageLinks}
                book={book}
                updateFunction={props.updateFunction}
              />
            ))}
        </ol>
      </div>
    </div>
  );
};
export default SearchBooks;
