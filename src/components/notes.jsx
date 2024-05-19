import React, { useEffect, useState } from "react";
import NoteForm from "./noteForm";
import { Note } from "./note";

export const Notes = ({ videoRef, videoId }) => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = () => {
            const fetchedNotes = localStorage.getItem(`notes-${videoId}`);
            if (fetchNotes) {
                setNotes(JSON.parse(fetchedNotes));
            }
        };
        fetchNotes();
    }, []);

    const saveNotes = (newNotes) => {
        localStorage.setItem(`notes-${videoId}`,JSON.stringify(newNotes));

    };

    const addNote = (note) => {
        const newNotes = [...notes, {...note, id: Date.now()}]
        setNotes(notes);
        saveNotes(newNotes);        
    };

    const deleteNote = () => {};

    const editNote = () => {};

    return <>
    <NoteForm videoRef={videoRef} addNote={addNote} />
    <div>{notes.map(note => <Note id={note.id} />)}</div>
    </>
};
