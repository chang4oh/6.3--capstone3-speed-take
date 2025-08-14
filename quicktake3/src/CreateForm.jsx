const CreateForm = ({ handleSubmit, note, handleChange }) => {
    return (
        <form className="create-form" onSubmit={handleSubmit}>
            <input
                name="title"
                placeholder="Title"
                value={note.title}
                onChange={handleChange}
            />
            <input
                name="content"
                placeholder="Content"
                value={note.content}
                onChange={handleChange}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default CreateForm;
