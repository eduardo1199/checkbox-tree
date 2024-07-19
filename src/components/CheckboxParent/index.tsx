import { Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TreeData } from '../../App';
import { CheckboxChildren } from '../CheckBoxChildren';
import { useEffect, useState } from 'react';

interface CheckboxParentProps {
  treeData: TreeData
  initialValue: boolean
  initialDataTree: CheckBoxTree
}

interface CheckBoxMarked {
  [id: string]: boolean;
}

interface CheckBoxTree {
  [id: string]: CheckBoxMarked;
}

export function CheckboxParent({ treeData, initialValue, initialDataTree }: CheckboxParentProps){
  const [checkBoxTree, setCheckBoxTree] = useState<CheckBoxTree>(initialDataTree); 

  console.log(initialDataTree)

  const handleChangeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const changeAllChecked = {} as CheckBoxMarked

    Object.entries(checkBoxTree[treeData.id]).forEach(([id]) => {
      changeAllChecked[id] = event.target.checked
    })

    const newCheckBoxTree: CheckBoxTree = { ...checkBoxTree }
    newCheckBoxTree[treeData.id] = changeAllChecked

    setCheckBoxTree(newCheckBoxTree)
  };

  function handleChangeMarkedChildren(marked: boolean, id: string) {
    const changeCheckBoxMarker = { ...checkBoxTree }

    changeCheckBoxMarker[treeData.id][id] = marked

    setCheckBoxTree(changeCheckBoxMarker)
  }

  const dataChildrenValues: TreeData[]  = Object.entries(treeData.children).map(([_, value]) => {
    return value
  })

  const isCheckedAllChildren = Object.values(checkBoxTree[treeData.id]).every((checked) => {
    return checked 
  })


  const hasOneChildrenNotMarked = isCheckedAllChildren ? false : Object.values(checkBoxTree[treeData.id]).some((checked) => {
    return checked
  })

  useEffect(() => {
    const initialState = initialDataTree

    const valuesChildrenTree = Object.entries(treeData.children)

    valuesChildrenTree.forEach(([_, value]) => {
      initialState[treeData.id][value.id] = initialValue;
    })
 
    setCheckBoxTree(initialState) 
  }, [treeData, initialValue, initialDataTree])

  return (
    <div>
      <FormControlLabel
        label={treeData.name}
        control={
          <Checkbox 
            checked={isCheckedAllChildren} 
            onChange={handleChangeAll} 
            indeterminate={hasOneChildrenNotMarked}
          />
        }
      />

      {dataChildrenValues.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          {dataChildrenValues.map((value) => {
            return (
              <CheckboxChildren
                key={value.id} 
                data={value}
                checked={checkBoxTree[treeData.id][value.id]}
                onChangeCheckBox={handleChangeMarkedChildren}
                id={value.id} 
                initialDataTree={checkBoxTree}
              />
            )
          })}
        </Box>
      )}
    </div>
  );
}