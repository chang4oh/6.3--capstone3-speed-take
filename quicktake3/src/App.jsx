import { useState, useEffect } from "react";
import CreateForm from "./CreateForm";
import Note from "./Note";
import Header from "./Header";
import Footer from "./Footer";
import { v4 as uuidv4 } from "uuid"; // npm install uuid

const App = () => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({ title: "", content: "" });
    // first useEffect converts string (localStorage) into JS object (JSON - JavaScript Object Notation)
    // second useEffect converts JS object into string to save onto localStorage

    useEffect(() => {
        // run after every render
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(savedNotes);
    }, []); // [] run only once after the first render

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]); // runs whenever notes change, hence saving onto localStorage

    // Single handleChange for all inputs
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNote((prevNote) => ({ ...prevNote, [name]: value }));
    };

    // Submit current note to notes array
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!note.title && !note.content) return;

        setNotes((prevNotes) => [
            ...prevNotes,
            { ...note, id: uuidv4(), bookmark: false },
        ]);

        setNote({ title: "", content: "" }); // reset form
    };

    const handleDelete = (id) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    };

    const handleBookmark = (id) => {
        setNotes((prevNotes) =>
            prevNotes.map((n) =>
                n.id === id ? { ...n, bookmark: !n.bookmark } : n
            )
        );
    };

    return (
        //outside .root is body and html as for reference
        <div className="container">
            <Header />
            <CreateForm
                handleSubmit={handleSubmit}
                note={note}
                handleChange={handleChange}
            />
            <div className="notes">
                {notes.map((note, index) => (
                    <Note
                        key={note.id}
                        id={note.id} // use for handleBookmark / handleDelete
                        index={index} // pass index for display purposes
                        title={note.title}
                        content={note.content}
                        bookmark={note.bookmark} // ✅ Pass bookmark state
                        handleDelete={handleDelete}
                        handleBookmark={handleBookmark}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default App;
