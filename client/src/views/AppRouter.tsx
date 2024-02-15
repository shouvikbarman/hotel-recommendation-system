import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
import Login from "./login";
import Main from "./main";
import Hotel from "./hotel";
import { useAuth } from "../context/AuthContext";

const AppRouter = () => {
  const { user, logout } = useAuth();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout isAuthenticated={!!user} user={user} onSignOut={logout} />
          }
        >
          <Route index element={<Main />} />
          <Route path="signin" element={<Login />} />
          <Route path="/:hotelId" element={<Hotel />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
