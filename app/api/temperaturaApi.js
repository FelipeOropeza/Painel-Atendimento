import express from "express";

const routes = express.Router();

const API_KEY = process.env.API_KEY;
const URL_MAIN = "https://api.openweathermap.org/data/2.5/weather";
const UNITS = "metric";

routes.get('/temperatura', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude e Longitude são necessários' });
  }

  const url = `${URL_MAIN}?lat=${lat}&lon=${lon}&units=${UNITS}&APPID=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      return res.status(data.cod).json({ error: data.message });
    }

    res.json({ temperature: data.main.temp });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter dados da temperatura' });
  }
});

export default routes;
