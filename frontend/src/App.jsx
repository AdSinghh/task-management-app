import Login from "./pages/login.page";
import "./App.css";
import SignUp from "./pages/signup.page";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout.component";
import DashboardPage from "./pages/dashboard.page";
import RequireAuth from "./components/require-auth.component";
import AuthProvider from "./context/auth.context";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Toaster/>
        <Routes>
          <Route index element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
