import { TreeData } from "../../App";
import { CheckboxParent } from "../CheckboxParent";

interface TreeProps {
  data: TreeData[]
}

export function Tree({ data }: TreeProps) {
  
  return (
    <div>
      {data.map((treeData) => {
        return (
          <div key={treeData.id}>
            <CheckboxParent treeData={treeData} initialValue={false} />
          </div>
        )
      })}
    </div>
  )
}