const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const app = express();

mongoose.connect("mongodb+srv://<username>:<password>@cluster0-ks7nx.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(routes);
//HTTP methods: GET, POST, PUT and DELETE

//Params types
//Query params: req.query(filters, pagination, ordenation, ...)
//Route params: req.params(identify a resource in modification or removal)
//Body: req.body(data for creation or modification a resgistry )



app.listen(3333);
