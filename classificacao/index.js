require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const { PORT } = process.env;

const funcoes = {
  ObservacaoCriada: async (observacao) => {
    observacao.status =
      observacao.texto.toLowerCase().includes('importante') ?
      'importante' :
      observacao.texto.toLowerCase().includes('urgente') ?
      'urgente' :
      'comum';

    try {
      await axios.post(
        'http://localhost:10000/eventos',
        {
          type: 'ObservacaoClassificada',
          payload: observacao
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
};

app.post('/eventos', async (req, res) => {
  try {
    funcoes[req.body.type](req.body.payload);
    await axios.post('http://localhost:8000/eventos', req.body);
  } catch (error) {
    console.error(error);
  }
  res.status(200).end();
});

app.listen(PORT, () => {
  console.log(`Classificação. Porta ${PORT}`);
});