// function NotesPreview() {
//   return (
//     <div className="notes__preview">
//       {/* <input className="notes__title" type="text" placeholder="New Note..." /> */}
//       <textarea className="notes__body">Take Note...</textarea>
//     </div>
//   );
// }

const NotesPreview = ({ activeNote, onUpdateNote }) => {
  console.log("activeNote", activeNote);
  const onEditField = (value) => {
    console.log("ggg", value);
    const i = value.indexOf("\n");
    onUpdateNote({
      ...activeNote,
      title: i !== -1 ? value.slice(0, i) : value,
      body: i !== -1 ? value.slice(i, value.length) : "",
      lastModified: Date.now(),
    });
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={`${activeNote.title}${activeNote.body}`}
          autoFocus
          onChange={(e) => onEditField(e.target.value)}
        />
      </div>
    </div>
  );
};

export default NotesPreview;
