const express = require('express');
const app = express();
const path = require('path');

const mqtt = require('mqtt')

const host = 'broker.emqx.io'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`

  const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'emqx',
  password: 'public',
  reconnectPeriod: 1000,
});

client.on('connect', () => {
  console.log('Connected')
})
const pubTopic = 'TESTE/LOP'

app.use(express.static('public'));
app.use(express.json()); // Habilita o uso de JSON no corpo da solicitação

app.post('/api/enviardados', (req, res) => {
  // Manipular os dados recebidos do cliente (req.body)
  const dadosRecebidos = req.body;
  console.log('Dados recebidos do cliente:', dadosRecebidos);
  
  while(!client.connected) {
    client.reconnect();
    console.log("reconnectando.............................");
  }
  
  client.on('connect', () => {
    console.log('Connected')
      
  })
  client.publish(pubTopic, JSON.stringify(dadosRecebidos), { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
  console.log(client.connected);
  // Envie uma resposta de volta ao cliente, se necessário
  res.json({ mensagem: 'Dados recebidos com sucesso!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

