const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app= express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njogpdx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const volunteerCollection = client.db('Volunteers').collection('needVolunteers');
    const requestCollection = client.db('Volunteers').collection('requestVolunteers');
    const addCollection = client.db('Volunteers').collection('addVolunteers');

    // get volunteers  for need volunteers post section
  app.get('/volunteers', async(req, res) =>{
    const cursor = volunteerCollection.find();
    const result = await cursor.toArray();
    res.send(result)
  })

      // get volunteer post for post details page
  app.get('/postDetails/:id', async(req, res) =>{
    console.log(req.params.id)
    const cursor = volunteerCollection.find({_id: new ObjectId(req.params.id)});
    const result = await cursor.toArray();
    res.send(result)
  })

     // Be a Volunteer page
  app.post('/requestVolunteer', async(req, res) =>{
    const newRequest =req.body;    
    // send to mongodb
    const result = await requestCollection.insertOne(newRequest);
    res.send(result)
  })

     // add  volunteer post
  app.post('/addVolunteers', async(req, res) =>{
    const newAddRequest =req.body;    
    // send to mongodb
    const result = await addCollection.insertOne(newAddRequest);
    res.send(result)
  })




    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res)=>{
    res.send('helps hand is coming towards you')
})

app.listen(port, ()=>{
    console.log(`halps help server is running on port ${port}`)
})



