import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

const BookShilf = (props) => {
  //use PropTypes to check the types of props.
  BookShilf.propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    shelfName: PropTypes.string.isRequired,
    updateFunction: PropTypes.func.isRequired,
  };

  const { books, title, shelfName } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>

      <div className="bookshelf-books">

        <ol className="books-grid">
        {/*create Book function component and map the books and give it the book information */}
          {books.filter((book) => book.shelf === shelfName).map((book) => (
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

export default BookShilf;
