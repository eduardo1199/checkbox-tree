import { Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TreeData } from '../../App';
import React, {  useContext, useEffect, useState } from 'react';
import { TreeItemContext } from '../../Context/TreeItemContext';

interface CheckboxParentProps {
  treeData: TreeData
  initialChecked: boolean
  treeDataParent: TreeData
}

export function TreeItem({ treeData, initialChecked, treeDataParent }: CheckboxParentProps){
  const { treeItems, onCheckedItem, handleAddItemsStorage } = useContext(TreeItemContext)

  const [checked, setChecked] = useState(() => Boolean(window.localStorage.getItem(treeData.id)) || initialChecked || false)

  const handleChangeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    onCheckedItem(event.target.checked, treeData, treeDataParent)
  };

  const treeChildrens: TreeData[]  = Object.entries(treeData.children).map(([_, value]) => {
    return value
  })
   
  const amountCheckedChildren = Object.values(treeData.children).reduce((currentValue, treeChildren) => {
    if(treeItems[treeChildren.id] === true) {
      currentValue++
    }

    return currentValue
  }, 0)

  const handleClick = (event: any) => {
    event.stopPropagation();
  };
  
  useEffect(() => {
    setChecked(() => Boolean(window.localStorage.getItem(treeData.id)) ?? initialChecked ?? false)
    handleAddItemsStorage(treeData.id)
  }, [initialChecked, treeData.id])

  return (
    <div>
      <FormControlLabel
        label={treeData.name}
        control={
          <Checkbox 
            checked={checked} 
            onChange={handleChangeAll} 
            indeterminate={!!amountCheckedChildren && amountCheckedChildren < treeChildrens.length}
            onClick={handleClick}
          />
        }
      />

      {treeChildrens.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          {treeChildrens.map((treeChildren) => {
            return (
              <TreeItem
                key={treeChildren.id} 
                initialChecked={treeItems[treeChildren.id]}
                treeData={treeChildren}
                treeDataParent={treeData}
              />
            )
          })}
        </Box>
      )}
    </div>
  );
}
