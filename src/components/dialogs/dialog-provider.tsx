import React from "react";
import CreateDocumentDialog from "./CreateDocumentDialog";
import CreateCollectionDialog from "./CreateCollectionDialog";
import MoveToFolderDialog from "./MoveToFolderDialog";
import CreateWorkspaceDialog from "./CreateWorkspaceDialog";

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
