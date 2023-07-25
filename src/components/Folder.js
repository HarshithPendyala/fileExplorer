import { useState } from "react";
function Folder({ insertNode, explorer }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null
  });
  const handleFolderOpen = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      //logic to add folder
      insertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span> 📂 {explorer.name}</span>

          <div>
            <button onClick={(e) => handleFolderOpen(e, true)}>
              {" "}
              Folder +{" "}
            </button>
            <button onClick={(e) => handleFolderOpen(e, false)}>
              {" "}
              File +{" "}
            </button>
          </div>
        </div>

        <div style={{ paddingLeft: 10, display: expand ? "block" : "none" }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span> {showInput.isFolder ? "📂" : "📄"} </span>
              <input
                className="inputContainer_input"
                type="text"
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={onAddFolder}
              />
            </div>
          )}

          {explorer.items.map((exp) => {
            return <Folder insertNode={insertNode} explorer={exp} />;
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file"> 📄{explorer.name}</span>;
  }
}

export default Folder;
