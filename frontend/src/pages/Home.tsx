import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
      const navigate = useNavigate();
      return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
                  <div className="text-center mb-8">
                        <h1 className="text-6xl font-extrabold mb-4">Lizmotors</h1>
                        <p className="text-lg max-w-2xl leading-relaxed">
                              Welcome to Lizmotors, your go-to platform for comprehensive training
                              modules with videos. Our modules are designed to equip you with the
                              essential knowledge and skills required to excel in your field. Get
                              started today and take the first step towards mastering the tools and
                              techniques you need to succeed.
                        </p>
                  </div>
                  <button
                        className="px-8 py-4 bg-blue-600 text-white text-xl font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                        onClick={() => navigate("/training")}
                  >
                        Get Started
                  </button>
            </div>
      );
};

export default Home;
