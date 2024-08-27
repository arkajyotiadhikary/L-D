import React from "react";
import Navbar from "../components/Navbar.js";
const Home: React.FC = () => {
      return (
            <div>
                  <Navbar isSignedIn={false} />
                  <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
                        <h1 className="text-5xl font-bold mb-8">Lizmotors</h1>
                        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                              Get Started
                        </button>
                  </div>
            </div>
      );
};

export default Home;
