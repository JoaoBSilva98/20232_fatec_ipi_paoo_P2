require('dotenv').config()
const express = require('express');
const moment = require('moment');
const app = express();
app.use(express.json());

const logs = {};

const { PORT } = process.env

app.post('/eventos', (req, res) => {
  const evento = req.body;
  const logId = Object.keys(logs).length + 1;
  
  logs[logId] = {
    tipo: evento.type,
    data: moment().format('YYYY-MM-DD HH:mm:ss')
  };

  console.log(logs[logId]);

  res.status(200).end();
});

app.get('/logs', (req, res) => {
  res.json(logs);
});

app.listen(PORT, () => {
  console.log(`Log: ${PORT}`);
});
