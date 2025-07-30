import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import SignupPage from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/:username" element={<Profile />} />
    </Routes>
  );
}

export default App;

// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useAuth } from "./hooks/useAuth";
// import Login from "./pages/Login/Login";
// import Signup from "./pages/Signup";
// import Home from "./pages/Home/Home";

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
// };

// const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   return !isAuthenticated() ? <>{children}</> : <Navigate to="/" replace />;
// };

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <Routes>
//         <Route
//           path="/login"
//           element={
//             <PublicRoute>
//               <Login />
//             </PublicRoute>
//           }
//         />
//         <Route
//           path="/signup"
//           element={
//             <PublicRoute>
//               <Signup />
//             </PublicRoute>
//           }
//         />

//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;

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
