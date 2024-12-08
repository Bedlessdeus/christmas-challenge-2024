import express from 'express';
import dotenv from 'dotenv';

import auth from './middleware/auth.js';
import files from './files/files.js';

const app = express();
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000;
const AUTH_TOKEN = process.env.AUTH_TOKEN || 'asdnA?!)08;DA)D=S1-K)=!D';

app.use(auth.checkAuthentication);

auth.setIgnoreList(['/verifyme']);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/verifyme', (req, res) => {
    res.status(200).send({
        message: 'Sending verification',
        content: AUTH_TOKEN
    });
});

app.use(files);

app.use((req, res) => {
    res.status(404).send({message: 'Not found'});
});

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:%s', PORT);
});