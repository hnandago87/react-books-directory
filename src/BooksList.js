import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
//import * as BooksAPI from './BooksAPI'

class BookList extends Component{
    constructor(props){
        super(props);
        this.state={
            books:[]
        }
        this.categorizeBooks = this.categorizeBooks.bind(this);
        this.updateBookStatus = this.updateBookStatus.bind(this);
        this.findBook = this.findBook.bind(this);
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
        const initialBookState = this.state.books;
        const bookToUpdate = this.findBook(book.id);
        bookToUpdate.shelf = shelf;
        initialBookState.forEach((lookUpBook)=>{
            if(lookUpBook.id === bookToUpdate.id){
                lookUpBook = bookToUpdate;
                console.log(lookUpBook);
            }
        });
        this.setState({books:initialBookState});
        this.props.updateBook(initialBookState, book, shelf);
    }
    componentWillReceiveProps(newProps){
        this.setState({books:newProps.initialBooks});
    }
    componentDidMount(){
        this.props.showBooks();
        this.state.books.length<1?console.log("empty"):console.log(this.state.books);
    }
    shouldComponentUpdate(newProps, newState){
        console.log(newProps);
        console.log(newState);
        if(newState.books.length>0){
            return true
        } else {
            return false;
        }
    }
    render(){
        const bookLength = this.state.books.length;
        return(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                 {bookLength >1 ? (
              <div>
                    <BookShelf shelfTitle='Currently Reading' books={this.categorizeBooks('currentlyReading')} updateBook={this.updateBookStatus} />
                    <BookShelf shelfTitle='Want to Read' books={this.categorizeBooks('wantToRead')} updateBook={this.updateBookStatus} />
                    <BookShelf shelfTitle='Read' books={this.categorizeBooks('read')} updateBook={this.updateBookStatus} />
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