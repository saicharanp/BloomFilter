"use strict";
const _ = require("lodash");

const BloomFilter = require("./bloomfilter");

//TODO: find a better way instead of using global variables!
let bfl;

module.exports.index = wordListPath => {
  initializeBloomFilterObject();
  return bfl.index(wordListPath);
};

module.exports.add = word => {
  initializeBloomFilterObject();
  return bfl.add(word);
};

module.exports.test = word => {
  initializeBloomFilterObject();
  return bfl.test(word);
};

module.exports.status = () => {
  initializeBloomFilterObject();
  return bfl.status();
};

function initializeBloomFilterObject() {
  if (_.isNil(bfl)) {
    bfl = new BloomFilter();
  }
}
