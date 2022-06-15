const express = require('express');
const router = express.Router();
const userCtrl = require('../../controllers/api/users')

// GET / SHOW api/v1/users
router.get('/:id', userCtrl.show)

// POST / REGISTER api/v1/users
router.post('/', userCtrl.create)

// POST / LOGIN api/v1/users
// router.post('/login', userCtrl.login)

// GET /api/v1/users/:id/favorites
router.get('/:id/favorites', userCtrl.getFavorites)

// PUT / UPDATE api/v1/users
router.put('/:id', userCtrl.update)

module.exports = router