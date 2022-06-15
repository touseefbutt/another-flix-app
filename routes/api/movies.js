const express = require('express');
const router = express.Router();
const moviesCtrl = require('../../controllers/api/movies')

router.get('/', moviesCtrl.index);
router.post('/', moviesCtrl.create);
// PUT /api/v1/movies/:id
router.put('/:id', moviesCtrl.update)
// PUT /api/v1/movies/:id
router.delete('/:id', moviesCtrl.remove)


module.exports = router