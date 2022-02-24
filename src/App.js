import { useEffect, useState } from "react";
import "./App.css";
import NotesPreview from "./components/Tiles/NotesPreview";
import uuid from "react-uuid";
import SideBar from "./components/SideBar/SideBar";

function App() {
  const [folders, setfolders] = useState(
    localStorage.folders ? JSON.parse(localStorage.folders) : []
  );

  const [activeFolder, setActiveFolder] = useState({});
  const [activeNote, setActiveNote] = useState({});

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  const onAddFolder = (name) => {
    const folderMock = {
      id: uuid(),
      title: "",
      lastModified: Date.now(),
      notes: [],
    };
    setfolders([{ ...folderMock, name }, ...folders]);
    setActiveFolder(folderMock.id);
  };

  const onUpdateFolder = (updatedfolder) => {
    const foldesList = folders.map((folder) =>
      folder.id === activeFolder
        ? { ...folder, title: updatedfolder.title }
        : folder
    );
    setfolders(foldesList);
  };

  const onUpdateNotes = (updatedNote) => {
    const activeFoldr = folders?.find((item) => item.id === activeFolder);
    const activeNotes = activeFoldr?.notes.map((item) =>
      item.id === activeNote ? { ...updatedNote } : item
    );
    const foldesList = folders.map((folder) =>
      folder.id === activeFolder
        ? {
            ...folder,
            notes: activeNotes,
          }
        : folder
    );
    setActiveNote(updatedNote.id);
    setfolders(foldesList);
  };

  const OnDeleteFolder = () => {
    const folder = folders.filter((item) => item.id !== activeFolder);
    setfolders(folder);
    setActiveFolder(folder[0].id);
  };

  const OnDeleteNotes = () => {
    const notes = folders
      .find((item) => item.id === activeFolder)
      ?.notes.filter((item) => item.id !== activeNote);

    setfolders(
      folders.map((item) =>
        item.id === activeFolder ? { ...item, notes: notes } : item
      )
    );
    setActiveNote(notes[0].id);
  };

  const onAddNotes = () => {
    const note = {
      id: uuid(),
      title: "",
      body: "",
      lastModified: Date.now(),
    };

    setfolders(
      folders.map((folder) =>
        folder.id === activeFolder
          ? { ...folder, notes: [...folder.notes, note] }
          : folder
      )
    );
    setActiveNote(note.id);
  };

  const getActiveNote = () => {
    return folders
      ?.find(({ id }) => id === activeFolder)
      ?.notes.find(({ id }) => id === activeNote);
  };

  return (
    <div className="notes">
      <SideBar
        onAddItem={onAddFolder}
        items={folders}
        activeItem={activeFolder}
        setActive={setActiveFolder}
        update={onUpdateFolder}
        sortKey={"lastModified"}
        onRemoveItem={OnDeleteFolder}
        isEditable={true}
        buttonText="Folder"
      />
      <SideBar
        onAddItem={onAddNotes}
        items={
          folders ? folders.find((item) => item.id === activeFolder)?.notes : []
        }
        activeItem={activeNote}
        setActive={setActiveNote}
        update={onUpdateNotes}
        sortKey={"lastModified"}
        onRemoveItem={OnDeleteNotes}
        isEditable={false}
        buttonText="Notes"
      />
      <NotesPreview activeNote={getActiveNote()} onUpdateNote={onUpdateNotes} />
    </div>
  );
}

export default App;
