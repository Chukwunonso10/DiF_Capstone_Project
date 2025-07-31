import React from "react";
import { Link } from "react-router-dom";
import SignupForm from "../../components/auth/SignupForm";

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-300 sm:rounded-sm sm:px-10">
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold text-gray-900 mb-8"
              style={{ fontFamily: "Billabong, cursive" }}
            >
              Instagram
            </h1>
          </div>

          <SignupForm />
        </div>

        <div className="mt-4 bg-white py-4 px-4 shadow-sm border border-gray-300 sm:rounded-sm sm:px-10">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-500"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-4">Get the app.</p>
          <div className="flex justify-center space-x-3">
            <a href="#" className="inline-block">
              <img
                src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
                alt="Download on the App Store"
                className="h-10"
              />
            </a>
            <a href="#" className="inline-block">
              <img
                src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
                alt="Get it on Google Play"
                className="h-10"
              />
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center space-x-6 text-xs text-gray-500">
            <a href="#" className="hover:underline">
              Meta
            </a>
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              Blog
            </a>
            <a href="#" className="hover:underline">
              Jobs
            </a>
            <a href="#" className="hover:underline">
              Help
            </a>
            <a href="#" className="hover:underline">
              API
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Locations
            </a>
            <a href="#" className="hover:underline">
              Instagram Lite
            </a>
            <a href="#" className="hover:underline">
              Threads
            </a>
            <a href="#" className="hover:underline">
              Contact Uploading & Non-Users
            </a>
            <a href="#" className="hover:underline">
              Meta Verified
            </a>
          </div>
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              English &nbsp;&nbsp; © 2025 Instagram from Meta
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
