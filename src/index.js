const express = require('express')
const app = express();
const PORT = 3000
const v1route = require('./V1/Routes/workoutRoutes');
const bodyParser = require('body-parser');
const { swaggerDocs: V1SwaggerDocs } = require("./V1/swagger");


app.use(bodyParser.json())

app.use('/api/v1/workouts', v1route)

app.listen(PORT, () => {
    console.log('listening on port 3000')
    V1SwaggerDocs(app, PORT);
})