import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";
import {
  IoHomeOutline,
  IoCardOutline,
  IoPersonCircleOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoNotificationsOutline,
  IoShieldCheckmarkOutline,
  IoAnalyticsOutline,
  IoBulbOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { Nav } from "react-bootstrap";
import { userApi, getImageUrl } from "../api/userApi";
import logoSrc from "../assets/Logo_QuackWallet.png";

const SECCIONES = [
  { title: "Seguridad", icon: IoShieldCheckmarkOutline, path: "/security" },
  { title: "Consultas", icon: IoAnalyticsOutline, path: "/reports" },
  { title: "Novedades", icon: IoBulbOutline, path: "/news" },
  { title: "Conexiones", icon: IoPeopleOutline, path: "/connections" },
];

function Sidebar({ user, navigate, handleLogout, nombreUsuario, location, imagenPerfil }) {
  const menuLinks = [
    { name: "Inicio", path: "/home", icon: IoHomeOutline },
    { name: "Perfil", path: "/profile", icon: IoPersonCircleOutline },
    { name: "Tarjetas", path: "/cards", icon: IoCardOutline },
    { name: "Alertas", path: "/alerts", icon: IoNotificationsOutline },
    { name: "Configuración", path: "/configuracion", icon: IoSettingsOutline },
  ];

  const linkStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    color: isActive ? '#0b1e3d' : '#c0c8d4',
    backgroundColor: isActive ? '#f4b942' : 'transparent',
    borderRadius: '8px',
    marginBottom: '4px',
    padding: '8px 12px',
    fontWeight: isActive ? '700' : '400',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  });

  return (
    <div className="sidebar" style={{ 
      width: '280px', 
      minWidth: '280px', 
      height: '100vh', 
      position: 'fixed', 
      left: 0, 
      top: 0, 
      zIndex: 1000,
      backgroundColor: '#0b1e3d',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      overflowX: 'hidden',
      scrollbarWidth: 'thin',
      scrollbarColor: '#f4b942 #0b1e3d',
    }}>
      <div style={{ 
        display: 'flex', alignItems: 'center', 
        padding: '14px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <img src={logoSrc} alt="QuackWallet" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', marginRight: '10px' }} />
        <div>
          <span style={{ color: '#f4b942', fontSize: '20px', fontWeight: '700' }}>Quack</span>
          <span style={{ color: '#ffffff', fontSize: '20px', fontWeight: '300' }}>Wallet</span>
        </div>
      </div>

      <div className="p-3 text-center" style={{borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
        {imagenPerfil ? (
          <img
            src={getImageUrl(imagenPerfil)}
            alt="Perfil"
            className="rounded-circle mb-1"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
        ) : (
          <IoPersonCircleOutline size={30} style={{color: '#8899aa'}} />
        )}
        <p className="mb-0 fw-bold" style={{color: '#ffffff'}}>{nombreUsuario}</p>
        <small style={{color: '#8899aa'}}>ID: {user?.id}</small>
      </div>

      <Nav className="flex-column p-3 flex-grow-1">
        {menuLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Nav.Link
              key={link.path}
              onClick={() => navigate(link.path)}
              style={linkStyle(isActive)}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.target.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#c0c8d4';
                }
              }}
            >
              <link.icon size={20} className="me-3" />
              {link.name}
            </Nav.Link>
          );
        })}

        <hr style={{borderColor: 'rgba(255,255,255,0.1)', margin: '12px 0'}} />

        <h6 className="px-3 mt-2 mb-2 small fw-bold text-uppercase" style={{color: '#8899aa'}}>Funciones rápidas</h6>

        {SECCIONES.map((sec) => {
          const isActive = location.pathname === sec.path;
          return (
            <Nav.Link
              key={sec.path}
              onClick={() => navigate(sec.path)}
              style={linkStyle(isActive)}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.target.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#c0c8d4';
                }
              }}
            >
              <sec.icon size={20} className="me-3" />
              {sec.title}
            </Nav.Link>
          );
        })}
      </Nav>

      <div className="p-3" style={{borderTop: '1px solid rgba(255,255,255,0.1)'}}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#f4b942',
            border: 'none',
            borderRadius: '8px',
            color: '#0b1e3d',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          <IoLogOutOutline className="me-2" size={20} /> Cerrar Sesión
        </button>
      </div>
      <style>{`
        .sidebar::-webkit-scrollbar { width: 6px; }
        .sidebar::-webkit-scrollbar-track { background: #0b1e3d; }
        .sidebar::-webkit-scrollbar-thumb { background: #f4b942; border-radius: 3px; }
        .sidebar::-webkit-scrollbar-thumb:hover { background: #d4a017; }
      `}</style>
    </div>
  );
}

