// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Home, Search, PlusSquare, Heart, User } from "lucide-react";

// const BottomNavigation: React.FC = () => {
//   const location = useLocation();

//   const navItems = [
//     { icon: Home, path: "/home", isActive: location.pathname === "/home" },
//     {
//       icon: Search,
//       path: "/explore",
//       isActive: location.pathname === "/explore",
//     },
//     {
//       icon: PlusSquare,
//       path: "/create",
//       isActive: location.pathname === "/create",
//     },
//     {
//       icon: Heart,
//       path: "/notifications",
//       isActive: location.pathname === "/notifications",
//     },
//     {
//       icon: User,
//       path: "/profile",
//       isActive:
//         location.pathname === "/profile" ||
//         location.pathname.startsWith("/profile/"),
//     },
//   ];

//   return (
//     <div className="absolute bottom-8 left-0 right-0 bg-white border-t border-gray-200">
//       <div className="flex justify-around items-center py-3">
//         {navItems.map((item, index) => {
//           const IconComponent = item.icon;
//           return (
//             <Link
//               key={index}
//               to={item.path}
//               className="p-2 flex items-center justify-center"
//             >
//               {index === 4 ? (
//                 <div
//                   className={`w-6 h-6 rounded-full overflow-hidden ${
//                     item.isActive ? "ring-2 ring-black" : "ring-1 ring-gray-300"
//                   }`}
//                 >
//                   <img
//                     src="/api/placeholder/24/24"
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               ) : (
//                 <IconComponent
//                   className={`w-6 h-6 ${
//                     item.isActive ? "text-black" : "text-gray-600"
//                   }`}
//                 />
//               )}
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BottomNavigation;
