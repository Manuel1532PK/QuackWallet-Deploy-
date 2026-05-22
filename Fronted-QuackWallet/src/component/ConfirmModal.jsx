import Modal from "react-bootstrap/Modal";

export default function ConfirmModal({ show, onHide, onConfirm, title, message, confirmText, cancelText }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || "Confirmar"}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center py-4">
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#f4b942" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
          </svg>
        </div>
        <p style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>{message || "¿Estás seguro?"}</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center border-0 pt-0">
        <button
          onClick={onHide}
          style={{
            padding: '10px 24px',
            backgroundColor: '#6c757d',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '15px',
          }}
        >
          {cancelText || "Cancelar"}
        </button>
        <button
          onClick={onConfirm}
          style={{
            padding: '10px 24px',
            backgroundColor: '#d9534f',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '15px',
          }}
        >
          {confirmText || "Sí, cerrar sesión"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}