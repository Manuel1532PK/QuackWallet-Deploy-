import Modal from "react-bootstrap/Modal";

export default function TransactionAlertModal({ show, onHide, onAuthorize, onDeny, alert }) {
  if (!alert) return null;

  const mensaje =
    typeof alert.Mensaje_Notificacion === "object"
      ? alert.Mensaje_Notificacion
      : {};

  const monto = mensaje.monto || "—";
  const tipo = mensaje.tipo || alert.Tipo_Notificacion || "—";
  const ultimosDigitos = mensaje.ultimosDigitos || "N/A";
  const banco = mensaje.banco || "";
  const fecha = alert.Fecha_Envio
    ? new Date(alert.Fecha_Envio).toLocaleString("es-CO")
    : "—";

  const formatMonto = (val) => {
    const num = Number(val);
    return isNaN(num) ? val : `$${num.toLocaleString()}`;
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false}>
      <div style={{ borderRadius: "16px", overflow: "hidden" }}>
        <Modal.Header style={{ backgroundColor: "#0b1e3d", color: "#fff", borderBottom: "none" }}>
          <Modal.Title className="fw-bold" style={{ fontSize: "20px" }}>
            <span style={{ marginRight: "8px" }}>🔔</span>
            Transacción Pendiente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <div
            style={{
              fontSize: "42px",
              fontWeight: "800",
              color: "#0b1e3d",
              marginBottom: "8px",
              letterSpacing: "-1px",
            }}
          >
            {formatMonto(monto)}
          </div>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#fef5da",
              color: "#b8860b",
              padding: "4px 16px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "600",
              textTransform: "capitalize",
              marginBottom: "16px",
            }}
          >
            {tipo}
          </div>
          <div style={{ color: "#6c757d", fontSize: "14px", marginBottom: "4px" }}>
            Tarjeta: **** {ultimosDigitos}
            {banco && <span> · {banco}</span>}
          </div>
          <div style={{ color: "#adb5bd", fontSize: "12px" }}>{fecha}</div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center border-0 pt-0 pb-4">
          <button
            onClick={onDeny}
            style={{
              padding: "12px 32px",
              backgroundColor: "#d9534f",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "16px",
              minWidth: "140px",
            }}
          >
            Denegar
          </button>
          <button
            onClick={onAuthorize}
            style={{
              padding: "12px 32px",
              backgroundColor: "#2d6a4f",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "16px",
              minWidth: "140px",
            }}
          >
            Autorizar
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}