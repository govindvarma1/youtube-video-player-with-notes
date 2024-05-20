import React, { useEffect, useRef, useState } from "react";

const VideoPlayer = ({ videoId, onReady, videoDetails }) => {
    const playerRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.body.appendChild(script);

        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player("player", {
                videoId,
                events: {
                    onReady: (event) => {
                        setLoading(false); // Hide loader when video is ready
                        if (onReady) {
                            onReady(event);
                        }
                    },
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
                {loading && (
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                )}
                <div id="player" className="absolute top-0 left-0 w-full h-full rounded-2xl"></div>
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
