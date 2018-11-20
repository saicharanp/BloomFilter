var express = require('express');
var router = express.Router();
var bloomFilterImpl =  require('../src/bloomfilterimpl');

/* GET request request */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Bloom filter backend' });
});

/* POST indexing request. */
router.post('/index', function(req, res, next) {
  bloomFilterImpl.index()
  .then(data => {
      res.status(200).json({isCompleted: true});
  })
  .catch(error => {
     res.status(500).json({isCompleted: false}); 
  })
});

/* POST add request. */
router.post('/add', function(req, res, next) {
    bloomFilterImpl.add(req.body.word);
    console.log("Successfully set");
    res.status(200).json({isAdded: true});
});

/* POST test request. */
router.post('/test', function(req, res, next) {
    const isPresent = bloomFilterImpl.test(req.body.word);
    res.status(200).json({isPresent: isPresent});
});

/* GET indexing request. */
router.get('/status', function(req, res, next) {
    const status = bloomFilterImpl.status();
    res.status(200).json({status: status});
});

module.exports = router;