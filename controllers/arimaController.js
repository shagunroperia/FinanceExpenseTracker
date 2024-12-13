const arimaService = require('../services/arimaService');

const getArimaPrediction = async (req, res) => {
  const inputData = req.body;  // Expecting JSON with 'steps' as a field

  try {
    const forecast = await arimaService.getArimaForecast(inputData);
    res.json(forecast);
  } catch (error) {
    console.error('Error in ARIMA prediction:', error);
    res.status(500).json({ error: 'Error making ARIMA prediction' });
  }
};

module.exports = { getArimaPrediction };
