
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();

let hostURL = 'http://vm344a.se.rit.edu:80';
let apiFile = '/htdocs/SWEN-344-API/API/API.php';
let baseGETString = apiFile.concat('?team=book_store&function=');

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

describe('/GET book using invalid query', () => {
      it('it should empty', (done) => {
	let query = baseGETString.concat('getBook&isbn=34324');
        chai.request(hostURL)
	    .get(query)
            .end((err, res) => {
		res.body.should.be.a('Object');
		res.body.should.be.empty;
              done();
            });
      });
  });

describe('/GET create book', () =>{
    it('it should return a 203 status code', (done)=>{
	let query = baseGETString.concat('createBook&isbn=34324');
        chai.request(hostURL)
	    .get(query)
            .end((err, res) => {
		res.body.should.be.a('Object');
		res.body.should.be.empty;
              done();
            });
    });
});
