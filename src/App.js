import { useEffect, useState } from "react";
import "./App.css";
import NotesPreview from "./components/Tiles/NotesPreview";
import uuid from "react-uuid";
import SideBar from "./components/SideBar/SideBar";
import { callService } from "./constants/const";

function App() {
  const [folders, setfolders] = useState(
    localStorage.folders ? JSON.parse(localStorage.folders) : []
  );

  const [activeFolder, setActiveFolder] = useState({});
  const [activeNote, setActiveNote] = useState({});

  useEffect(() => {
    callService("folders", "GET", setfolders);
  }, []);

  const onAddFolder = (name) => {
    const newFolder = {
      id: uuid(),
      title: "",
      lastModified: Date.now(),
      notes: [],
    };
    callService("folders/create", "POST", setfolders, newFolder);
  };

  const onUpdateFolder = (updatedfolder) => {
    callService(`folders/update?fid=${updatedfolder.id}`, "POST", setfolders, {
      ...updatedfolder,
    });
    setActiveFolder(updatedfolder);
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
    callService(`folders/delete?`, "DELETE", setfolders, { id: activeFolder });
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
    callService("notes", "DELETE", setfolders, {
      fid: activeFolder,
      nid: activeNote,
    });
    setActiveNote(notes[0].id);
  };

  const onAddNotes = () => {
    const newNote = {
      id: uuid(),
      title: "",
      body: "",
      lastModified: Date.now(),
      folderId: activeFolder,
    };
    callService("notes", "POST", setfolders, { fid: activeFolder, newNote });
    setActiveNote(newNote.id);
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