export default function AlertHistory() {
  const { user, logout } = useContext(AuthContext);
  const { history, refreshHistory, pendingCount } = useContext(NotificationContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [userProfile, setUserProfile] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const fetchUserProfile = useCallback(async () => {
    if (!user) return;
    try {
      const res = await userApi.getCompleteProfile(user.id);
      setUserProfile(res.data);
    } catch (err) {
      setUserProfile(null);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user, fetchUserProfile]);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    setLoadingHistory(true);
    refreshHistory().finally(() => setLoadingHistory(false));
  }, [refreshHistory]);

  if (user === null) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#fef5da" }}>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  const nombreUsuario = userProfile?.Nombre_Usuario || user?.nombre || "Usuario";
  const imagenPerfil = userProfile?.Imagen_Perfil || user?.Imagen_Perfil || null;

  const estadoBadge = (estado) => {
    const styles = {
      Pendiente: { bg: "#fef5da", color: "#b8860b" },
      Aprobada: { bg: "#d4edda", color: "#155724" },
      Rechazada: { bg: "#f8d7da", color: "#721c24" },
    };
    const s = styles[estado] || { bg: "#e2e3e5", color: "#383d41" };
    return (
      <span
        style={{
          backgroundColor: s.bg,
          color: s.color,
          padding: "4px 12px",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: "600",
          display: "inline-block",
        }}
      >
        {estado}
      </span>
    );
  };

  const getMonto = (item) => {
    const msg =
      typeof item.Mensaje_Notificacion === "object"
        ? item.Mensaje_Notificacion
        : {};
    const monto = msg.monto;
    if (monto === undefined || monto === null) return "—";
    return `$${Number(monto).toLocaleString()}`;
  };

  const getTipo = (item) => {
    const msg =
      typeof item.Mensaje_Notificacion === "object"
        ? item.Mensaje_Notificacion
        : {};
    return msg.tipo || item.Tipo_Notificacion || "—";
  };

  const getDetalle = (item) => {
    const msg =
      typeof item.Mensaje_Notificacion === "object"
        ? item.Mensaje_Notificacion
        : {};
    const dig = msg.ultimosDigitos || "";
    const banco = msg.banco || "";
    return [dig, banco].filter(Boolean).join(" · ") || "—";
  };

  return (
    <div className="d-flex w-100 vh-100" style={{ backgroundColor: "#ffffff" }}>
      <Sidebar
        user={user}
        navigate={navigate}
        location={location}
        nombreUsuario={nombreUsuario}
        handleLogout={logout}
        imagenPerfil={imagenPerfil}
      />

      <div
        className="content-area flex-grow-1 d-flex flex-column bg-white"
        style={{ marginLeft: "280px", height: "100vh" }}
      >
        <div className="p-4 p-lg-5 flex-grow-1" style={{ overflowY: "auto" }}>
          <div className="mb-4">
            <h1 className="fw-bold mb-1" style={{ color: "#0b1e3d" }}>
              <IoNotificationsOutline className="me-2" size={28} />
              Alertas
            </h1>
            <p className="text-muted mb-0">
              Historial de notificaciones de transacciones.
              {pendingCount > 0 && (
                <span className="ms-2 badge" style={{ backgroundColor: "#f4b942", color: "#0b1e3d" }}>
                  {pendingCount} pendiente{pendingCount !== 1 ? "s" : ""}
                </span>
              )}
            </p>
          </div>

          {loadingHistory ? (
            <div className="text-center mt-5">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center mt-5">
              <IoNotificationsOutline size={60} className="text-muted mb-3" />
              <p className="text-muted fs-5">No hay alertas registradas</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="table table-hover align-middle" style={{ minWidth: "700px" }}>
                <thead className="table-light">
                  <tr>
                    <th style={{ fontWeight: "600", color: "#0b1e3d" }}>Tipo</th>
                    <th style={{ fontWeight: "600", color: "#0b1e3d" }}>Monto</th>
                    <th style={{ fontWeight: "600", color: "#0b1e3d" }}>Detalle</th>
                    <th style={{ fontWeight: "600", color: "#0b1e3d" }}>Fecha</th>
                    <th style={{ fontWeight: "600", color: "#0b1e3d" }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item) => (
                    <tr key={item.ID_Notificacion}>
                      <td>
                        <span style={{ textTransform: "capitalize", fontWeight: "500" }}>
                          {getTipo(item)}
                        </span>
                      </td>
                      <td style={{ fontWeight: "600", color: "#0b1e3d" }}>{getMonto(item)}</td>
                      <td style={{ color: "#6c757d", fontSize: "14px" }}>{getDetalle(item)}</td>
                      <td style={{ color: "#6c757d", fontSize: "14px" }}>
                        {item.Fecha_Envio
                          ? new Date(item.Fecha_Envio).toLocaleString("es-CO")
                          : "—"}
                      </td>
                      <td>{estadoBadge(item.Estado_Notificacion)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}