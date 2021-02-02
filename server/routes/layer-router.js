const express = require('express');

const LayerCtrl = require('../controllers/layer-ctrl');

const router = express.Router();

router.post('/layer', LayerCtrl.createLayer);
router.get('/layers', LayerCtrl.getAllLayers);
router.get('/layer/:id', LayerCtrl.getLayer);

module.exports = router;