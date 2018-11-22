"use strict";

const _ = require("lodash");
const md5 = require("md5");
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

const codekataWordlist = "./data/wordlist.txt";

class BloomFilter {
  constructor(customWordList) {
    this.wordList = customWordList || codekataWordlist;
    this.hashArray = _.fill(Array(0xffffff), 0); // Initialize a 16777215 bit array to store the hash value indices
    this.isIndexingInProgress = false;
    this.isIndexingCompleted = false;
    this.isIndexingFailed = false;
  }

  index() {
    if (this.isIndexingCompleted) {
      return new Promise.resolve("Indexing is already completed");
    }
    if (this.isIndexingInProgress) {
      throw new Error("Indexing already in progress");
    }
    this.isIndexingInProgress = true;
    return new Promise((resolve, reject) => {
      return fs
        .readFileAsync(this.wordList)
        .then(words => {
          const wordTokens = words.toString().split("\n");
          _.each(wordTokens, wordToken => {
            this.hashAndUpdateArray(_.trim(wordToken));
          });
          this.isIndexingCompleted = true;
          return resolve("Indexing successful");
        })
        .catch(() => {
          this.isIndexingFailed = true;
          return reject("Indexing failed");
        })
        .finally(() => {
          this.isIndexingInProgress = false;
        });
    });
  }

  getHashArray() {
    return this.hashArray;
  }

  add(word) {
    this.hashAndUpdateArray(word);
  }

  test(word) {
    let isPresent = true;
    const indices = this.getHashIndices(word);
    _.each(indices, index => {
      if (this.hashArray[index] !== 1) {
        isPresent = false;
        return false;
      }
    });
    return isPresent;
  }

  status() {
    if (this.isIndexingInProgress) return "RUNNING";
    else if (this.isIndexingCompleted) return "INDEXED";
    else if (this.isIndexingFailed) return "FAILED";
    else {
      return "NOT_INDEXED";
    }
  }

  hashAndUpdateArray(word) {
    const indices = this.getHashIndices(word);
    _.each(indices, index => (this.hashArray[index] = 1));
  }

  getHashIndices(word) {
    const md5Hash = md5(word); // Generates a string of length 32
    return _.map(_.chunk(md5Hash, 6), md5HashChunk => {
      return parseInt(md5HashChunk.join(""), 16);
    });
  }

  // Private method used only for testing
  _setIndexState(status) {
    if (status === "RUNNING") {
      this.isIndexingInProgress = true;
    } else if (status === "INDEXED") {
      this.isIndexingCompleted = true;
    } else if (status === "FAILED") {
      this.isIndexingFailed = true;
    }
  }
}

module.exports = BloomFilter;
