import { Tree } from "./components/tree"

import { data } from './constants'
import { TreeItemProvider } from "./context/TreeItemContext"

import './style'

export interface TreeData {
  id: string
  name: string
  children: ChildrenData
}

export interface ChildrenData {
  [key: string]: TreeData
}

function App() {
  const dataTree: TreeData[]  = Object.entries(data).map(([_, value]) => {
    return value
  })

  return (
    <TreeItemProvider>
      <Tree data={dataTree} />
    </TreeItemProvider>
  )
}

export default App
