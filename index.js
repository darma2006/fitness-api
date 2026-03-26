require('dotenv').config();
const express = require('express');
const app = express();

const mongodb = require('./models/db');

app.use(express.json());

app.use('/workouts', require('./routes/workouts'));
app.use('/exercises', require('./routes/exercises'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(process.env.PORT, () => {
      console.log("Server running");
    });
  }
});

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));