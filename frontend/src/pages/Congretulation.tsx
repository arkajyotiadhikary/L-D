import React from "react";
import Confetti from "react-confetti";

const CongratulationPage: React.FC = () => {
      const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
      const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);

      React.useEffect(() => {
            const handleResize = () => {
                  setWindowWidth(window.innerWidth);
                  setWindowHeight(window.innerHeight);
            };

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
      }, []);

      return (
            <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-blue-100">
                  <Confetti
                        width={windowWidth}
                        height={windowHeight}
                        recycle={false} // Set to false to prevent continuous confetti
                  />
                  <div className="text-center">
                        <h1 className="text-4xl font-bold text-green-600 mb-4">Congratulations!</h1>
                        <p className="text-xl text-gray-800">
                              You've successfully completed the training. Well done!
                        </p>
                  </div>
            </div>
      );
};

export default CongratulationPage;
