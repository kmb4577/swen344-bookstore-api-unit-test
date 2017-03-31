
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();

let hostName = 'http://vm344a.se.rit.edu:80';
let apiFile = '/htdocs/SWEN-344-API/API/API.php';
let baseGetUrl = apiFile.concat('?team=book_store');

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
        chai.request(hostName)
	    .get(query)
            .end((err, res) => {
		res.body.should.be.a('Object');
		res.body.should.be.empty;
              done();
            });
      });
  });

describe('Create book using GET', () =>{
    it('it should return a 203 status code', (done)=>{
	let getFunction = '&function=CreateBook';
	let isbn = '&Isbn=123456890';
	let title ='&Title=testTitle';
	let publisherID = '&Publisher_id=1';
	let thumbnail_url = '&Thumbnail_url=testurl';
	let available = '&Available=0';
	let count = '$Count=0';
	
	let params =  [getFunction,isbn,title,publisherID,thumbnail_url,available,count].join('');
	let url = baseGetUrl.concat(params);
	console.log(url);

        chai.request(hostName)
	    .get(url)
            .end((err, res) => {
		//res.body.should.be.a('Object');
		res.body.should.be.empty;
		res.shouldd.have.status(203);
              done();
            });
    });
});
