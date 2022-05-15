const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.r3yir.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        await client.connect();
        const serviceCollection = client.db('makeupWirehouse').collection('product');

        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await serviceCollection.findOne(query);
            res.send(product);
            mode: 'no-cors'
        });

        app.post('/product', async (req, res) => {
            const newService = req.body;
            const result = await serviceCollection.insertOne(newService);
            res.send(result);
        });

        app.delete('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await serviceCollection.deleteOne(query);
            res.send(result);
        });
    }
    finally {

    }
}

run().catch(console.dir);







app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('running warehouse serveer');
})
app.get('/hero', (req, res) => {
    res.send('hero meet heroku');
})

app.listen(port, () => {
    console.log('port', port);
})