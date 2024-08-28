import React from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface ProgressBarProps {
      progress: number;
      total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, total }) => {
      const percentage = (progress / total) * 100;
      return (
            <div className="flex justify-center items-center bg-dark mb-5">
                  <div className="flex items-center">
                        <CircularProgress value={percentage} color="green.400">
                              <CircularProgressLabel>
                                    {Math.round(percentage)}%
                              </CircularProgressLabel>
                        </CircularProgress>
                        <span className="ml-2">
                              {progress}/{total} completed
                        </span>
                  </div>
            </div>
      );
};

export default ProgressBar;
