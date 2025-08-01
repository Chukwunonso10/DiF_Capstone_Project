// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Explore from "./pages/Explore/Explore";
import Search from "./pages/Search/Search";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/explore"
        element={
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>
        }
      />

      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:username"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
};

export default App;

// import { Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./pages/Login/Login";
// import SignupPage from "./pages/Signup/Signup";
// import Home from "./pages/Home/Home";
// import Layout from "./components/Layout";

// function App() {
//   return (
//     <Routes>
//       {/* Redirect root to /home */}
//       <Route path="/" element={<Navigate to="/home" replace />} />

//       {/* Public pages (no layout) */}
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/signup" element={<SignupPage />} />

//       {/* Pages with Layout */}
//       <Route
//         path="/home"
//         element={
//           <Layout>
//             <Home />
//           </Layout>
//         }
//       />

//       {/* Optional catch-all for 404 */}
//       <Route
//         path="*"
//         element={<p style={{ textAlign: "center" }}>404 Page Not Found</p>}
//       />
//     </Routes>
//   );
// }

// export default App;
