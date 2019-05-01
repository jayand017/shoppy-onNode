const express = require('express');
const list = express();
const conn = require('../../db');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;


list.post('/api/list/item', (req, res) => {
    if(!req.body.name){
        return res.status(400).send('request body malformed')
    }
    const client = new MongoClient(conn.uri, { useNewUrlParser: true });
    client.connect(err => {
        if(err) {
            return res.status(403).send(err);
        }
        const col = client.db(conn.dbName).collection(conn.colList);
        col.insertOne(req.body, (err, result) => {
            if(err){
                return res.status(503).send(err);
            }
            res.send(result);
            client.close();
        })
    })
})

list.get('/api/list/all', (req, res) => {
    const client = new MongoClient(conn.uri, { useNewUrlParser: true });
    client.connect(err => {
        if(err) {
            return res.status(403).send(err);
        }
        const col = client.db(conn.dbName).collection(conn.colList);
        col.find({}).toArray((err, result) => {
            if(err){
                return res.status(503).send(err);
            }
            res.send(result);
            client.close();
        })
    })
})

list.get('/api/list/one/:id', (req, res) => {
    const client = new MongoClient(conn.uri, { useNewUrlParser: true });
    client.connect(err => {
        if(err) {
            return res.status(403).send(err);
        }
        const col = client.db(conn.dbName).collection(conn.colList);
        col.findOne({ "_id": ObjectId(req.params.id)}, (err, result) => {
            if(err){
                return res.status(503).send(err);
            }
            res.send(result);
            client.close();
        })
    })
})

module.exports = list;