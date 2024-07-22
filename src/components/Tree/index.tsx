import { TreeData } from "../../App";
import { TreeItemProvider } from "../../context/TreeItemContext";
import { TreeItem } from "../TreeItem";

interface TreeProps {
  data: TreeData[]
}

export interface TreeItemType {
  [id: string]: boolean
}

export function Tree({ data }: TreeProps) {  
  return (
    <div>
      {data.map((treeData) => {
        return (
          <TreeItemProvider key={treeData.id}>
            <TreeItem 
              treeData={treeData} 
              treeParentData={{} as TreeData}
            />
          </TreeItemProvider>
        )
      })}
    </div>
  )
}