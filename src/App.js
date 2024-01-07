import React from 'react';
import './App.css';
import { Button, TextField } from '@mui/material';
import Book from './book/Book';

const API_KEY = process.env.REACT_APP_BOOKS_API_KEY

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            books: [],
            errMsg: "",
            searchTerm: "Potter"
        }
    }

    // The getBooks function fetches books that match the search term
    _getBooks = async () => {
        try {
            const options = {};
            const { timeout = 1000 } = options;

            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);

            const resp =
                await fetch(
                    `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchTerm}&key=${API_KEY}`,
                    { ...options, signal: controller.signal }
                );

            clearTimeout(id);

            const data = await resp.json();
            if (data.error) {
                return data.error.message;
            }
            else if (data.items) {
                return data.items;
            }
            else {
                return undefined;
            }
        } catch (e) {
            return `Problem fetching books: ${e}`;
        }
    }

    // The _refreshData function fetches the list of books from the
    // BookService and updates the list of books, which triggers render
    // to display the list of books.
    _refreshData = async () => {
        let resp = await this._getBooks();

        if (typeof resp === 'string')
        {
            this.setState({ errMsg: resp }); 
        }
        else
        {
            const books = resp === undefined ? [] : Object.keys(resp).map(key => resp[key]);
            this.setState({ errMsg: "", books: books });
        }
    }

    componentDidMount() {
        this._refreshData();
    }

    render() {
        return (
            <div className="App">
                <header>
                    <p className="header">BOOK FINDER</p>
                </header>
                <div className="search">
                    <TextField
                        variant="outlined"
                        label="Search" type="search"
                        value={this.state.searchTerm}
                        onChange={(e) => this.setState({ searchTerm: e.target.value })} />
                    <p/>
                    <Button variant="contained" onClick={() => this._refreshData()}>Search</Button>
                </div>
                <p className="error">{this.state.errMsg}</p>
                <div className="books">
                    {this.state.books.map(book => <Book key={book.id} {...book.volumeInfo} />)}
                </div>
            </div>
        );
    }
}
