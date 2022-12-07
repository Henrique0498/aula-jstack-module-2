const express = require('express');
require('express-async-errors');
const routers = require('./routers');

const app = express();

app.use(express.json());
app.use(routers);
app.use((error, request, response, next) => {
  response.sendStatus(500);
});

app.listen(3000, () => console.log('🔥 Server started at http://localhost:3000'));
