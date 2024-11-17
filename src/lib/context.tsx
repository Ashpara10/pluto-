import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type UpdateStateFunctionType = (isOpen: boolean) => void;

type ContextStateType = {
  sidebarOpen: boolean;
  createDocumentDialogOpen: boolean;
  selectedDocuments?: Set<number>;
  setSelectedDocuments?: React.Dispatch<React.SetStateAction<Set<number>>>;
  isCreateCollectionDialogOpen?: boolean;
  isMoveToFolderDialogOpen?: boolean;
  isCreateWorkspaceDialogOpen?: boolean;
};
type setContextType = [
  ContextStateType,
  {
    setSidebarOpen: UpdateStateFunctionType;
    setCreateDocumentDialogOpen: UpdateStateFunctionType;
    setIsCreateCollectionDialogOpen?: UpdateStateFunctionType;
    setIsMoveToFolderDialogOpen?: UpdateStateFunctionType;
    setIsCreateWorkspaceDialogOpen?: UpdateStateFunctionType;
  }
];

const defaultContextState: ContextStateType = {
  sidebarOpen: false,
  createDocumentDialogOpen: false,
  selectedDocuments: new Set(),
  setSelectedDocuments: () => {},
  isCreateCollectionDialogOpen: false,
  isMoveToFolderDialogOpen: false,
  isCreateWorkspaceDialogOpen: false,
};

export const Context = createContext([
  defaultContextState,
  {
    setSidebarOpen: () => {},
    setCreateDocumentDialogOpen: () => {},
    setIsCreateCollectionDialogOpen: () => {},
    setIsMoveToFolderDialogOpen: () => {},
    setIsCreateWorkspaceDialogOpen: () => {},
  },
] as setContextType);

export const useSidebarOpenContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useDialogs must be used within a DialogsProvider");
  }

  return {
    sidebarOpen: context[0].sidebarOpen,
    setSidebarOpen: context[1].setSidebarOpen,
  };
};

export const useCreateDocumentDialog = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useDialogs must be used within a DialogsProvider");
  }

  return {
    createDocumentDialogOpen: context[0].createDocumentDialogOpen,
    setCreateDocumentDialogOpen: context[1].setCreateDocumentDialogOpen,
  };
};
export const useCreateCollectionDialog = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useDialogs must be used within a DialogsProvider");
  }

  return {
    createCollectionDialogOpen: context[0].isCreateCollectionDialogOpen,
    setCreateCollectionDialogOpen: context[1].setIsCreateCollectionDialogOpen,
  };
};

export const useSelectedDocuments = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Context error");
  }

  return {
    selectedDocuments: context[0].selectedDocuments,
    setSelectedDocuments: context[0].setSelectedDocuments,
  };
};

export const useIsMoveToFolderDialog = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Context error");
  }

  return {
    isMoveToFolderDialogOpen: context[0].isMoveToFolderDialogOpen,
    setIsMoveToFolderDialogOpen: context[1].setIsMoveToFolderDialogOpen,
  };
};
export const useWorkspaceDialog = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Context error");
  }

  return {
    isCreateWorkspaceDialogOpen: context[0].isCreateWorkspaceDialogOpen,
    setIsCreateWorkspaceDialogOpen: context[1].setIsCreateWorkspaceDialogOpen,
  };
};

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDocuments, setSelectedDocuments] = useState<Set<number>>(
    new Set()
  );
  const [openContext, setOpenContext] =
    useState<ContextStateType>(defaultContextState);
  const setSidebarOpen = useCallback(
    (isOpen: boolean) => {
      setOpenContext({ ...openContext, sidebarOpen: isOpen });
    },
    [openContext?.sidebarOpen]
  );

  const setCreateDocumentDialogOpen = useCallback(
    (isOpen: boolean) => {
      setOpenContext({ ...openContext, createDocumentDialogOpen: isOpen });
    },
    [openContext?.createDocumentDialogOpen]
  );

  const setIsCreateCollectionDialogOpen = useCallback(
    (isOpen: boolean) => {
      setOpenContext({ ...openContext, isCreateCollectionDialogOpen: isOpen });
    },
    [openContext?.isCreateCollectionDialogOpen]
  );
  const setIsMoveToFolderDialogOpen = useCallback(
    (isOpen: boolean) => {
      setOpenContext({ ...openContext, isMoveToFolderDialogOpen: isOpen });
    },
    [openContext?.isMoveToFolderDialogOpen]
  );
  const setIsCreateWorkspaceDialogOpen = useCallback(
    (isOpen: boolean) => {
      setOpenContext({ ...openContext, isCreateWorkspaceDialogOpen: isOpen });
    },
    [openContext?.isCreateWorkspaceDialogOpen]
  );
  return (
    <Context.Provider
      value={[
        { ...openContext, selectedDocuments, setSelectedDocuments },
        {
          setSidebarOpen,
          setCreateDocumentDialogOpen,
          setIsCreateWorkspaceDialogOpen,
          setIsCreateCollectionDialogOpen,
          setIsMoveToFolderDialogOpen,
        },
      ]}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContextProvider;
