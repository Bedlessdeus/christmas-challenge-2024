import express from "express";
import os from "os";
import fs from "fs";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PATH = process.env.FILE_PATH || os.tmpdir();

app.use(express.json());

app.get('/files', (req, res) => {
    const { file } = req.query;
    if (!file) {
        return res.status(400).send({ message: 'File parameter is required' });
    }
    console.log("Looking for file %s", file);
    const filePath = `${PATH}/${file.replace(/[^a-z0-9.]/gi, '')}`;
    console.log("Full Path: %s", filePath);
    if(filePath.includes('..')) {
        return res.status(403).send({message: 'Invalid file path'});
    }
    if (!fs.existsSync(filePath)) {
        return res.status(404).send({message: 'File not found'});
    }
    res.download(filePath);
});

app.get('/files/list', (req, res) => {
    fs.readdir(PATH, (err, files) => {
        if (err) {
            return res.status(500).send({message: 'Error reading files'});
        }
        res.status(200).send(files);
    });
});

export default app;