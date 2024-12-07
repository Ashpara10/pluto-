import React from "react";
import CreateCollectionDialog from "./CreateCollectionDialog";
import CreateDocumentDialog from "./CreateDocumentDialog";
import CreateWorkspaceDialog from "./CreateWorkspaceDialog";
import MoveToFolderDialog from "./MoveToFolderDialog";
import DeleteDocumentDialog from "./DeleteDocumentDialog";
import DeleteWorkspaceDialog from "./DeleteWorkspaceDialog";

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CreateDocumentDialog />
      <CreateCollectionDialog />
      <MoveToFolderDialog />
      <CreateWorkspaceDialog />
      <DeleteDocumentDialog />
      <DeleteWorkspaceDialog />
      {children}
    </>
  );
};

export default DialogProvider;
