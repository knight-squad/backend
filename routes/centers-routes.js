const express = require('express');
const router = express.Router();
const centersController = require('../controllers/centers-controllers');


router.post('/new', centersController.createCenter);
router.post('/packages/new', centersController.createPackage);

router.get('', centersController.getCenters);
router.get('/:centerId', centersController.getSingleCenter);
router.get('/packages/all', centersController.getPackages);

router.put('/update/:centerId', centersController.updateCenter);
router.put('/packages/update/:packageId', centersController.updatePackage);

router.delete('/delete/:centerId', centersController.deleteCenter);
router.delete('/packages/delete/:packageId', centersController.deletePackage)



module.exports = router;
