
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();

let hostName = 'http://vm344a.se.rit.edu:80';
let apiFile = '/htdocs/SWEN-344-API/API/API.php';
let baseGetUrl = apiFile.concat('?team=book_store&function=');

chai.use(chaiHttp);
  //PASSING using VM
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

  //PASSING using SHARED API
  describe('/GET books', () => {
      it('it should GET all the books', (done) => {
        let query = baseGetUrl.concat('getAllBooks');
        console.log(query);
        chai.request(hostName)
        .get(query)
            .end((err, res) => {
            res.should.have.status(200);
            done();
            });
      });
  });

describe('/GET book using invalid param isb instead of isbn ', () => {
      it('it should empty', (done) => {
	let query = baseGetUrl.concat('getBook&isb=123456789');
	console.log(query);
        chai.request(hostName)
	    .get(query)
            .end((err, res) => {
		// res.body.should.be.empty;
		res.should.have.status(400);
            //GETTING 200
              done();
            });
      });
  });

describe('/GET book using negative isbn', () => {
      it('it should return status code of 400 Bad Request', (done) => {
	let query = baseGetUrl.concat('getBook&isbn=-1234556789');
	console.log(query);
        chai.request(hostName)
	    .get(query)
            .end((err, res) => {
	//	res.body.should.be.a('Object');
		res.body.should.be.empty;
		res.should.have.status(400);
              done();
            });
      });
  });
describe('/GET book using negative isbn', () => {
      it('it should return status code of 400 Bad Request', (done) => {
	let query = baseGetUrl.concat('getBook&isbn=1234556789');
	console.log(query);
        chai.request(hostName)
	    .get(query)
            .end((err, res) => {
	//	res.body.should.be.a('Object');
		res.body.should.be.empty;
		res.should.have.status(400);
              done();
            });
      });
  });

describe('Create book using GET', () =>{
    it('it should return status code 400', (done)=>{
	let getFunction = 'CreateBook';
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
		//res.body.should.be.empty;
		res.should.have.status(400);
              done();
            });
    });
});
describe('Create book using POST', () =>{
    it('it should return a 203 status code', (done)=>{
	let getFunction = 'CreateBook';
	let isbn = '&isbn=123456890';
	let title ='&title="testTitle"';
	let publisherID = '&publisher_id=1';
      let price = '&price=44';
	let thumbnail_url = '&thumbnail_url="testurl"';
	let available = '&available=1';
	let count = '&count=1';
	
	let params =  [getFunction,isbn,title,publisherID,price, thumbnail_url,available,count].join('');
	let url = baseGetUrl.concat(params);
	console.log(url);

        chai.request(hostName)
	    .post(url)
            .end((err, res) => {
		//res.body.should.be.a('Object');
		//res.body.should.be.empty;
		res.should.have.status(201);
              done();
            });
    });
});

describe('Create book using GET with negative isbn', () =>{
      it('it should return status code of 400 Bad Request', (done) => {
	let getFunction = 'CreateBook';
	let isbn = '&Isbn=-123456890';
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
		res.should.have.status(400);
              done();
            });
    });
});

describe('/GET book reviews data type', () => {
      it('it should return an array', (done) => {
	let query = baseGetUrl.concat('viewBookReviews&isbn=123456789');
	console.log(query);
        chai.request(hostName)
	    .get(query)
            .end((err, res) => {
		res.body.should.be.a('array');
              done();
            });
      });
  });
describe('/GET book reviews status code', () => {
      it('it should return status code of 200', (done) => {
	let query = baseGetUrl.concat('viewBookReviews&isb=123456789');
	console.log(query);
        chai.request(hostName)
	    .get(query)
            .end((err, res) => {
		res.should.have.status(200);
		//res.body.should.be.a('array');

              done();
            });
      });
  });


describe('/Create book reviews using GET', () => {
      it('it should return status code of 400', (done) => {
	let query = baseGetUrl.concat('viewBookReviews&isb=123456789');
	console.log(query);
        chai.request(hostName)
	    .get(query)
            .end((err, res) => {
		res.should.have.status(200);
		//res.body.should.be.a('array');

              done();
            });
      });
  });

//TODO: Check the following tests======================
  describe('/GET section_books', () => {
      it('it should GET all the books in the section', (done) => {
        chai.request('http://vm344a.se.rit.edu:80')
            .get('/api/section/books')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.not.be.eql(0);
              done();
            });
      });
  });

  //calls: function findOrCreatePublisher
  describe('/GET publisher_id', () => {
      it('it should GET all the books in the section', (done) => {
            //TODO
      });
  });

  //toggleBook
  //orderBook
  //findOrCreateAuthor
  //viewBookReviews
  //updateBook
  //searchBooks

