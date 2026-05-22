import axios from 'axios';

const API_URL = '/api';

export const transactionApi = {
  createTransaction: (userId, data) =>
    axios.post(`${API_URL}/notifications/create/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }),

  getPendingNotifications: (userId) =>
    axios.get(`${API_URL}/notifications/pending/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }),

  respondToNotification: (notificationId, accion) =>
    axios.put(`${API_URL}/notifications/${notificationId}/respond`, { accion }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }),

  getNotificationHistory: (userId) =>
    axios.get(`${API_URL}/notifications/history/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }),
};