"use strict";

const BloomFilter = require("./bloomfilter");

//TODO: find a better way instead of using global variables!
const bfl = new BloomFilter();

module.exports.index = () => {
  return bfl.index();
};

module.exports.add = word => {
  return bfl.add(word);
};

module.exports.test = word => {
  return bfl.test(word);
};

module.exports.status = () => {
  return bfl.status();
};
