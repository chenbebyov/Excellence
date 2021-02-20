const express = require('express');

const LayerCtrl = require('../controllers/layer-ctrl');

const router = express.Router();

router.post('/layer', LayerCtrl.createLayer);
router.get('/layers', LayerCtrl.getAllLayers);
router.get('/layer/:id', LayerCtrl.getLayer);
router.post('/grade', LayerCtrl.createGrade);
router.post('/level', LayerCtrl.createLevel);
router.post('/group', LayerCtrl.createGroup);

module.exports = router;