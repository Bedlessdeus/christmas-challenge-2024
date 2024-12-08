import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const AUTH_TOKEN = process.env.AUTH_TOKEN || 'asdnA?!)08;DA)D=S1-K)=!D';

app.use(express.json());

// Don't require authorization for these endpoints (optional)
let ignoreList = [];

/*
 * Overwrite the existing ignoreList
 */
const setIgnoreList = (list) => {
    ignoreList = list;
};

/*
 * Check if auth header is present and valid
 */
const checkAuthentication = (req, res, next) => {
    // Check if the endpoint is in the ignore list
    if(ignoreList.includes(req.path)) {
        return next();
    }

    const {authorization} = req.headers;
    // Check if the authorization header is present
    if (!authorization) {
        return res.status(401).send({message: 'Token is required'});
    }

    // Check if the authorization header is valid
    if (authorization !== AUTH_TOKEN) {
        console.log(authorization);
        return res.status(403).send({message: 'Not authorized'});
    }
    next();
};

export default {checkAuthentication, setIgnoreList};