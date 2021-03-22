const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const cors = require('cors');

app.use(cors())

app.listen(3002, function() {
    console.log('listening on 3002')
  })

const MongoClient = require('mongodb').MongoClient

const connectionString = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('local');
    const usersCollection = db.collection('users')

    // Make sure you place body-parser before your CRUD handlers!
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    // to get all users
    app.get('/users', (req, res) => {
        db.collection('users').find().toArray()
            .then(results => {
                //console.log(results)
                res.json(results)
            })
            .catch(error => console.error(error))
    })
    //to get the perticular users
    app.get('/users/:name', (req, res) => {
        let name = req.params.name;
        db.collection('users').find({ name: name}).toArray()
            .then(results => {
                console.log(results)
                res.json(results)
            })
            .catch(error => console.error(error))
    })

    //to inserts a record
    app.post('/users', (req, res) => {
        usersCollection.insertOne(req.body)
            .then(result => {
                res.json('Success')
                })
            .catch(error => console.error(error))
        })
        
    //to update the record
    app.put('/users', (req, res) => {
        console.log(req.body)
        usersCollection.findOneAndUpdate(
            { name: 'Yoda' },
            {
                $set: {
                  name: req.body.name,
                  Image: req.body.quote,
                  //id: req.body.id
                }
              },
            {
                upsert: true
            }
          )
            .then(result => {res.json('Success')})
            .catch(error => console.error(error))
      })

      //deletes a particular record
      app.delete('/users', (req, res) => {
        usersCollection.deleteOne(
            { name: req.body.name }
          )
            .then(result => {
                if (result.deletedCount === 0) {
                  return res.json('No user to delete')
                }
                res.json(`Deleted User`)
              })
            .catch(error => console.error(error))
      })
  })