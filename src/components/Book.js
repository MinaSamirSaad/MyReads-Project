import React from "react";
import BookShelfChanger from "./BookShelfChanger";
import PropTypes from "prop-types";

const Book = (props) => {
//use PropTypes to check the types of props.
  Book.prototype = {
    bookName: PropTypes.string.isRequired,
    authorsName: PropTypes.array.isRequired,
    url: PropTypes.object.isRequired,
    book: PropTypes.object.isRequired,
    updateFunction: PropTypes.func.isRequired,
  };


  return (
    <li>
      <div className="book">

        <div className="book-top">

          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: ((props.url&&props.url.smallThumbnail) ? `url("${props.url.smallThumbnail}")` : "none"
              )}}
          ></div>

          <BookShelfChanger
            bookshelf={props.book.shelf}
            book={props.book}
            updateFunction={props.updateFunction}
          />

        </div>

        <div className="book-title">{props.bookName}</div>

        <div className="book-authors">

          {(props.authorsName&&props.authorsName.length)>1?
            props.authorsName.join(" ,"):props.authorsName}

        </div>

      </div>

    </li>
  );
};
export default Book;
