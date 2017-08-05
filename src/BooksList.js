import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CurrentlyReading from './CurrentlyReading';
import WantToRead from './WantToRead';
import Read from './Read';
import * as BooksAPI from './BooksAPI'

class BookList extends Component{
    //Pseudo code to update a particular book:
    //1: get the book and the shelf value after change -- done
    //2: find the particular book from the this.state
    //3: update the book shelf property
    //4: merge the book with the existing state object
    //5: replace the book state with the newly updated object
    constructor(props){
        super(props);
        this.categorizeBooks = this.categorizeBooks.bind(this);
        this.updateBookStatus = this.updateBookStatus.bind(this);
        this.findBook = this.findBook.bind(this);
    }
    state={
        books:[]
    }
    categorizeBooks(type){
        var books = [];
        for(var i=0;i<this.state.books.length;i++){
            if(this.state.books[i].shelf===type){
                books.push(this.state.books[i]);
            }
        }
        return books;
    }
    findBook(bookToFind){
        return this.state.books.find(function(book){
            return book.id === bookToFind;
        })
    }
    updateBookStatus(book, shelf){
        console.log(this.findBook(book.id));

    }
    
    componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({
        books:books
      });
    });
  }
    render(){
        const booksList = this.state.books.length;
        console.log("triggered booksList");
        return(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                 {booksList >1 ? (
              <div>
                    <CurrentlyReading books={this.categorizeBooks('currentlyReading')}/>
                    <WantToRead books={this.categorizeBooks('wantToRead')} updateBook={this.updateBookStatus} />
                    <Read books={this.categorizeBooks('read')} />
              </div>
              ): null}
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}
}
export default BookList;