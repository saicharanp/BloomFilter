var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../app");
var should = chai.should();

chai.use(chaiHttp);

describe("Bloomfilter routes", function() {
  it("verify the default bloomfilter / URL", function(done) {
    chai
      .request(server)
      .get("/bloomfilter")
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("verify the bloomfilter status /status URL", function(done) {
    chai
      .request(server)
      .get("/bloomfilter/status")
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("NOT_INDEXED");
        done();
      });
  });

  it("verify the bloomfilter add /add URL", function(done) {
    chai
      .request(server)
      .post("/bloomfilter/add")
      .send({ word: "hello" })
      .end(function(err, res) {
        res.should.have.status(200);
      });
    done();
  });

  it("verify the bloomfilter add /add URL with missing request body", function(done) {
    chai
      .request(server)
      .post("/bloomfilter/add")
      .end(function(err, res) {
        res.should.have.status(500);
      });
    done();
  });

  it("verify the bloomfilter test /test URL for added word", function(done) {
    chai
      .request(server)
      .post("/bloomfilter/test")
      .send({ word: "hello" })
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("isPresent").eql(true);
      });
    done();
  });

  it("verify the bloomfilter test /test URL for different word", function(done) {
    chai
      .request(server)
      .post("/bloomfilter/test")
      .send({ word: "different" })
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("isPresent").eql(false);
      });
    done();
  });

  it("verify the bloomfilter test /test URL with missing request body", function(done) {
    chai
      .request(server)
      .post("/bloomfilter/test")
      .end(function(err, res) {
        res.should.have.status(500);
      });
    done();
  });

  it("verify the bloomfilter index /index URL", function(done) {
    chai
      .request(server)
      .post("/bloomfilter/index")
      .send({ wordListPath: "./test/wordlist.txt" })
      .end(function(err, res) {
        res.should.have.status(200);
      });
    done();
  });
});
