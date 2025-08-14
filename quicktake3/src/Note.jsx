const Note = ({ id, index, title, content, bookmark, handleDelete, handleBookmark }) => {
    return (
        <div className="note">
            <div className="bookmark" onClick={() => handleBookmark(id)}>
                <span style={{ opacity: bookmark ? "1" : ".3" }}>🔖</span>
            </div>
            <h4>{index + 1}.) {title}</h4>   {/* display index */}
            <p>{content}</p>
            <button onClick={() => handleDelete(id)}>Delete</button>
        </div>
    );
};

export default Note;
