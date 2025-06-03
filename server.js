const express = require('express');
const app = express();

const PORT = 4000;

let arr = [];
let index = 0;

app.use(express.static('public'));
app.use(express.json());

app.get('/main', (req, res) => {
    res.status(200).json(arr);
});

app.post('/main', (req, res) => {
    const { country } = req.body;

    if(!country || country.trim() === '') {
        return res.status(400).json({error: 'All fields are required !'})
    };

    const new_data = {
        id: index++,
        country: country
    };

    if(!new_data.country || new_data.country.trim() === '') {
        index--;
        return res.status(400).json({error: 'No whitespaces required !'})
    };

    arr.push(new_data);
    res.status(201).json(new_data);
});

app.delete('/main/:id', (req, res) => {
    const id  = Number(req.params.id);

    const check_id = arr.some(arr => arr.id === id);
    if(!check_id) {
       return res.status(400).json({error: 'No ID found'});
    };

    arr = arr.filter(arr => arr.id !== id);

    res.json({ message: "Country deleted", remaining: arr})
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
});
