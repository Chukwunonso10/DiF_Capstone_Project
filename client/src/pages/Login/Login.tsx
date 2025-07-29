import React from "react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import BottomBar from "../../components/common/BottomBar";
import FacebookSignup from "../../components/auth/FacebookSignup";
import Divider from "../../components/common/Divider";
import logo from "../../assets/images/logo.png";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center px-4 py-3">
        <button onClick={() => window.history.back()} className="p-1">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 px-4 py-8 w-full sm:w-4/5 md:w-2/3 lg:w-1/3 mx-auto">
        <div className="text-center mb-12">
          <img
            src={logo}
            alt="Instagram"
            className="mx-auto h-12 transition duration-300 hover:filter hover:brightness-110 hover:sepia hover:hue-rotate-180"
          />
        </div>

        <LoginForm />

        <div className="mt-8">
          <FacebookSignup text="Log in with Facebook" />
        </div>
        <Divider />

        <div className="text-center mt-8">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="text-blue-500 font-semibold">
            Sign up
          </Link>
        </div>
      </div>

      <BottomBar />
    </div>
  );
};

export default LoginPage;
