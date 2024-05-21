# Video Player with Notes

This project is a responsive video player built with ReactJS using Vite as the build tool. It allows users to play YouTube videos and save notes corresponding to specific timestamps of the video. The notes are stored in local storage and are linked to the video ID, so changing the video will display the corresponding notes for the new video ID.

## Features

1. **Video Player**:
    - Embed a YouTube video player that can play any YouTube video.
    - The video is changeable based on a provided video ID.

2. **Notes Functionality**:
    - Users can add notes linked to specific timestamps in the video.
    - Each note includes:
        - A timestamp (clickable to jump to that point in the video).
        - The date the note was created.
        - The note content, which can include HTML text for formatting options such as:
            - **Bold**
            - *Italics*
            - <u>Underline</u>
            - <span style="color: red;">Custom colors</span>
    - Users can edit and delete notes.

3. **Local Storage**:
    - Notes are saved in local storage.
    - Notes are tied to the video ID, so changing the video will display the corresponding notes for the new video ID.

## Tech Stack

- React JS

## Project Structure

```plaintext
video-player-with-notes/
├── src/
│   ├── components/
│   │   ├── videoPlayer.jsx
│   │   ├── notes.jsx
│   │   ├── note.jsx
│   │   └── noteForm.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Video.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.css
│   ├── index.css
└── README.md
