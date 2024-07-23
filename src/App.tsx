import { Tree } from "./components/tree"

import { data } from './constants'

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
    <Tree data={dataTree} />
  )
}

export default App
