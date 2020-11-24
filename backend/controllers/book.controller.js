const dbLogModel = require('../dao/db/functions'); 
const responseHandler = require('../helpers/responseHandler');
const responseType = require('../helpers/responseType');
const request = require("request-promise-native");
const fs = require("fs");
const path = require('path')
let bookJSONData = [
 
];
/**
 * Create book
 * @body {*} bodyData
 */
let createBook  = async(req,res,next) => {
 
  try {

    console.log("ceatebook gets called", req.body);
    let dataObj = {
      id:Math.floor(Math.random()*90000) + 10000,
      title: req.body.title,
      description: req.body.description,
      authorname: req.body.authorname,
      bookname: req.body.bookname,
      createdAt: req.body.createdAt,
      published: req.body.published
    };

    bookJSONData.push(dataObj);

    let response = {   
      code: responseType.OK,
      data: bookJSONData,
      message: 'Successfully created book'
    };

    responseHandler.sendData(req, res, response);

  } catch(e) {
    next(e);
  }
  
}


/**
 * Update book
 */
let updateBook  = async(req,res,next) => {
  
  try {
    console.log("updateBook gets called", req.body.id);
    let response = {   
      code: responseType.OK,
      data: bookJSONData,
      message: 'Successfully updated book'
    };

    responseHandler.sendData(req, res, response);

  } catch(e) {
    next(e);
  }

}


/**
 * Get book
 */
let getBook  = async(req,res,next) => {
 // console.log("getBook gets called req.params", req.params);
  try {
    console.log("updateBook gets called", req.params.id);
    let response = {   
      code: responseType.OK,
      data: bookJSONData[0],
      message: 'Successfully list book'
    };

    responseHandler.sendData(req, res, response);

  } catch(e) {
    next(e);
  }
}


/**
 * Get books
 */
let getBooks  = async(req,res,next) => {

  try {
    console.log("req.query.title",req.query.title);
    if(req.query.title!=undefined) bookJSONData = bookJSONData[0];
    let response = {   
      code: responseType.OK,
      data: bookJSONData,
      message: 'Successfully get list of books'
    };

    responseHandler.sendData(req, res, response);

  } catch(e) {
    next(e);
  }
}


/**
 * Delete book
 */
let deleteBook  = async(req,res,next) => {
  try {
    console.log("deleteBook gets called", req.params.id);
    let response = {   
      code: responseType.OK,
      data: bookJSONData,
      message: 'Successfully deleted book'
    };

    responseHandler.sendData(req, res, response);

  } catch(e) {
      next(e);
  }
}


module.exports = {
  createBook,
  updateBook,
  deleteBook,
  getBook,
  getBooks
};
