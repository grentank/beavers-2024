const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const apiCharRouter = require('./routes/apiCharRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/characters', apiCharRouter);

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
