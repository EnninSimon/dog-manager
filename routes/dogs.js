const express = require('express');
const router = express.Router();
const { createDog, getAllDogs, getSingleDog, updateDog, deleteDog } = require('../controllers/dogs');


router.route('/').get(getAllDogs).post(createDog);
router.route('/:id').patch(updateDog).delete(deleteDog).get(getSingleDog);

module.exports = router;