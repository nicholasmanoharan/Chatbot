const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;
const GOOGLE_API_KEY = 'AIzaSyDaaoRUMXkJDK6dxi4wA_HeSc_UMSVE1eUY'; 

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/therapists', async (req, res) => {
    const feeling = req.body.feeling;

    const userLocation = 'Phoenix, AZ'; 

    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
            params: {
                query: 'therapists in ' + userLocation,
                key: GOOGLE_API_KEY
            }
        });

        const therapists = response.data.results.map(place => ({
            name: place.name,
            location: place.formatted_address
        }));

        res.json({ therapists });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching therapists');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
