const express = require('express');
const router = express.Router();
const arimaController = require('../controllers/arimaController');

router.post('/predict', arimaController.getArimaPrediction);

module.exports = router;
