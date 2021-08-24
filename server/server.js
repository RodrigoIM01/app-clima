const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

// port
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/countries/:name', (req, res) => {
    // readFile data.json
    console.log(req.params.name);
    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
        if (err) throw err;
        const dataParse = JSON.parse(data)
        const find = dataParse.filter(item => item.name.toLowerCase().includes(req.params.name.toLocaleLowerCase()));
        res.json(find);
    });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
