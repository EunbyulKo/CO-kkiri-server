module.exports = function(app, Volenteer)
{
    //테스트 하는 방법
    //postman에서 API테스트
    //터미널에서 express 서버 껐다 켰다하면서
    //터미널에 mongoDB도 띄어놓고 데이터 상태 확인하면서

    app.post('/api/volenteer', function(req, res){
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

    app.get('/api/volenteers', function(req, res){
        Volenteer.find(function(err, volenteers){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(volenteers);
        })
    });

    app.get('/api/volenteers/:volenteer_id', function(req, res){
        Volenteer.findOne({_id: req.params.volenteer_id}, function(err, volenteer){
            if(err) return res.status(500).json({error: err});
            if(!volenteer) return res.status(404).json({error: 'volenteer not found'});
            res.json(volenteer);
        })
    });
    
    app.get('/api/volenteers/name/:name', function(req, res){
        Volenteer.find({name: req.params.name}, {_id: 0, name: 1, introduce: 1},  function(err, volenteers){
            if(err) return res.status(500).json({error: err});
            if(volenteers.length === 0) return res.status(404).json({error: 'volenteer not found'});
            res.json(volenteers);
        })
    });
    //localhost:3000/api/volenteers/name/%EA%B3%A0%EC%9D%80%EB%B3%84%20%ED%99%9C%EB%8F%99%EA%B0%80
    //한글인 경우 위와 같이 인코딩해서 보내야합니다
    //인코딩은 http://www.convertstring.com/ko/EncodeDecode/UrlDecode 이런 사이트 이용해서 변환해서 긁어다 쓰시면 되어용

    app.put('/api/volenteers/:volenteer_id', function(req, res){
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

    app.delete('/api/volenteers/:volenteer_id', function(req, res){
        Volenteer.remove({ _id: req.params.volenteer_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });
    
            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "volenteer not found" });
            res.json({ message: "volenteer deleted" });
            */
    
            res.status(204).end();
        })
    });
}