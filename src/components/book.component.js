import React, { Component } from "react";
import BookDataService from "../services/book.service";
import { styles } from "../css-common"
import { TextField, Button, withStyles } from "@material-ui/core";

class Book extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAuthorName = this.onChangeAuthorName.bind(this);
        this.onChangeBookName = this.onChangeBookName.bind(this);
        this.getBook = this.getBook.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);

        this.state = {
            currentBook: {
                id: null,
                title: "",
                description: "",
                authorname:"",
                bookname:"",
                createdAt: new Date(),
                published: false,
                submitted: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getBook(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentBook: {
                    ...prevState.currentBook,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentBook: {
                ...prevState.currentBook,
                description: description
            }
        }));
    }

    onChangeAuthorName(e) {
        const authorname = e.target.value;

        this.setState(function (prevState) {
            return {
                currentBook: {
                    ...prevState.authorname,
                    authorname: authorname
                }
            };
        });
    }

    onChangeBookName(e) {
        const bookname = e.target.value;

        this.setState(function (prevState) {
            return {
                currentBook: {   
                    ...prevState.bookname,
                    bookname: bookname
                }
            };
        });
    }

    getBook(id) {
        console.log("get book function called",id);
        BookDataService.get(id)
        .then(response => {
            console.log("get specific book",response.data);
            response.data = (response.data!=undefined && response.data.data!=undefined)?response.data.data:response.data;
            this.setState({
                currentBook: response.data
            });  
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentBook.id,
            title: this.state.currentBook.title,
            description: this.state.currentBook.description,
            published: status
        };

        BookDataService.update(this.state.currentBook.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentBook: {
                        ...prevState.currentBook,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateBook() {
        BookDataService.update(
            this.state.currentBook.id,
            this.state.currentBook
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The book was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteBook() {
        BookDataService.delete(this.state.currentBook.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/books')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentBook } = this.state;
        const { classes } = this.props

        return (
            <div>
                {currentBook ? (
                    <div className={classes.form}>
                        <h2>Book</h2>
                        <form>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Title"
                                    name="title"
                                    value={currentBook.title}
                                    onChange={this.onChangeTitle}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Description"
                                    name="description"
                                    value={currentBook.description}
                                    onChange={this.onChangeDescription}
                                    required
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="AuthorName"
                                    name="authorname"
                                    value={currentBook.authorname}
                                    onChange={this.onChangeAuthorName}
                                    required
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="BookName"
                                    name="bookname"
                                    value={currentBook.bookname}
                                    onChange={this.onChangeBookName}
                                    required   
                                />
                            </div>  


                            <div className="form-group">
                                <label>
                                    <strong>Status: </strong>
                                </label>
                                {currentBook.published ? "Published" : "Pending"}
                            </div>
                        </form>
                        <div className={classes.buttonWrapper}>
                           
                            <Button
                                className={`${classes.delete} ${classes.button}`}
                                onClick={this.deleteBook}
                            >
                                Delete
                             </Button>

                            <Button
                                type="submit"
                                className={`${classes.update} ${classes.button}`}
                                onClick={this.updateBook}
                            >
                                Update
                            </Button>
                        </div>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a Book...</p>
                        </div>
                    )}
            </div>
        );
    }
}

export default withStyles(styles)(Book)