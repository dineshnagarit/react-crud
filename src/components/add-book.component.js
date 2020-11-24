import React, { Component } from "react";
import BookDataService from "../services/book.service";
import { TextField, Button, withStyles } from "@material-ui/core"
import { styles } from "../css-common"

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthorName = this.onChangeAuthorName.bind(this);
        this.onChangeBookName = this.onChangeBookName.bind(this);
        this.onChangeBookName = this.onChangeBookName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveBook = this.saveBook.bind(this);
        this.newBook = this.newBook.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            authorname:"",
            bookname:"",
            createdAt: new Date(),
            published: false,
            submitted: false
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeAuthorName(e) {
        this.setState({
            authorname: e.target.value
        });
    }

    onChangeBookName(e) {
        this.setState({
            bookname: e.target.value
        });
    }

    

    saveBook() {
        var data = {
            title: this.state.title,
            description: this.state.description,
            authorname: this.state.authorname,
            bookname: this.state.bookname,
            createdAt: this.state.createdAt,
            published: this.state.published
        };

        BookDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    authorname: response.data.authorname,
                    bookname: response.data.bookname,
                    createdAt: response.data.createdAt,
                    published: response.data.published,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newBook() {
        this.setState({
            id: null,
            title: "",
            description: "",
            authorname:"",
            bookname:"",
            createdAt: new Date(),
            published: false,
            submitted: false
        });
    }

    render() {
        const { classes } = this.props

        return (
            <React.Fragment>
                {this.state.submitted ? (
                    <div className={classes.form}>
                        <h4>You submitted successfully!</h4>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={this.newBook}>
                            Add
                        </Button>
                    </div>
                ) : (
                        <div className={classes.form}>
                            <div className={classes.textField}>
                                <TextField
                                    label="Title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}
                                    required
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                    required
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="AuthorName"
                                    name="authorname"
                                    value={this.state.authorname}
                                    onChange={this.onChangeAuthorName}
                                    required
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="BookName"
                                    name="bookname"
                                    value={this.state.bookname}
                                    onChange={this.onChangeBookName}
                                    required   
                                />
                            </div>  

                            {/* <div className={classes.textField}>
                                <TextField
                                    label="CreatedAt"
                                    name="createdAt"
                                    value={this.state.createdAt}
                                    onChange={this.onChangeCreatedAt}
                                    required
                                />
                            </div> */}

                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={this.saveBook}>
                                Submit
                            </Button>
                        </div>
                    )}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddBook)