import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/videoPlayer";
import { Notes } from "../components/notes";

export const Video = () => {
    const { videoId } = useParams(); // Reading videoId from URL parameters
    const [videoDetails, setVideoDetails] = useState({
        title: "",
        description: "",
    });
    const playerRef = useRef(null);
    const API_KEY = "AIzaSyCZDXQtxkRQduhn12u_dUd62tJ6NUrzkvg"; // Your API key here

    const handleVideoReady = (event) => {
        playerRef.current = event.target;
        console.log(playerRef);
    };

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`
                );
                const data = await response.json();
                if (data.items.length > 0) {
                    const { title, description } = data.items[0].snippet;
                    setVideoDetails({ title, description });
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchVideoDetails();
    }, [videoId]);

    return (
        <div className="w-11/12 px-4 py-1 mx-auto mb-8 md:w-10/12 lg:w-10/12">
            <VideoPlayer videoId={videoId} onReady={handleVideoReady} videoDetails={videoDetails}/>
            <Notes videoRef={playerRef} videoId={videoId}/>
        </div>
    );
};
