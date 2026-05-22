const connection = require('../config/db_config');

exports.createTransaction = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { monto, tipo, idTarjeta } = req.body;

    if (!monto || !tipo) {
      return res.status(400).json({ message: 'Monto y tipo son requeridos' });
    }

    let tarjetaInfo = null;
    if (idTarjeta) {
      const [rows] = await connection.execute(
        'SELECT ID_Tarjetas, Nombre, Banco, Numero, Saldo FROM Tarjetas_Registro WHERE ID_Tarjetas = ? AND ID_Usuario = ?',
        [idTarjeta, userId]
      );
      if (rows.length > 0) {
        tarjetaInfo = rows[0];
      }
    }

    const mensaje = JSON.stringify({
      monto: Number(monto),
      tipo,
      ultimosDigitos: tarjetaInfo ? tarjetaInfo.Numero.slice(-4) : 'N/A',
      banco: tarjetaInfo ? tarjetaInfo.Banco : 'N/A',
      tarjetaNombre: tarjetaInfo ? tarjetaInfo.Nombre : 'Sin tarjeta',
    });

    const [notifResult] = await connection.execute(
      'INSERT INTO Notificaciones (Tipo_Notificacion, Mensaje_Notificacion, Fecha_Envio, Estado_Notificacion, ID_Usuario) VALUES (?, ?, NOW(), ?, ?)',
      ['Transaccion', mensaje, 'Pendiente', userId]
    );

    res.status(201).json({
      message: 'Transacción creada exitosamente',
      idNotificacion: notifResult.insertId,
    });
  } catch (error) {
    console.error('Error al crear transacción:', error);
    res.status(500).json({ message: 'Error al crear transacción', error: error.message });
  }
};

exports.getPendingNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;
    const [rows] = await connection.execute(
      "SELECT ID_Notificacion, Tipo_Notificacion, Mensaje_Notificacion, Fecha_Envio, Estado_Notificacion FROM Notificaciones WHERE ID_Usuario = ? AND Estado_Notificacion = 'Pendiente' ORDER BY Fecha_Envio DESC",
      [userId]
    );

    const parsed = rows.map((r) => ({
      ...r,
      Mensaje_Notificacion: tryParseJSON(r.Mensaje_Notificacion, r.Mensaje_Notificacion),
    }));

    res.status(200).json(parsed);
  } catch (error) {
    console.error('Error al obtener notificaciones pendientes:', error);
    res.status(500).json({ message: 'Error al obtener notificaciones', error: error.message });
  }
};

exports.respondToNotification = async (req, res) => {
  try {
    const notifId = req.params.id;
    const { accion } = req.body;

    if (!accion || !['autorizar', 'denegar'].includes(accion)) {
      return res.status(400).json({ message: 'Acción debe ser "autorizar" o "denegar"' });
    }

    const nuevoEstado = accion === 'autorizar' ? 'Aprobada' : 'Rechazada';

    await connection.execute(
      'UPDATE Notificaciones SET Estado_Notificacion = ? WHERE ID_Notificacion = ?',
      [nuevoEstado, notifId]
    );

    res.status(200).json({ message: `Transacción ${nuevoEstado.toLowerCase()} exitosamente` });
  } catch (error) {
    console.error('Error al responder notificación:', error);
    res.status(500).json({ message: 'Error al responder notificación', error: error.message });
  }
};

exports.getNotificationHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const [rows] = await connection.execute(
      'SELECT ID_Notificacion, Tipo_Notificacion, Mensaje_Notificacion, Fecha_Envio, Estado_Notificacion FROM Notificaciones WHERE ID_Usuario = ? ORDER BY Fecha_Envio DESC',
      [userId]
    );

    const parsed = rows.map((r) => ({
      ...r,
      Mensaje_Notificacion: tryParseJSON(r.Mensaje_Notificacion, r.Mensaje_Notificacion),
    }));

    res.status(200).json(parsed);
  } catch (error) {
    console.error('Error al obtener historial de notificaciones:', error);
    res.status(500).json({ message: 'Error al obtener historial', error: error.message });
  }
};

function tryParseJSON(str, fallback) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}