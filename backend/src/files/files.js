import express from "express";
import os from "os";
import fs from "fs";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PATH = process.env.FILE_PATH || os.tmpdir();

app.use(express.json());

/*
 * Endpoint to download a file
 */
app.get('/files', (req, res) => {
    const { file } = req.query;
    // Check if file parameter is provided
    if (!file) {
        return res.status(400).send({ message: 'File parameter is required' });
    }

    // Construct full path on the server, check for any attempts to use illegal characters
    const filePath = `${PATH}/${file.replace(/[^a-z0-9.]/gi, '')}`;

    // Check if user is attempting to exit hosted directory
    if(filePath.includes('..') || !filePath.startsWith(PATH)) {
        return res.status(403).send({message: 'Invalid file path'});
    }

    //Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).send({message: 'File not found'});
    }

    // Send the file
    res.download(filePath);
});

/*
 * List files in the directory
 */
app.get('/files/list', (req, res) => {
    fs.readdir(PATH, (err, files) => {
        if (err) {
            return res.status(500).send({message: 'Error reading files'});
        }
        res.status(200).send(files);
    });
});

export default app;