const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.post('/fetch-data', async (req, res) => {
  const { city, movieTitle } = req.body;

  console.log(`Se obtuvo ${city} y ${movieTitle}`)

  try {
    const weatherResponse = await axios.get(`http://api.weatherapi.com/v1/current.json`, {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: city,
        aqi: 'no'
      }
    });

    console.log("Llamada al clima hecha")

    const movieResponse = await axios.get(`https://www.omdbapi.com/`, {
      params: {
        apikey: process.env.MOVIE_API_KEY,
        t: movieTitle
      }
    });

    console.log("Llamada a las peliculas hecha")

    res.json({
      weather: weatherResponse.data,
      movie: movieResponse.data
    });

    console.log("Respuesta enviada")

  } catch (error) {
    console.log("La llamada fallo: " + error.message)
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en la puerto: ${port}`);
});
