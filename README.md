# Bloom filter

This project implements a Bloom filter and is written as an UI+REST learning experience. A Bloom filter is a probabilistic data structure which tells us whether an element is definitely not in the set or may be in the set.

## Code 
This code is fundamentally divided into two parts:
  ### Client
    1) It is the frontend part of the application. 
    2) Implemented using React, Redux and Material UI. 
    3) Runs on the webpack dev server.
    4) Enzyme and Jest for unit testing
    
  ### Server
    1) It is the backend API part of the application. 
    2) Implemented using Express and Node js. 
    3) Runs on the express dev server.
    4) Mocha and Chai for unit testing


## Setup server and client

  ```shell
  $ git clone https://github.com/saicharanp/BloomFilter.git

  $ cd server
  $ npm install
  $ npm start 

  $ cd client
  $ npm install
  $ npm start
  ```
  

  + Navigate to ```localhost:3000``` for backend server and ```localhost:3001``` for UI. 
  - If you're using chrome, disable web secutiry to allow API requests from UI to backend. 
  ```shell
    chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security
  ```
  
  ### Running tests
    Run `npm run test` from `Client` and `Server` directories
  
## API calls

POST ```/bloomfilter/index``` - adds all the words in [Codekata Wordlist](http://codekata.com/data/wordlist.txt) to the bloom filter set.

GET ```/bloomfilter/status``` - gets the status of the index operation

POST ```/bloomfilter/add``` - add your own word to the set. The request body should be in the following format:
```script
{
  word: "your_word"
}
```

POST ```/bloomfilter/test``` - test if a word is present in the set. The request body should be in the following format:
```script
{
  word: "your_word"
}
```

## Further improvements

   ### Client
    1) Expand unit testing to all the components
    2) More robust CSS design and styling
    3) Individual `actions` and `reducers` for the components
    4) Move CSS out of individual components
    
  ### Server
    1) More robust unit testing
    2) Performance testing and better scale handling
    
  ### Build and deployment
    1) Both server and client run on dev servers. Project should be able to bundle into production code.
    
    
## References

1) For UI - https://github.com/facebook/create-react-app

2) For backend - https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

3) Bloom filter - http://codekata.com/kata/kata05-bloom-filters/

4) Material UI layout - https://material-ui.com/getting-started/page-layout-examples/album/
    
  




