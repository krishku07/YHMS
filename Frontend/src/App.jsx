import AppRoutes from "./routes/AppRoutes";
import RollbackHandler from "./components/RollbackHandler";
import ErrorBoundary from "./components/ErrorBoundary";
import { ToastContainer } from "./components/Toast";

function App() {
  return (
    <ErrorBoundary>
      <RollbackHandler />
      <ToastContainer />
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;

