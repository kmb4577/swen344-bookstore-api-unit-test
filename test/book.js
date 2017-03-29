
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();

chai.use(chaiHttp);

  describe('/GET books', () => {
      it('it should GET all the books', (done) => {
        chai.request('http://vm344a.se.rit.edu:80')
            .get('/api/books')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.not.be.eql(0);
              done();
            });
      });
  });
  /*
  * Test the /POST route
  */
  describe('/GET book using query', () => {
      it('it should empty', (done) => {
        chai.request('http://vm344a.se.rit.edu:80')
            .get('/htdocs/APIsdfsdf/testapi.php?function=functionTest&param1=sdf')
            .end((err, res) => {
		res.body.should.be.a('Object');
		res.body.should.be.empty;
              done();
            });
      });
  });
