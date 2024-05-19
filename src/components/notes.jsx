import React, { useEffect, useState } from "react";
import NoteForm from "./noteForm";
import { Note } from "./note";

export const Notes = ({ videoRef, videoId }) => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = () => {
            const fetchedNotes = localStorage.getItem(`notes-${videoId}`);
            if (fetchedNotes) {
                setNotes(JSON.parse(fetchedNotes));
            }
        };
        fetchNotes();
    }, []);

    const saveNotes = (newNotes) => {
        localStorage.setItem(`notes-${videoId}`, JSON.stringify(newNotes));
    };

    const addNote = (note) => {
        const newNotes = [...notes, { ...note, id: Date.now() }];
        setNotes(newNotes);
        saveNotes(newNotes);
    };

    const deleteNote = (noteId) => {
        const newNotes = notes.filter((note) => note.id !== noteId);
        setNotes(newNotes);
        saveNotes(newNotes);
    };

    const editNote = (editedNote) => {
        const newNotes = notes.map((note) => {
            if (note.id === editedNote.id) {
                return editedNote;
            }
            return note;
        });
        setNotes(newNotes);
        saveNotes(newNotes);
    };

    const handleTimeStampClick = (timeStamp) => {
        videoRef.current.seekTo(timeStamp, true);
    }

    return (
        <div className="p-4 border rounded-lg border-gray">
            <NoteForm videoRef={videoRef} addNote={addNote} />
            {notes.length ? (
                <div className="flex flex-col w-full h-full">
                    {notes.map((note) => (
                        <Note key={note.id} handleTimeStampClick={handleTimeStampClick} note={note} deleteNote={deleteNote} editNote={editNote} />
                    ))}
                </div>
            ) : null}
        </div>
    );
};
