import React from 'react'
import { Route } from 'react-router-dom';
import './App.css'
import BookList from './BooksList';
import BookSearch from './BookSearch';

class BooksApp extends React.Component {
  state = {
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
    books:[]
  }
  render() {
    console.log("main app triggered");
    return (
      <div>
        <Route exact path='/' render={(params)=>(<BookList />)}
         />
         <Route exact path='/search' render={()=>(
          <BookSearch />
        )}
         /> 
      </div>
    )
  }
}

export default BooksApp
