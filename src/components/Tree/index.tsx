import { TreeData } from "../../App";
import {  TreeItemProvider } from "../../context/TreeItemContext";
import { TreeItem } from "../tree-item";
import { Container } from "./styles";

interface TreeProps {
  data: TreeData[]
}

export interface TreeItemType {
  [id: string]: boolean
}

export function Tree({ data }: TreeProps) { 
  return (
    <Container>
      {data.map((treeData) => {
        return (
          <TreeItemProvider>
            <TreeItem 
              treeData={treeData} 
              treeParentData={{} as TreeData}
              key={treeData.id}
            />
          </TreeItemProvider>
        )
      })}
    </Container>
  )
}