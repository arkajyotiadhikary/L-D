import React, { useRef, useEffect } from "react";

interface VideoPlayerProps {
      videoSrc: string;
      videoId: string; // Unique identifier for the video to store the position
      onVideoEnded: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, videoId, onVideoEnded }) => {
      const videoRef = useRef<HTMLVideoElement | null>(null);
      // Load the last stopped position for the specific video
      useEffect(() => {
            const storedPosition = localStorage.getItem(`video-${videoId}-position`);
            const lastPosition = storedPosition ? parseFloat(storedPosition) : 0;

            if (videoRef.current && !isNaN(lastPosition)) {
                  videoRef.current.currentTime = lastPosition;
            }
      }, [videoId]);

      // Save the current position when the video is paused or ends
      const handleTimeUpdate = () => {
            if (videoRef.current) {
                  const currentPosition = videoRef.current.currentTime;
                  localStorage.setItem(`video-${videoId}-position`, currentPosition.toString());
            }
      };

      // Remove the stored position when the video ends
      const handleVideoEnded = () => {
            localStorage.removeItem(`video-${videoId}-position`);
            onVideoEnded();
      };

      // Handle the video src, in case it's a full path from the backend
      const src = videoSrc.startsWith("/src/")
            ? videoSrc
            : `/src/assets/videos/${videoSrc.split("/").pop()}`;

      return (
            <video
                  ref={videoRef}
                  className="w-full"
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleVideoEnded}
                  controls
            >
                  <source src={src} type="video/mp4" />
                  Your browser does not support the video tag.
            </video>
      );
};

export default VideoPlayer;
