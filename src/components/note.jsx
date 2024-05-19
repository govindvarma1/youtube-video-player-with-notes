import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's Snow theme CSS

export const Note = ({ handleTimeStampClick, note, deleteNote, editNote }) => {
    const { id, timeStamp, content } = note;
    const [isEditing, setIsEditing] = useState(false);
    const [modifiedText, setModifiedText] = useState(content);

    const discardEdit = () => {
        setModifiedText(content);
        setIsEditing(false);
    };

    const saveEdit = () => {
        const editedNote = {
            id: id,
            content: modifiedText,
            timeStamp: timeStamp,
        };
        editNote(editedNote);
        setIsEditing(false);
    };

    const date = new Date(id);
    const formatTime = (timeStamp) => {
        const minutes = Math.floor(timeStamp / 60);
        const seconds = Math.floor(timeStamp % 60);
        const mmMinssSec = `${minutes} min ${seconds} sec`;
        return mmMinssSec;
    };

    return (
        <div className="flex flex-col w-full gap-2 py-4 border-t-2">
            <div>
                <p>
                    {date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
                <p>
                    Timestamp:{" "}
                    <span
                        onClick={() => handleTimeStampClick(timeStamp)}
                        className="text-violet-600">
                        {formatTime(timeStamp)}
                    </span>
                </p>
            </div>
            {!isEditing ? (
                <div
                    className="p-2 border rounded-lg border-gray"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            ) : (
                <ReactQuill
                    value={modifiedText}
                    onChange={(value) => {
                        setModifiedText(value);
                    }}
                    theme="snow"
                    className="w-full"
                />
            )}
            {!isEditing ? (
                <div className="flex justify-end gap-2">
                    <button
                        className="p-1 border border-black rounded-md"
                        onClick={() => {
                            deleteNote(id);
                        }}>
                        Delete note
                    </button>
                    <button
                        className="p-1 border border-black rounded-md"
                        onClick={() => {
                            setIsEditing(!isEditing);
                        }}>
                        Edit note
                    </button>
                </div>
            ) : (
                <div className="flex justify-end">
                    <button
                        onClick={discardEdit}
                        className="px-2 py-1 font-bold">
                        Cancel
                    </button>
                    <button
                        onClick={saveEdit}
                        className="px-2 py-1 font-bold text-white bg-black rounded-md">
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};
