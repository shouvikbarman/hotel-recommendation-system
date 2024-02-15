import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./views/AppRouter";

function App() {
  return (
    // <ThemeConfig>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
    // </ThemeConfig>
  );
}

export default App;
