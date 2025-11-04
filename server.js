const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connection established.'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('API Running');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    const response = process.env.NODE_ENV === 'development' ? { message: 'Something broke!', error: err.stack } : { message: 'Internal Server Error' };
    res.status(500).json(response);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});