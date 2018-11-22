const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const BloomFilter = require("../src/bloomfilter");
const _ = require("lodash");
const md5 = require("md5");

chai.use(chaiHttp);

describe("BloomFilter", function() {
  it("verify the bloom filter add functionality", function(done) {
    const bfl = new BloomFilter();
    bfl.add("hello");
    const indices = bfl.getHashIndices("hello"),
      hashArray = bfl.getHashArray();

    _.each(indices, index => {
      chai.expect(hashArray[index]).to.equals(1);
    });
    done();
  });

  it("verify the bloom filter test functionality", function(done) {
    const bfl = new BloomFilter();
    bfl.add("hello");
    let isPresent = bfl.test("hello");
    chai.expect(isPresent).to.equals(true);
    isPresent = bfl.test("hi");
    chai.expect(isPresent).to.equals(false);
    done();
  });

  it("verify the bloom filter hash indices functionality", function(done) {
    const bfl = new BloomFilter();
    const expectedIndices = bfl.getHashIndices("hello");
    const indices = _.map(_.chunk(md5("hello"), 6), md5HashChunk => {
      return parseInt(md5HashChunk.join(""), 16);
    });
    chai.expect(indices).to.eql(expectedIndices);
    done();
  });

  it("verify the bloom filter index functionality", done => {
    const bfl = new BloomFilter("./test/wordlist.txt");
    const indexResult = bfl.index();
    indexResult.then(result => {
      chai.expect(result).to.equal("Indexing successful");
      chai.expect(bfl.test("perimeter")).to.equal(true);
      chai.expect(bfl.test("wordnotinsamplelist")).to.equal(false);
    });
    done();
  });

  it("verify the bloom filter index functionality when another index is already in progress", done => {
    const bfl = new BloomFilter("./test/wordlist.txt");
    bfl._setIndexState("RUNNING");
    // From docs: .throw invokes the target function and asserts that an error is thrown with a message that contains that string.
    chai
      .expect(() => bfl.index())
      .to.throw(Error, "Indexing already in progress");
    done();
  });

  it("verify the bloom filter index functionality when indexing is already completed", done => {
    const bfl = new BloomFilter("./test/wordlist.txt");
    bfl._setIndexState("INDEXED");
    const indexResult = bfl.index();
    indexResult.then(result => {
      chai.expect(result).to.equal("Indexing is already completed");
      done();
    });
  });

  it("verify the bloom filter index functionality when invalid file path is supplied", done => {
    const bfl = new BloomFilter("./test/wordlist2.txt");
    const indexResult = bfl.index();
    indexResult.catch(error => {
      chai.expect(error).to.equal("Indexing failed");
      done();
    });
  });
});
