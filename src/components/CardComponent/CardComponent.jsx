function CardComponent({ item, setActive, isActive, update, isEditable }) {
  const { id, title, body, lastModified } = item;
  return (
    <div
      className={`notes__list-item${isActive ? "--selected" : ""}`}
      data-note-id={id}
      onClick={() => setActive(id)}
    >
      <spam style={{ float: "right", margin: "10px" }}>
        {isEditable && item.notes.length}
      </spam>
      {isEditable ? (
        <input
          onChange={(e) => {
            e.preventDefault();
            update("title", item, e.target.value);
          }}
          value={title}
          className="notes__heading"
          type="text"
          placeholder="Enter File Name.."
        />
      ) : (
        <div className="notes__heading">
          <strong>{title && title.substr(0, 30) + "..."}</strong>
        </div>
      )}
      <div className="notes__small-body">
        {body && body.substr(0, 20) + "..."}
      </div>
      <div className="notes__small-updated">
        Modified On:{" "}
        {new Date(lastModified).toLocaleDateString("en", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
}

export default CardComponent;
