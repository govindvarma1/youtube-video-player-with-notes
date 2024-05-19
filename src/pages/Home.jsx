import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"
import toast, { Toaster } from "react-hot-toast";

export const Home = () => {
    const [videoId, setVideoId] = useState("");
    const navigate = useNavigate();

    const videoSearch = () => {
      if(!videoId) {
        toast.error("Plaese enter a video id");
        return;
      }
      navigate(`/video/${videoId}`)
    }

    const handleChange = (event) => {
      const {value} = event.target;
      setVideoId(value);
    }

    return (
        <div className="video-search">
            <h2 className="mb-4 text-2xl font-bold">Video Player with notes</h2>
            <div className="mb-6">
                <label
                    htmlFor="name"
                    className="block mb-2 font-bold text-gray-700">
                    Youtube VideoID:
                </label>
                <input
                    type="text"
                    id="name"
                    value={videoId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={videoSearch}>Search Video</button>
                <Toaster />
        </div>
    );
};
