import { useCallback, useContext, useEffect, useState } from "react";
import { TreeData } from "../../App";
import { TreeItemContext } from "../../context/TreeItemContext";
import { TreeItem } from "../tree-item";
import { Container } from "./styles";

interface TreeProps {
  data: TreeData[]
}

export interface TreeItemType {
  [id: string]: boolean
}

export function Tree({ data }: TreeProps) { 
  const { loadItemsToStorage } = useContext(TreeItemContext)

  const saveDataTreeLocalStorageToState = useCallback((treeData: TreeData) => {
    loadItemsToStorage(treeData.id)

    if(Object.values(treeData.children).length > 0) {
      Object.values(treeData.children).forEach((item) => {
        saveDataTreeLocalStorageToState(item)
      })
    }
  }, [])
  
  useEffect(() => {
    data.forEach((treeItem) => {
      saveDataTreeLocalStorageToState(treeItem)
    })
  }, [data,saveDataTreeLocalStorageToState])


  return (
    <Container>
      {data.map((treeData) => {
        return (
          <TreeItem 
            treeData={treeData} 
            treeParentData={{} as TreeData}
            key={treeData.id}
          />
        )
      })}
    </Container>
  )
}