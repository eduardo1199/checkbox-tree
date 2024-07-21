import { Tree } from "./components/Tree"

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

const fakeData = {
  "0": {
    "id": "2469bdab-23b5-4cb8-90c9-c609a49410b0",
    "name": "Lars Pablo",
    "children": {
      "0": {
        "id": "97cd3a19-0f1c-4248-a84c-a1f5a0093a89",
        "name": "Luis F. Doris",
        "children": {},
        "level": 2
      },
      "1": {
        "id": "6410eff5-5aff-46fd-bb08-ed90581007b4",
        "name": "Maurice Rudolf Ludwig",
        "children": {},
        "level": 2
      },
      "2": {
        "id": "35996ee4-74a6-4343-ba5e-9700c24bee11",
        "name": "Joseph E. James A.",
        "children": {
          "0": {
            "id": "3bfdf6e6-8a30-4bc3-892d-8d5773ee6bf5",
            "name": "Guglielmo Hendrik Antoon",
            "children": {},
            "level": 3
          },
          "1": {
            "id": "d3865a91-c4e3-4ee7-b73e-5c2c7d428091",
            "name": "Wladyslaw Stanislaw Ivar",
            "children": {},
            "level": 3
          },
        },
        "level": 2
      },
    },
    "level": 1
  }
}

function App() {
  const dataTree: TreeData[]  = Object.entries(data).map(([_, value]) => {
    return value
  })

  return (
    <div>
      <Tree data={dataTree} />
    </div>
  )
}

export default App
