import request from 'supertest';
import { expect } from 'chai';

import main from './main.js';

import Volenteer from './models/volenteer';

describe('GET /', () => {
    it('should respond with text message "Hello World"', (done) => {
        request(main)
        .get('/')
        .expect(200)
        .end((err, res) => {
            if (err) {
                done(err);
                return;
            }

            expect(res.text).to.equal('Hello World');
            done();
        });
    });
});


describe('GET /api/volenteer', () => {
    it('should list all volenteers', (done) => {
        request(main)
        .get('/api/volenteer')
        .expect(200)
        .end((err, res) => {
            if (err) {
                done(err);
                return;
            }

            expect(res.body).to.be.an('array');
            done();
        });
    });
});

var testVolenteer = {
    'name': 'tester',
    'introduce': 'Hi!',
    'image': 'image',
    'tags': ['tag1', 'tag2']
};

describe('POST /api/volenteer', () => {
    it('should create a new volenteer', (done) => {
        request(main)
        .post('/api/volenteer')
        .send(testVolenteer)
        .expect(200)
        .expect((res) => {
            expect(res.body.result).to.equal(1);
        })
        .end((err, res) => {
            if (err) {
                done(err);
                return;
            }

            Volenteer.find(testVolenteer).then((volenteers) => {
                expect(volenteers[volenteers.length - 1].name).to.equal(testVolenteer.name);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not create volenteer with invalid body data', (done) => {
        request(main)
        .post('/api/volenteer')
        .send({})
        .expect(404)
        .end((err, res) => {
            if (err) {
                done(err);
                return;
            }

            Volenteer.find().then((volenteers) => {
                expect(volenteers.length).to.equal(2);
                done();
            }).catch((e) => done(e));
        });
    });
});

var id = '';

describe('GET /api/volenteer/name/:name', () => {
    it('should get a volenteer', (done) => {
        request(main)
        .get(`/api/volenteer/name/${testVolenteer.name}`)
        .expect(200)
        .expect((res) => {
            expect(res.body[0].name).to.equal(testVolenteer.name);
            id = res.body[0]._id;
        })
        .end(done);
    });
});

describe('DELETE /api/volenteer/:volenteer_id', () => {
    it('should return 404 with invalid volenteer id', (done) => {
        request(main)
        .delete('/api/volenteer/')
        .expect(404)
        .end(done);
    });

    it('should remove a volenteer', (done) => {
        request(main)
        .delete(`/api/volenteer/${id}`)
        .expect(204)
        .end((err, res) => {
            if (err) {
                done(err);
                return;
            }

            Volenteer.findById(id).then((volenteers) => {
                expect(volenteers).to.not.exist;
                done();
            }).catch((e) => done(e));
        });
    });

    it('should return 500 if volenteer not found', (done) => {
        request(main)
        .delete('/api/volenteer/fdfdf')
        .expect(500)
        .end(done);
    });
});