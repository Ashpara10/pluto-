import React from "react";
import CreateCollectionDialog from "./CreateCollectionDialog";
import CreateDocumentDialog from "./CreateDocumentDialog";
import CreateWorkspaceDialog from "./CreateWorkspaceDialog";
import MoveToFolderDialog from "./MoveToFolderDialog";

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CreateDocumentDialog />
      <CreateCollectionDialog />
      <MoveToFolderDialog />
      <CreateWorkspaceDialog />
      {children}
    </>
  );
};

export default DialogProvider;
