import express from 'express';
import dotenv from 'dotenv';

import auth from './middleware/auth.js';
import files from './files/files.js';

const app = express();
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000;
const AUTH_TOKEN = process.env.AUTH_TOKEN || 'asdnA?!)08;DA)D=S1-K)=!D';

/*
 * Check if auth token is provided (No Real Protection)
 */
app.use(auth.checkAuthentication);
//Set Ignore list to ignore the endpoint that provides the auth token
auth.setIgnoreList(['/verifyme']);

/*
 * Open the endpoint that serves the authtoken
 */
app.get('/verifyme', (req, res) => {
    res.status(200).send({
        message: 'Sending verification',
        content: AUTH_TOKEN
    });
});

/*
 * use the files middleware that lists / downloads files
 */
app.use(files);

/*
 * Default to 404 if endpoint is not found
 */
app.use((req, res) => {
    res.status(404).send({message: 'Not found'});
});

/*
 * Open the server to listen on X port, and notify the console
 */
app.listen(PORT, () => {
    console.log('Server is running on port http://localhost:%s', PORT);
});