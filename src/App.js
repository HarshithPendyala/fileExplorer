import "./styles.css";
import ExplorerData from "./data/folderData";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/useTraverseTree";
import { useState } from "react";

export default function App() {
  const [explorerData, setExplorerData] = useState(ExplorerData);
  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  return (
    <div className="App">
      <Folder insertNode={handleInsertNode} explorer={explorerData} />
    </div>
  );
}
