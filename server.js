// server.js
const express = require('express');
const bodyParser = require('body-parser');
const SemaphoreSMS = require('semaphore-ph-api');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

const semaphoreClient = new SemaphoreSMS({
  apiKey: 'd9a2903a64895a8d8335b87f7e486297',
  version: 'api/v4',
  host: process.env.SEMAPHORE_HOST || 'https://api.semaphore.co/',
});

app.post('/send-message', async (req, res) => {
  try {
    const { number, message } = req.body;

    const response = await semaphoreClient.sendMessage(
        {
          number,
          message,
          sender_name: 'SEMAPHORE',
        },
        (error, result) => {
          if (error) {
            console.error('Error sending message:', error);
            res.status(500).json({ error: 'Error sending message' });
          } else {
            console.log('Message sent successfully:', result);
            res.json(result);
          }
        }
      );

  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});