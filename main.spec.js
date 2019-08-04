import request from 'supertest';
import { expect } from 'chai';

import main from './main.js';

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
});