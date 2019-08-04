var express = require('express');
var router = express.Router();
var Volenteer = require('../models/volenteer');

router.post('/', function(req, res){
    if(!req.body.name) {
        return res.status(404).json({error: 'invalid data'});
    }

    var volenteer = new Volenteer();
    volenteer.name = req.body.name;
    volenteer.introduce = req.body.introduce;
    volenteer.image = req.body.image;
    volenteer.tags = req.body.tags;

    volenteer.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});
    });
});

router.get('/', function(req, res){
    Volenteer.find(function(err, volenteers){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(volenteers);
    })
});

router.get('/:volenteer_id', function(req, res){
    Volenteer.findOne({_id: req.params.volenteer_id}, function(err, volenteer){
        if(err) return res.status(500).json({error: err});
        if(!volenteer) return res.status(404).json({error: 'volenteer not found'});
        res.json(volenteer);
    })
});

router.get('/name/:name', function(req, res){
    Volenteer.find({name: req.params.name}, {_id: 1, name: 1, introduce: 1},  function(err, volenteers){
        if(err) return res.status(500).json({error: err});
        if(volenteers.length === 0) return res.status(404).json({error: 'volenteer not found'});
        res.json(volenteers);
    })
});

router.put('/:volenteer_id', function(req, res){
    Volenteer.findById(req.params.volenteer_id, function(err, volenteer){
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!volenteer) return res.status(404).json({ error: 'volenteer not found' });

        if(req.body.name) volenteer.name = req.body.name;
        if(req.body.introduce) volenteer.introduce = req.body.introduce;
        if(req.body.image) volenteer.image = req.body.image;
        if(req.body.tags) volenteer.tags = req.body.tags;

        volenteer.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.json({message: 'volenteer updated'});
        });
    });
});

router.delete('/:volenteer_id', function(req, res){
    Volenteer.remove({ _id: req.params.volenteer_id }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });
        res.status(204).end();
    })
});

module.exports = router;