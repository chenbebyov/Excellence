const express = require('express');

const LayerCtrl = require('../controllers/layer-ctrl');

const router = express.Router();

router.post('/layer', LayerCtrl.createLayer);

module.exports = router;