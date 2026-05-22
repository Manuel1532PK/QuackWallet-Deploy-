const express = require('express');
const notificationRoutes = require('../routes/notification_routes');

console.log('Routes loaded successfully');
console.log('Notification routes:', notificationRoutes.stack.map(r => r.route?.path || r.route?.path).join(', '));

// Test the controller directly
const controller = require('../controllers/notification_controller');
console.log('Controller methods:', Object.keys(controller));

// Try a simple query
const connection = require('../config/db_config');
connection.execute('SELECT 1+1 AS result')
  .then(([rows]) => {
    console.log('DB works:', rows[0].result);
    
    // Try the actual query
    return connection.execute(
      "SELECT ID_Notificacion, Tipo_Notificacion, Mensaje_Notificacion, Fecha_Envio, Estado_Notificacion FROM Notificaciones WHERE ID_Usuario = 1 AND Estado_Notificacion = 'Pendiente' ORDER BY Fecha_Envio DESC"
    );
  })
  .then(([rows]) => {
    console.log('Query returned', rows.length, 'rows');
    console.log('First row:', JSON.stringify(rows[0] || 'none'));
    
    // Test the tryParseJSON function on a row
    if (rows.length > 0) {
      try {
        const parsed = JSON.parse(rows[0].Mensaje_Notificacion);
        console.log('Parsed message:', parsed);
      } catch(e) {
        console.log('Parse error:', e.message);
      }
    }
  })
  .catch(err => {
    console.error('Error:', err.message);
  })
  .finally(() => process.exit(0));
