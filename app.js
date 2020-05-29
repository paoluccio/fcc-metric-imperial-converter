const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes/index');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(cors());
app.use(router);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));