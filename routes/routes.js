const express = require('express');
const router = express.Router();
const dataController = require('../controller/dataController');

router.get('/', dataController.getIndex);

router.post('/post-data', dataController.postData);

router.get('/get-data', dataController.getData);

router.post('/delete-data', dataController.deleteData);

router.post('/edit-data', dataController.editData);

module.exports = router;