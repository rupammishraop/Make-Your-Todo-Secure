import React, { useEffect, useRef } from 'react';

const VideoPlayer = ({ videoUrl, className="" }) => {
    const videoRef = useRef(null);

    // const togglePlay = () => {
    //     if (videoRef.current.paused) {
    //         videoRef.current.play();
    //     } else {
    //         videoRef.current.pause();
    //     }
    // };
    useEffect(() => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } 
    })

    return (
        <div className={className} >
            <video ref={videoRef}  className="w-full pointer-events-none" loop autoPlay >
                <source src="/src/videos/video1.mp4" type="video/mp4" play />
                Your browser does not sup/ort the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
