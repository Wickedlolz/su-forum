const express = require('express');
const router = express.Router();
const { postController } = require('../controllers');

// middleware that is specific to this router

router.get('/', postController.getLatestsPosts);

module.exports = router;
