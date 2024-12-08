import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const AUTH_TOKEN = process.env.AUTH_TOKEN || 'asdnA?!)08;DA)D=S1-K)=!D';

app.use(express.json());

// Don't require authorization for these endpoints (optional)
let ignoreList = [];

const setIgnoreList = (list) => {
    ignoreList = list;
};

const checkAuthentication = (req, res, next) => {
    if(ignoreList.includes(req.path)) {
        return next();
    }

    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).send({message: 'Token is required'});
    }
    if (authorization !== AUTH_TOKEN) {
        console.log(authorization);
        return res.status(403).send({message: 'Not authorized'});
    }
    console.log("Authorization: ", authorization);
    next();
};

export default {checkAuthentication, setIgnoreList};