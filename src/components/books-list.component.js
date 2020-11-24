import React, { Component } from "react";
import BookDataService from "../services/book.service";
import { Link } from "react-router-dom";
import { styles } from "../css-common"
import { TextField, Button, Grid, ListItem, withStyles } from "@material-ui/core";

class BooksList extends Component { 
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveBooks = this.retrieveBooks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBook = this.setActiveBook.bind(this);
    this.removeAllBooks = this.removeAllBooks.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      books: [],
      currentBook: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveBooks();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveBooks() {
    BookDataService.getAll()
      .then(response => {
        response.data = (response.data!=undefined && response.data.data!=undefined) ? response.data.data: response.data;
        console.log("response.data",response.data);
        this.setState({
          books: response.data
        });    

      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBooks();
    this.setState({
      currentBook: null,
      currentIndex: -1
    });
  }

  setActiveBook(book, index) {
    this.setState({
      currentBook: book,
      currentIndex: index
    });
  }

  removeAllBooks() {
    BookDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    console.log("searchTitle gets called");
    BookDataService.findByTitle(this.state.searchTitle)
      .then(response => {
       
        response.data = (response.data!=undefined && response.data.data!=undefined)?response.data.data:response.data;
        console.log("response.data",response.data);
        this.setState({
          books: [response.data]
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { classes } = this.props
    const { searchTitle, books, currentBook, currentIndex } = this.state;

    return (
      <div className={classes.form}>
        <Grid container>
       
          <Grid className={classes.search} item sm={12} xs={12} md={12} xl={12} lg={12}>
            <TextField
              label="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <Button
              size="small"
              variant="outlined"
              className={classes.textField}
              onClick={this.searchTitle}>
              Search
            </Button>
          </Grid>

          <Grid item md={4}>
            <h2>Books List</h2>

            <div className="list-group">
              {books &&
                books.map((book, index) => (
                
                  <ListItem
                   // selected={index === currentIndex}
                    onClick={() => this.setActiveBook(book, index)}
                    divider
                    button	
                    key={index}>
                    {book.title}
                  </ListItem>
                ))}
            </div>

            <Button
              className={`${classes.button} ${classes.removeAll}`}
              size="small"
              color="secondary"
              variant="contained"
              onClick={this.removeAllBooks}
            >
              Remove All
          </Button>
          </Grid>

          <Grid item md={8}>
            {currentBook ? (
              <div className={classes.detail}>
                <h4>Book</h4>
                <div className={classes.detail}>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentBook.title}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Book Name:</strong>
                  </label>{" "}
                  {currentBook.bookname}
                </div>

                <div className={classes.detail}>
                  <label>
                    <strong>Author Name:</strong>
                  </label>{" "}
                  {currentBook.authorname}
                </div>

                <div className={classes.detail}>
                  <label>
                    <strong>Created At:</strong>
                  </label>{" "}
                  {currentBook.createdAt}
                </div>

                <div className={classes.detail}>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentBook.description}
                </div>


                <div className={classes.detail}>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentBook.published ? "Published" : "Pending"}
                </div> 

                <Link
                    to={"/books/" + currentBook.id}
                    className={classes.edit}
                  >
                    Edit
                </Link>

              </div>
            ) : (
                <div>
                  <br />
                  <p className={classes.book}>Please click on a Book...</p>
                </div>
              )}
          </Grid>
          </Grid>

      </div>
    );
  }
}

export default withStyles(styles)(BooksList)