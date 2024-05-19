import React, { useEffect, useRef, useState } from "react";

const VideoPlayer = ({ videoId, onReady, videoDetails }) => {
    const playerRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.body.appendChild(script);

        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player("player", {
                videoId,
                events: {
                    onReady: onReady,
                },
            });
        };


        return () => {
            document.body.removeChild(script);
        };
    }, [videoId, onReady]);

    const handleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="w-full mx-auto my-8">
            <h1 className="mb-4 text-2xl font-bold">Video Player with Notes</h1>
            <div className="relative w-full h-full overflow-hidden shadow-lg rounded-2xl aspect-video" id="player">
                <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-2xl"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <h1 className="mt-4 text-2xl font-bold">{videoDetails.title}</h1>
            <p className="mt-2">
                {isExpanded ? videoDetails.description : `${videoDetails.description.substring(0, 100)}`}
                <button onClick={handleReadMore} className="ml-2 text-blue-500">
                    {isExpanded ? "Show Less" : "More..."}
                </button>
            </p>
        </div>
    );
};

export default VideoPlayer;
