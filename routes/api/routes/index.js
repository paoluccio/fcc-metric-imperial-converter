const express = require('express');
const ConversionController = require('../controllers/ConversionController');
const validateInput = require('../middlewares/validations');

const api = express.Router();

api.get('/convert', validateInput, ConversionController.handle_conversion);

module.exports = api;