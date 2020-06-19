var express = require('express');
var router = express.Router();
var getDegree = require('../controllers/calculate/getDegree');
var getCheckness = require('../controllers/calculate/getCheckness');
var getBetweeness = require('../controllers/calculate/getBetweeness');
var getEigenvector = require('../controllers/calculate/getEigenvector');
var getAll = require('../controllers/calculate/getAll');

router.post('/all',getAll);
router.post('/degree', getDegree);
router.post('/checkness',getCheckness);
router.post('/betweeness',getBetweeness);
router.post('/eigenvector',getEigenvector);

module.exports = router;