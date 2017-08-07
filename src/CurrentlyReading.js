import React, { Component } from 'react';

class CurrentlyReading extends Component{
    constructor(props){
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(book,event){
        console.log(event.target.value);
        console.log(book[0].book);
        this.props.updateBook(book[0].book,event.target.value);

      }
    render(){
      console.log("Current is reading");
        return(
            <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                       {this.props.books.map((book)=>(
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={book.shelf}  onChange={this.handleChange.bind(this, [{book}, event])} >
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                       ))}
                    </ol>
                  </div>
                </div>
        )
    }
}
export default CurrentlyReading