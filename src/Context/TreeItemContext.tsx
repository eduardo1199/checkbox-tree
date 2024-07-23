import { createContext, ReactNode, useCallback, useState } from "react";
import { TreeItemType } from "../components/tree";
import { TreeData } from "../App";

interface TreeItemContextData {
  treeItems: TreeItemType
  handleAddItems: (treeItem: TreeData, checked: boolean, treeItemIdParent?: string) => void;
  saveInStorage:  (treeItemId: string, checked: boolean) => void;
  loadItemsToStorage: (treeItemId: string) => void;
}

export const TreeItemContext = createContext({} as TreeItemContextData)

interface TreeItemProviderProps {
  children: ReactNode
}

export function TreeItemProvider({ children }: TreeItemProviderProps) {
  const [treeItems, setTreeItems] = useState<TreeItemType>({});

  function saveInStorage(treeItemId: string, checked: boolean) {
    if(checked) {
      window.localStorage.setItem(treeItemId, treeItemId)
    } else {
      window.localStorage.removeItem(treeItemId)
    }
  }

  function handleChangeToggleChildren(items: TreeItemType, treeData: TreeData, checked: boolean): TreeItemType {
    if(Object.values(treeData.children).length > 0) {
      Object.entries(treeData.children).forEach(([_, value]) => {
        items[value.id] = checked
        saveInStorage(value.id, checked)

        items = handleChangeToggleChildren(items, value, checked)
      })
    }

    return items
  }


  function handleAddItems(treeData: TreeData, checked: boolean, treeItemIdParent?: string): void {
    setTreeItems((state) => {
      state[treeData.id] = checked
      saveInStorage(treeData.id, checked)

      if(treeItemIdParent) {
        state[treeItemIdParent] = checked
        saveInStorage(treeItemIdParent, checked)
      }

      state = handleChangeToggleChildren(state, treeData, checked)

      return {
        ...state,
      }
    })
  }

  const loadItemsToStorage = useCallback((treeItemId: string) => {
    if(window.localStorage.getItem(treeItemId)) {
      setTreeItems((state) => {
        state[treeItemId] = Boolean(window.localStorage.getItem(treeItemId))
  
        return {
          ...state,
        }
      })
    }
  }, [])

  return (
    <TreeItemContext.Provider 
      value={{ 
        treeItems, 
        handleAddItems, 
        loadItemsToStorage, 
        saveInStorage,
      }}>
      {children}
    </TreeItemContext.Provider>
  )
}