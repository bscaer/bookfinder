import React from 'react';
import './Book.css';
import { Button } from '@mui/material';

export default class Book extends React.Component {

    constructor(props) {
        super(props);

        this.book = props;
    }
    
    render() {
        return (
            <div className="box-shadow-md">
                <img
                    src={this.book.imageLinks && this.book.imageLinks.thumbnail? this.book.imageLinks.thumbnail: ""}
                    alt={this.book.title ? this.book.title : "Book Cover"}/>
                <div>
                    <p className="title">{this.book.title? this.book.title: ""}</p>
                    <p>Author: {this.book.authors && this.book.authors[0]? this.book.authors[0]: ""}</p>
                    <p>Publisher: {this.book.publisher? this.book.publisher: ""}</p>
                    <div><Button variant="contained" as="a" href={this.book.infoLink? this.book.infoLink: ""} target="_blank">See this Book</Button></div>
                </div>
            </div>
        )
    }
}