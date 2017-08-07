 import React, { Component } from 'react';
 import { Link } from 'react-router-dom';

 class BookSearch extends Component{
     constructor(props){
         super(props);
         this.state={
             bookSearch:''
         }
         this.handleChange = this.handleChange.bind(this);
         this.getBookSearch = this.getBookSearch.bind(this);
     }
      handleChange(book,event){
          const bookToChange = book[0].book;
          const shelfType = event.target.value;
        this.props.updateBook(null,bookToChange, shelfType);
      }
     getBookSearch(e){
         if(e.key === 'Enter'){
             this.setState({bookSearch : e.target.value});
             this.props.getSearchQuery(e.target.value);
         }
     }
     render(){
        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={this.state.BookSearch} onKeyPress={this.getBookSearch}/>
                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                   {this.props.searchedBooks.map((book)=>(
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={book.shelf} onChange={this.handleChange.bind(this, [{book}, event])} >
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
export default BookSearch;