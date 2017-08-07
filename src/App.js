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
     * 
     * <Route path='/:id' render={(params)=>(<BookList data={params} books={this.state.books} />)}
         />
     */
    searchQuery:'',
    books:[],
    InitialBooks:[]
  }
    this.getSearchQuery = this.getSearchQuery.bind(this);
    this.updateBookShelf = this.updateBookShelf.bind(this);
    this.getAllBooks = this.getAllBooks.bind(this);
    this.getBookList = this.getBookList.bind(this);
    this.updatingBooks = this.updatingBooks.bind(this);
  }
  getSearchQuery(query){
    BooksAPI.search(query, 10).then((books)=>{
      this.setState({
        books:books
      });
    });
  }
  updateBookShelf(books,book,shelf){
    //removed typeof
    if(books !== null){
          this.setState({InitialBooks:books});
          BooksAPI.update(book,shelf).then((result)=>{console.log(result)});
    }else{
      let booksUpdate = this.state.InitialBooks;
      booksUpdate = booksUpdate.push(book);
      this.setState({InitialBooks: booksUpdate});
      BooksAPI.update(book,shelf).then((result)=>{console.log(result)});
    }
  }
  getAllBooks(){
   BooksAPI.getAll().then((books)=>{
       this.setState({
         InitialBooks:books
       });
     });
  }
  getBookList(){
    if(this.state.InitialBooks === []){
      this.getAllBooks();
      console.log("fetching new set of books")
    } else { return this.state.InitialBooks;}
    return this.state.InitialBooks;
  }
  componentDidMount(){
    console.log("Parent Will mount");
     this.getAllBooks();
  }
  updatingBooks(books){
    this.setState({InitialBooks:books});
    console.log(books);
  }
  render() {
    return (
      <div>
        <Route exact path='/' render={(params)=>(<BookList updateBook={this.updateBookShelf} updatingBooks={this.updatingBooks} initialBooks={this.state.InitialBooks}/>)}
         />
         <Route exact path='/search' render={()=>(
          <BookSearch updateBook={this.updateBookShelf} searchedBooks={this.state.books} getSearchQuery={this.getSearchQuery }/>
        )}
         /> 
      </div>
    )
  }
}

export default BooksApp
