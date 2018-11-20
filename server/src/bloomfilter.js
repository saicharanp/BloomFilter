'use strict';

const _ = require('lodash');
const md5 = require('md5');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const wordlist = './data/wordlist.txt';

class BloomFilter {

    constructor() {
        this.wordlist = wordlist;
        this.hashArray = _.fill(Array(0xffff), 0); // Initialize a 65535 bit array to store the hash value indices
        this.isIndexingInProgress = false;
        this.isIndexingCompleted = false;
    }

    index() {
        if(this.isIndexingCompleted) {
            return new Promise.resolve();
        }
        this.isIndexingInProgress = true;
        return new Promise((resolve, reject) => {
            return fs.readFileAsync(this.wordlist)
            .then(words => {
                const wordTokens = words.toString().split('\n');
                _.each(wordTokens, wordToken => {
                    this.hashAndUpdateArray(wordToken);
                });
                this.isIndexingCompleted = true;
                return resolve();
            })
            .catch(error => {
                return reject('Indexing failed');
            })
            .finally(() => {
                this.isIndexingInProgress = true;
            });
        });
    }

    add(word) {
        this.hashAndUpdateArray(word);
    }

    test(word) {
        let isPresent = true;
        const indices = this.getHashIndices(word);
        _.each(indices, index => {
            if(this.hashArray[index] !== 1) {
                isPresent = false;
                return false;
            }
        })
        return isPresent;
    }

    status() {
        if(this.isIndexingInProgress)
            return 'RUNNING';
        else if(this.isIndexingCompleted)
            return 'INDEXED';
        else {
            return 'NOT_INDEXED';
        }
    }

    hashAndUpdateArray(word) {
        const indices = this.getHashIndices(word);
        _.each(indices, index => this.hashArray[index] = 1);
    }

    getHashIndices(word) {
        const md5Hash = md5(word); // Generates a string of length 32
        return _.map( _.chunk(md5Hash, 4), md5HashChunk => { return parseInt(md5HashChunk.join(""), 16) });;
    }
}

module.exports = BloomFilter;