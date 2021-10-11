const express = require('express');
const router = express.Router();
const centersController = require('../controllers/centers-controllers');


router.post('/new', centersController.createCenter);

router.get('', centersController.getCenters);
router.get('/:centerId', centersController.getSingleCenter);

router.put('/update/:centerId', centersController.updateCenter);

router.delete('/delete/:centerId', centersController.deleteCenter); 



module.exports = router;
