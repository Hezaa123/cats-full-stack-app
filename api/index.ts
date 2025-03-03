import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { CatProps } from '../public/types';

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const dataFilePath = path.join(__dirname, 'catBreeds.json');

// Helper function to read data from the JSON file
const readData = () => {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
};

// Helper function to write data to the JSON file
const writeData = (data: CatProps) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

app.get('/api', (req, res) => {
    res.send({ message: 'Hello from the Express server!' });
});

// Return full list of cat breeds
app.get('/api/cat-breeds', (req, res) => {
    const breeds = readData();
    res.json(breeds);
});

// Return a specific cat breed by ID
app.get('/api/cat-breeds/:id', (req, res) => {
    const breeds = readData();
    const breed = breeds.find((b: CatProps) => b.id === parseInt(req.params.id));

    if (breed) {
        res.json(breed);
    } else {
        res.status(404).send({ message: 'Cat breed not found' });
    }
});

// Add a new cat breed
app.post('/api/cat-breeds', (req, res) => {
    const breeds = readData();
    const maxId = breeds.length > 0 ? Math.max(...breeds.map((b: CatProps) => b.id)) : 0;
    const newBreed = { id: maxId + 1, ...req.body };

    breeds.push(newBreed);
    writeData(breeds);

    res.status(201).json(newBreed);
});

// Update a cat breed by ID
app.put('/api/cat-breeds/:id', (req, res) => {
    const breeds = readData();
    const index = breeds.findIndex((b: CatProps) => b.id === parseInt(req.params.id));

    if (index !== -1) {
        breeds[index] = { id: parseInt(req.params.id), ...req.body };
        writeData(breeds);
        res.json(breeds[index]);
    } else {
        res.status(404).send({ message: 'Cat breed not found' });
    }
});

// Delete a cat breed by ID
app.delete('/api/cat-breeds/:id', (req, res) => {
    const breeds = readData();
    const index = breeds.findIndex((b: CatProps) => b.id === parseInt(req.params.id));

    if (index !== -1) {
        breeds.splice(index, 1);
        writeData(breeds);
        res.json(breeds);
    } else {
        res.status(404).send({ message: 'Cat breed not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});