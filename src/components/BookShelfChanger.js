import React from "react";
import PropTypes from "prop-types";

const BookShelfChanger = (props) => {

//use PropTypes to check the types of props.

  BookShelfChanger.prototype = {
    bookshelf: PropTypes.string.isRequired,
    book: PropTypes.object.isRequired,
    updateFunction: PropTypes.func.isRequired,
  };
  //use the ubdate function which pass it from app component to bookshelf to book
  //and finally use it inside the drop down list and give it the book and the shelf to change it  
  return (
    <div className="book-shelf-changer">

      <select
        value={props.bookshelf ? props.bookshelf : ""}
        onChange={(event) =>
          props.updateFunction(props.book, event.target.value)
        }>


        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>

      </select>

    </div>
  );
};
export default BookShelfChanger;
