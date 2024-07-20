import { createContext, ReactNode, useEffect, useState } from "react";
import { TreeItemType } from "../components/Tree";
import { TreeData } from "../App";

interface TreeItemContextData {
  treeItems: TreeItemType
  onCheckedItem: (checked: boolean, treeData: TreeData, treeDataParent: TreeData) => void;
  handleAddItemsStorage: (treeItem: string) => void;
}

export const TreeItemContext = createContext({} as TreeItemContextData)

interface TreeItemProviderProps {
  children: ReactNode
}

export function TreeItemProvider({ children }: TreeItemProviderProps) {
  const [treeItems, setTreeItems] = useState<TreeItemType>({});

  function saveInStorage(idItem: string, checked: boolean) {
    if(checked) {
      window.localStorage.setItem(idItem, idItem)
    } else {
      window.localStorage.removeItem(idItem)
    }
  }

  function mountItemsCheck(items: TreeItemType, treeData: TreeData, checked: boolean) {
    Object.entries(treeData.children).forEach(([_, itemChildren]) => {
      items[itemChildren.id] = checked;
      saveInStorage(itemChildren.id, checked)

      if(Object.values(itemChildren.children).length > 0) {
        items = mountItemsCheck(items, itemChildren, checked)
      }
    })

    return items
  }

  
  function handleCheckedItem(checked: boolean, treeData: TreeData, treeDataParent: TreeData): void {
    const items = { ...treeItems }

    items[treeData.id] = checked
    saveInStorage(treeData.id, checked)

    if(!checked) {
      items[treeDataParent.id] = !checked
      saveInStorage(treeDataParent.id, checked)
    }

    const updateItems = mountItemsCheck(items, treeData, checked)

    setTreeItems(updateItems)
  }

  function handleAddItemsStorage(treeItemId: string) {
    setTreeItems((state) => {
      state[treeItemId] = Boolean(window.localStorage.getItem(treeItemId))

      return {
        ...state,
      }
    })
  }


  return (
    <TreeItemContext.Provider value={{ treeItems, onCheckedItem: handleCheckedItem, handleAddItemsStorage }}>
      {children}
    </TreeItemContext.Provider>
  )
}