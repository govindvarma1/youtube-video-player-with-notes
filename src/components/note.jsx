import React from "react";

export const Note = ({ note, delereNote, editNote }) => {
    const { id, timeStamp, content } = note;

    const date = new Date(id);
    const formatTime = (timeStamp) => {
        const minutes = Math.floor(timeStamp / 60);
        const seconds = Math.floor(timeStamp % 60);
        const mmMinssSec = `${minutes} Min ${seconds} Sec`;
        return mmMinssSec;
    };

    return (
        <div className="flex flex-col w-full gap-2">
            <div>
                <p>
                    {date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
                <p>{formatTime(timeStamp)}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <div className="flex justify-end gap-2">
              <button className="p-1 border border-black rounded-md" onClick={editNote}>edit note</button>
              <button className="p-1 border border-black rounded-md" onClick={editNote}>delete note</button>
            </div>
        </div>
    );
};
