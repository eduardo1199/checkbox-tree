import { Checkbox } from '../check-box'

import { TreeData } from '../../App';
import React, {  useContext, useEffect, useState } from 'react';
import { TreeItemContext } from '../../context/TreeItemContext';
import { Accordion } from '../accordion';
interface CheckboxParentProps {
  treeData: TreeData
  treeParentData: TreeData
}

export function TreeItem({ treeData, treeParentData }: CheckboxParentProps){
  const { treeItems, handleAddItems, checkIsIndeterminate, loadItemsToStorage } = useContext(TreeItemContext)

  const [checked, setChecked] = useState<boolean>(treeItems[treeData.id] ?? false);
  const [expanded, setExpanded] = useState<boolean>(false)

  const childrenValuesTree = Object.values(treeData.children)

  const hasChildren = childrenValuesTree.length > 0;

  function handleChecked(checked: boolean, position: number) {
    handleAddItems(treeData,checked, treeParentData.id)
    setChecked(checked)

    const scrollTop = window.scrollY
   
    window.scroll({
      top: scrollTop + position - (window.innerHeight / 2),
      behavior: "smooth",
    })
  }

  function handleClick(event: React.MouseEvent) {
    event.stopPropagation();
  }

  const isIndeterminate = checkIsIndeterminate(childrenValuesTree)

  useEffect(() => {
    setChecked(treeItems[treeData.id] ?? false)
  }, [treeItems, treeData.id])

  useEffect(() => {
    loadItemsToStorage(treeData.id)
  }, [])

  return (
    <Accordion 
      visibilityExpandIcon={hasChildren}
      expanded={expanded}
      onChangeExpanded={(value: boolean) => setExpanded(value)}
      checkBoxContent={
        <Checkbox 
          isChecked={checked} 
          onCheckElement={handleChecked}
          isIndeterminate={isIndeterminate}
          data-testid="check-box"
        >
          {treeData.name}
        </Checkbox>
      }
      onClick={handleClick}
    >
      {childrenValuesTree.length > 0 && (childrenValuesTree.map((value) => {
        return (     
          <TreeItem 
            treeData={value} 
            treeParentData={treeData}
            key={value.id}
          />
          )
        })
      )}
    </Accordion>
  );
}
