import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's Snow theme CSS
import { CiCirclePlus } from "react-icons/ci";

const NoteForm = ({videoRef, addNote }) => {
    const [noteContent, setNoteContent] = useState({ note: "", timeStamp: 0 });
    const [isExpanded, setIsExpanded] = useState(false);

    const onSave = () => {
        addNote(noteContent);
    };

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        const formattedSeconds = seconds.toString().padStart(2, '0'); // Ensure two digits for seconds
    
        return `${minutes.toString().padStart(2, '0')}:${formattedSeconds}`;
    };

    const newNote = () => {
        setIsExpanded(true);
        videoRef.current.pauseVideo();
        setNoteContent((prevValue) => ({
            ...prevValue,
            timeStamp: videoRef.current.getCurrentTime(),
        }));
    };

    return (
        <div className="w-full">
            <div className="flex justify-between w-full">
                <div>
                    <h2 className="text-xl font-bold">My notes</h2>
                    <p>
                        All your notes at a single place. Click on any note to
                        go to specific timestamp in the video
                    </p>
                </div>
                <button
                    className="flex items-center gap-2 px-2 py-1 border border-black rounded-md cursor-pointer h-fit"
                    onClick={newNote}>
                    <CiCirclePlus size={24} /> Add new note
                </button>
            </div>
            {isExpanded ? (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center w-full gap-2">
                        <p className="p-1 font-bold text-white bg-black rounded-xl w-fit">{formatTime(noteContent.timeStamp)}</p>
                        <ReactQuill
                            value={noteContent.note}
                            onChange={(value) =>
                                setNoteContent((prevValue) => ({
                                    ...prevValue,
                                    note: value,
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
