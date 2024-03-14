const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const charRouter = require('./routes/charRouter');
const authRouter = require('./routes/authRouter');
const tokensRouter = require('./routes/tokensRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/tokens', tokensRouter);
app.use('/api/auth', authRouter);
app.use('/api/characters', charRouter);

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
