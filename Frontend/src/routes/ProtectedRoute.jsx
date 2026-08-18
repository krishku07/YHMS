import { Navigate, useLocation } from "react-router-dom";

// =====================================================
// DECODE JWT
// =====================================================

function decodeJwt(token) {
  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];

    // Convert Base64URL → Base64
    const base64 = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    // Add required padding
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );

    const decoded = atob(padded);

    return JSON.parse(decoded);
  } catch (error) {
    console.error("JWT decode error:", error);
    return null;
  }
}

// =====================================================
// NORMALIZE ROLE
// =====================================================

function normalizeRole(role) {
  if (!role) {
    return null;
  }

  return role
    .toString()
    .replace(/^ROLE_/i, "")
    .trim()
    .toLowerCase();
}

// =====================================================
// PROTECTED ROUTE
// =====================================================

function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const location = useLocation();

  // ===================================================
  // GET TOKEN
  // ===================================================

  const token = sessionStorage.getItem("token");

  console.log(
    "PROTECTED ROUTE:",
    location.pathname
  );

  console.log(
    "TOKEN EXISTS:",
    !!token
  );

  // ---------------------------------------------------
  // No token
  // ---------------------------------------------------

  if (!token) {
    console.log(
      "NO TOKEN → REDIRECTING TO LOGIN"
    );

    return (
      <Navigate
        to="/"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  // ===================================================
  // DECODE TOKEN
  // ===================================================

  const payload = decodeJwt(token);

  console.log(
    "JWT PAYLOAD:",
    payload
  );

  // ---------------------------------------------------
  // Invalid token
  // ---------------------------------------------------

  if (!payload) {
    console.log(
      "INVALID TOKEN → LOGOUT"
    );

    sessionStorage.clear();

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // ===================================================
  // CHECK EXPIRATION
  // ===================================================

  if (
    payload.exp &&
    Date.now() >= payload.exp * 1000
  ) {
    console.log(
      "TOKEN EXPIRED → LOGOUT"
    );

    sessionStorage.clear();

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // ===================================================
  // GET ROLE
  // ===================================================

  let role =
    payload.role ||
    payload.authority ||
    sessionStorage.getItem("role");

  role = normalizeRole(role);

  console.log(
    "JWT ROLE:",
    payload.role
  );

  console.log(
    "NORMALIZED ROLE:",
    role
  );

  console.log(
    "ALLOWED ROLES:",
    allowedRoles
  );

  // ---------------------------------------------------
  // No role
  // ---------------------------------------------------

  if (!role) {
    console.log(
      "NO ROLE → LOGOUT"
    );

    sessionStorage.clear();

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // ===================================================
  // NORMALIZE ALLOWED ROLES
  // ===================================================

  const normalizedRoles =
    allowedRoles.map((item) =>
      normalizeRole(item)
    );

  // ===================================================
  // ROLE CHECK
  // ===================================================

  if (
    !normalizedRoles.includes(role)
  ) {
    console.log(
      "ROLE NOT ALLOWED:",
      role,
      normalizedRoles
    );

    // -------------------------------------------------
    // Student trying to access admin
    // -------------------------------------------------

    if (role === "student") {
      return (
        <Navigate
          to="/student"
          replace
        />
      );
    }

    // -------------------------------------------------
    // Admin / Junior Admin trying to access student
    // -------------------------------------------------

    if (
      role === "admin" ||
      role === "junior_admin"
    ) {
      return (
        <Navigate
          to="/admin"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // ===================================================
  // AUTHORIZED
  // ===================================================

  console.log(
    "ACCESS GRANTED:",
    location.pathname,
    role
  );

  return children;
}

export default ProtectedRoute;