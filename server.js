const express = require('express');
const app = express();

app.get('/getRandomShape', (req, res) => {
    res.send(["line", "triangle", "rectangle", "circle"][Math.floor(Math.random() * 4)]);
});

app.get('/getRandomColor', (req, res) => {
    res.send(["red", "orange", "yellow", "green", "blue", "indigo", "#8F00FF"][Math.floor(Math.random() * 7)]);
});

app.listen(3001);