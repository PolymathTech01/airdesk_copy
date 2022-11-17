/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();
const deskController = require('../controllers/desk.controller');
// router.get('/api/desk/generate-id', deskController.generateDeskId);
router.post('/generateId', deskController.generateDeskIdAndCollectDeskData);
router.get('/get-desk-data/:deskId', deskController.getMessagebyId);
// Airdesk-Images
module.exports = router;
