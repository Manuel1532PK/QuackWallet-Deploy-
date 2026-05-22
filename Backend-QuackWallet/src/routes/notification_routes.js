const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification_controller');

router.post('/create/:userId', notificationController.createTransaction);
router.get('/pending/:userId', notificationController.getPendingNotifications);
router.put('/:id/respond', notificationController.respondToNotification);
router.get('/history/:userId', notificationController.getNotificationHistory);

module.exports = router;