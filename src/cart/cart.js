const express = require('express');
const cart = express();
const conn = require('../../db');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

cart.get('/api/cart/all', (req, res) => {
    const client = new MongoClient(conn.uri, { useNewUrlParser: true});
    client.connect(err => {
        if(err) {
            return res.status(403).send(err);
        }
        const col = client.db(conn.dbName).collection(conn.colCart);
        col.find({}).toArray((err, result) => {
            if(err){
                return res.status(503).send(err);
            }
            res.send(result);
            client.close();
        })
    })
})

cart.get('/api/cart/one/:id', (req, res) => {
    const client = new MongoClient(conn.uri, { useNewUrlParser: true});
    client.connect(err => {
        if(err) {
            return res.status(403).send(err);
        }
        const col = client.db(conn.dbName).collection(conn.colCart);
        col.findOne({"_id": ObjectId(req.params.id)}, (err, result) => {
            if(err){
                return res.status(503).send(err);
            }
            res.send(result);
            client.close();
        })
    })
})

cart.get('/api/cart/delete/:id', (req, res) => {
    const client = new MongoClient(conn.uri, { useNewUrlParser: true});
    client.connect(err => {
        if(err) {
            return res.status(403).send(err);
        }
        const col = client.db(conn.dbName).collection(conn.colCart);
        col.deleteOne({"_id": ObjectId(req.params.id)}, (err, result) => {
            if(err){
                return res.status(503).send(err);
            }
            res.send(result);
            client.close();
        })
    })
})

cart.post('/api/cart/update', (req, res) => {
    if(!req.body.name) {
        return res.status(400).send('request body malformed')
    }
    const client = new MongoClient(conn.uri, { useNewUrlParser: true});
    client.connect(err => {
        if(err) {
            return res.status(403).send(err);
        }
        const col = client.db(conn.dbName).collection(conn.colCart);
        const query = {"_id": ObjectId(req.body._id)}
        const update = {$set: {
            "quantity": req.body.quantity,
            "amount": req.body.amount }
        }
        col.updateOne(query, update, (err, result) => {
            if(err) {
                return res.status(503).send(err)
            }
            res.send(result);
            client.close();
        })
    })
})

cart.post('/api/cart/item', (req, res) => {
    if(!req.body.name) {
        return res.status(400).send('request body malformed')
    }
    const client = new MongoClient(conn.uri, { useNewUrlParser: true});
    client.connect(err => {
        if(err) {
            return res.status(403).send(err);
        }
        const col = client.db(conn.dbName).collection(conn.colCart);
        const query = {
            "_id": ObjectId(req.body._id),
            "name": req.body.name,
            "quantity": req.body.quantity,
            "amount": req.body.amount
        }
        col.insertOne(query, (err, result) => {
            if(err) {
                return res.status(503).send(err)
            }
            res.send(result);
            client.close();
        })
    })
})

module.exports = cart;