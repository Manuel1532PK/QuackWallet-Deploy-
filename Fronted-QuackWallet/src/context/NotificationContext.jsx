import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { AuthContext } from "./AuthContext";
import { transactionApi } from "../api/transactionApi";
import TransactionAlertModal from "../component/TransactionAlertModal";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [pendingAlert, setPendingAlert] = useState(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [history, setHistory] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const intervalRef = useRef(null);
  const processedIds = useRef(new Set());

  const fetchPending = useCallback(async () => {
    if (!user) return;
    try {
      const res = await transactionApi.getPendingNotifications(user.id);
      const pendings = res.data || [];

      setPendingCount(pendings.length);

      const unseen = pendings.filter((n) => !processedIds.current.has(n.ID_Notificacion));
      if (unseen.length > 0) {
        const latest = unseen[0];
        processedIds.current.add(latest.ID_Notificacion);
        setPendingAlert(latest);
        setShowAlertModal(true);
      }
    } catch (err) {
      console.error("Error fetching pending notifications:", err);
    }
  }, [user]);

  const refreshHistory = useCallback(async () => {
    if (!user) return;
    try {
      const res = await transactionApi.getNotificationHistory(user.id);
      setHistory(res.data || []);
    } catch (err) {
      console.error("Error fetching notification history:", err);
    }
  }, [user]);

  const respondAlert = useCallback(
    async (accion) => {
      if (!pendingAlert) return;
      try {
        await transactionApi.respondToNotification(pendingAlert.ID_Notificacion, accion);
        setShowAlertModal(false);
        setPendingAlert(null);
        await refreshHistory();
      } catch (err) {
        console.error("Error responding to notification:", err);
      }
    },
    [pendingAlert, refreshHistory]
  );

  useEffect(() => {
    if (!user) {
      setPendingAlert(null);
      setShowAlertModal(false);
      setPendingCount(0);
      return;
    }

    refreshHistory();
    fetchPending();

    intervalRef.current = setInterval(fetchPending, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [user, fetchPending, refreshHistory]);

  const handleAlertAction = async (accion) => {
    await respondAlert(accion);
  };

  return (
    <NotificationContext.Provider value={{ history, refreshHistory, pendingCount }}>
      {children}
      <TransactionAlertModal
        show={showAlertModal}
        onHide={() => {}}
        onAuthorize={() => handleAlertAction("autorizar")}
        onDeny={() => handleAlertAction("denegar")}
        alert={pendingAlert}
      />
    </NotificationContext.Provider>
  );
}