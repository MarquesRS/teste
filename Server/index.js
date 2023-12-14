const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

const app = express(); 

app.use(cors()); 

app.listen(4000, () => console.log('ON')); 

app.get('/download', (req, res) => {
    var URL = req.query.URL; 
    res.header('Content-Disposition', 'attachment; filename="video.mp4"');   
    ytdl(URL, {format: 'mp4'}).pipe(res);
});

app.get("/verify", (req, res) => {
    let URL = req.query.URL; 
    if (!ytdl.validateURL(URL)) {
        return res.status(400).send('URL inválida');
    } else {
        res.status(200).send('URL válida');
    }
});