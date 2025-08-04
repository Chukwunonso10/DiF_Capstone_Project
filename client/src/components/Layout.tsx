// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// interface LayoutProps {
//   children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const navigate = useNavigate();
//   const { logout, getCurrentUser } = useAuth();
//   const user = getCurrentUser();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const handleProfileClick = () => {
//     if (user?.userName) {
//       navigate(`/profile/${user.userName}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-300 sticky top-0 z-50">
//         <div className="max-w-5xl mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <div
//               className="text-2xl font-bold text-gray-900 cursor-pointer"
//               style={{ fontFamily: "Billabong, cursive" }}
//               onClick={() => navigate("/")}
//             >
//               Instagram
//             </div>

//             {/* Search Bar - Hidden on mobile */}
//             <div className="hidden md:block flex-1 max-w-xs mx-8">
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>

//             {/* Right Navigation */}
//             <div className="flex items-center space-x-4">
//               {/* Home Icon */}
//               <button
//                 onClick={() => navigate("/")}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                   />
//                 </svg>
//               </button>

//               {/* Messages Icon */}
//               <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                   />
//                 </svg>
//               </button>

//               {/* Add Post Icon */}
//               <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 4v16m8-8H4"
//                   />
//                 </svg>
//               </button>

//               {/* Profile Dropdown */}
//               <div className="relative group">
//                 <button
//                   onClick={handleProfileClick}
//                   className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
//                     {user?.fullName?.[0]?.toUpperCase() || "U"}
//                   </div>
//                 </button>

//                 {/* Dropdown Menu */}
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
//                   <div className="py-1">
//                     <button
//                       onClick={handleProfileClick}
//                       className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       <svg
//                         className="w-4 h-4 mr-3"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                         />
//                       </svg>
//                       Profile
//                     </button>
//                     <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                       <svg
//                         className="w-4 h-4 mr-3"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
//                         />
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                         />
//                       </svg>
//                       Settings
//                     </button>
//                     <div className="border-t border-gray-100"></div>
//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                     >
//                       <svg
//                         className="w-4 h-4 mr-3"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                         />
//                       </svg>
//                       Log Out
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
//     </div>
//   );
// };

// export default Layout;
