import React from 'react'
import { Route } from 'react-router-dom';
import './App.css'
import BookList from './BooksList';
import BookSearch from './BookSearch';
import * as BooksAPI from './BooksAPI';
class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     * showSearchPage: true
     */
    searchQuery:'',
    InitialBooks:[],
    searchedBooks:[]
  }
    this.getSearchQuery = this.getSearchQuery.bind(this);
    this.updateBookShelf = this.updateBookShelf.bind(this);
    this.getAllBooks = this.getAllBooks.bind(this);
  }
  getAllBooks(){
     BooksAPI.getAll().then((books)=>{
            this.setState({
            InitialBooks:books
             });
         });
  }
  getSearchQuery(query){
    if(query.length>=1){
      BooksAPI.search(query, 10).then((books)=>{
        books.forEach((book)=>{
          this.state.InitialBooks.forEach((InitialBook)=>{
            InitialBook.id===book.id? book["shelf"] = InitialBook.shelf:null;
          });
        });
        this.setState({searchedBooks:books});
      });
    }
  }
  updateBookShelf(books,book,shelf){
    if(books !== null){
          this.setState({InitialBooks:books});
          BooksAPI.update(book,shelf).then((result)=>{console.log(result)});
    }else{
      let booksUpdate = this.state.InitialBooks;
      booksUpdate.forEach((OriginalBook)=>{
        if(OriginalBook.id === book.id){
          OriginalBook["shelf"] = shelf;
        }
      });
      booksUpdate = booksUpdate.push(book);
      BooksAPI.update(book,shelf).then((result)=>{console.log(result)});
      this.setState({InitialBooks: booksUpdate});
    }
  }
  componentWillMount(){
    this.getAllBooks();
  }
  render() {
    return (
      <div>
        <Route exact path='/' render={(params)=>(<BookList updateBook={this.updateBookShelf} showBooks={this.getAllBooks} initialBooks={this.state.InitialBooks}/>)}
         />
         <Route exact path='/search' render={()=>(
          <BookSearch sendBooksForQuery={this.state.searchedBooks} updateBook={this.updateBookShelf} getSearchQuery={this.getSearchQuery}/>
        )}
         /> 
      </div>
    )
  }
}

export default BooksApp
