import CardComponent from "../CardComponent/CardComponent";
function SideBar({
  onAddItem,
  items,
  activeItem,
  setActive,
  update,
  onRemoveItem,
  isEditable,
  buttonText,
}) {
  const sortedNotes = items?.sort((a, b) => b.lastModified - a.lastModified);
  const folderView = sortedNotes?.map((item) => (
    <CardComponent
      item={item}
      isActive={item.id === activeItem || item[0]}
      setActive={setActive}
      update={updateItem}
      isEditable={isEditable}
    />
  ));
  function updateItem(prop, item, value) {
    update({
      ...item,
      [prop]: value,
    });
  }

  return (
    <div className="notes__sidebar">
      <div className="notes__button ">
        <Button onClickHandler={onAddItem} value={`Add ${buttonText}`} />
        <Button onClickHandler={onRemoveItem} value={`Delete ${buttonText}`} />
      </div>
      <div className="notes__sidebar__content">
        <div className="notes__list">{folderView}</div>
      </div>
    </div>
  );
}

function Button({ onClickHandler, value }) {
  return (
    <button
      className="notes__add"
      type="button"
      onClick={() => {
        onClickHandler();
      }}
    >
      {value}
    </button>
  );
}

export default SideBar;
