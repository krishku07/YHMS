import { Navigate, useLocation } from "react-router-dom";

function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(
          (char) =>
            "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2)
        )
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
}

function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();

  const token = sessionStorage.getItem("token");

  // No token → not logged in
  if (!token) {
    return (
      <Navigate
        to="/"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  const payload = decodeJwt(token);

  // Invalid token
  if (!payload) {
    sessionStorage.clear();

    return <Navigate to="/" replace />;
  }

  // Check token expiration
  if (payload.exp && Date.now() >= payload.exp * 1000) {
    sessionStorage.clear();

    return <Navigate to="/" replace />;
  }

  let role = payload.role;

  if (!role) {
    sessionStorage.clear();

    return <Navigate to="/" replace />;
  }

  role = role.toLowerCase();

  const normalizedRoles = allowedRoles.map((r) =>
    r.toLowerCase()
  );

  // Role not allowed
  if (!normalizedRoles.includes(role)) {
    if (role === "student") {
      return <Navigate to="/student" replace />;
    }

    if (role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    if (role === "junior_admin") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;