var express = require('express');
var router = express.Router();

var pool = require('../modules/pool');

router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM food ORDER BY id;', function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            })
        }
    })
});

router.post('/', function (req, res) {
    var newFood = req.body;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('INSERT INTO food (name, deliciousness_rating, is_hot) VALUES ($1, $2, $3);', [newFood.name, newFood.deliciousness_rating, newFood.is_hot], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            })
        }
    })
});

router.delete('/:id', function (req, res) {
    var foodToDeleteId = req.params.id;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('DELETE FROM food WHERE id=$1;', [foodToDeleteId], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            })
        }
    })
});

router.put('/', function (req, res) {
    var foodToEdit = req.body;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`UPDATE food SET
            name=$1, deliciousness_rating=$2, is_hot=$3
            WHERE id=$4;`, [foodToEdit.name, foodToEdit.deliciousness_rating, foodToEdit.is_hot, foodToEdit.id], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            })
        }
    })
});

// router.delete('/:id', function (req, res){
//     pool.connect(function (errorConnectingToDatabase, client, done){
//         if (errorConnectingToDatabase){
//             console.log('Error connecting to database', errorConnectingToDatabase);
//             res.sendStatus(500);
//         } else {
//             client.query('DELETE FROM food WHERE id=$1', [req.params.id], function (errorMakingQuery, result){
//             done();
//             if (errorMakingQuery){
//                 console.log('Error making query', errorMakingQuery);
//                 res.sendStatus(500);
//             } else {
//                 res.sendStatus(200);
//             }
//             })
//         }
//     })
// })

// router.put('/:id', function (req, res){
//     pool.connect(function (errorConnectingToDatabase, client, done){
//         if (errorConnectingToDatabase){
//             console.log('Error connecting to database', errorConnectingToDatabase);
//             res.sendStatus(500);
//         } else {
//             client.query('UPDATE food SET is_hot = NOT is_hot WHERE id=$1', [req.params.id], function (errorMakingQuery, result){
//             done();
//             if (errorMakingQuery){
//                 console.log('Error making query', errorMakingQuery);
//                 res.sendStatus(500);
//             } else {
//                 res.sendStatus(200);
//             }
//             })
//         }
//     })
// })

module.exports = router;
