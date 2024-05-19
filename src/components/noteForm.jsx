import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's Snow theme CSS
import { CiCirclePlus } from "react-icons/ci";

const NoteForm = ({ videoRef, addNote }) => {
    const [noteContent, setNoteContent] = useState({
        content: "",
        timeStamp: 0,
    });
    const [isExpanded, setIsExpanded] = useState(false);

    const onSave = () => {
        addNote(noteContent);
        setNoteContent({ content: "", timeStamp: 0 });
        setIsExpanded(false);
    };

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        const formattedSeconds = seconds.toString().padStart(2, "0"); // Ensure two digits for seconds

        return `${minutes.toString().padStart(2, "0")}:${formattedSeconds}`;
    };

    const newNote = () => {
        if (videoRef.current && videoRef.current.pauseVideo && videoRef.current.getCurrentTime) {
            setIsExpanded(true);
            videoRef.current.pauseVideo();
            setNoteContent((prevValue) => ({
                ...prevValue,
                timeStamp: videoRef.current.getCurrentTime(),
            }));
        } else {
            console.error("videoRef.current is null or missing methods");
        }
    };

    useEffect(() => {
        let interval;
        if (isExpanded) {
            interval = setInterval(() => {
                if (videoRef.current && videoRef.current.getCurrentTime) {
                    setNoteContent((prevValue) => ({
                        ...prevValue,
                        timeStamp: videoRef.current.getCurrentTime(),
                    }));
                } else {
                    console.error("videoRef.current is null or getCurrentTime method is missing");
                }
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isExpanded, videoRef]);

    return (
        <div className="w-full py-4">
            <div className="flex justify-between w-full mb-2">
                <div>
                    <h2 className="text-xl font-bold">My notes</h2>
                    <p>
                        All your notes at a single place. Click on any note to
                        go to specific timestamp in the video
                    </p>
                </div>
                {!isExpanded && (
                    <button
                        className="flex items-center gap-2 px-2 py-1 border border-black rounded-md cursor-pointer h-fit"
                        onClick={newNote}>
                        <CiCirclePlus size={24} /> Add new note
                    </button>
                )}
            </div>
            {isExpanded ? (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center w-full gap-2 note-editor">
                        <p className="p-1 font-bold text-white bg-black rounded-xl w-fit">
                            {formatTime(noteContent.timeStamp)}
                        </p>
                        <ReactQuill
                            value={noteContent.content}
                            onChange={(value) =>
                                setNoteContent((prevValue) => ({
                                    ...prevValue,
                                    content: value,
                                }))
                            }
                            theme="snow"
                            className="w-full"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={() => {
                                setIsExpanded(false);
                            }}
                            className="px-2 py-1 font-bold">
                            Cancel
                        </button>
                        <button
                            onClick={onSave}
                            className="px-2 py-1 font-bold text-white bg-black rounded-md">
                            Save
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default NoteForm;
