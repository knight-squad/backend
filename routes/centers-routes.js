const express = require('express');
const router = express.Router();
const centersController = require('../controllers/centers-controllers');


router.post('/new', centersController.createCenter);

router.get('', centersController.getCenters);
router.get('/center/:centerId', centersController.getSingleCenter);



module.exports = router;
