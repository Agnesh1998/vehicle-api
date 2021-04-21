const express = require('express');
const router = express.Router();
const vehical_controller = require('../controllers/vehicalController');

/* GET home page. */
router.get('/', vehical_controller.index);

router.post('/data',  vehical_controller.decodeVin);

router.get('/all_manufacturers',  vehical_controller.all_manufacturers);

router.get('/all_makes',  vehical_controller.all_makes);
router.post('/all_makes',  vehical_controller.all_makes);

module.exports = router;
