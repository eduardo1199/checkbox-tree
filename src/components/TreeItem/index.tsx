import {  Box, Checkbox, FormControlLabel, Typography } from '@mui/material';


import { TreeData } from '../../App';
import React, {  useContext, useEffect, useMemo, useRef, useState } from 'react';
import { TreeItemContext } from '../../context/TreeItemContext';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary } from './styles';

interface CheckboxParentProps {
  treeData: TreeData
  treeParentData: TreeData
}

export function TreeItem({ treeData, treeParentData }: CheckboxParentProps){
  const { treeItems, loadItemsToStorage, handleAddItems } = useContext(TreeItemContext)

  const ref = useRef<HTMLInputElement | null>(null)

  const [expanded, setExpanded] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(treeItems[treeData.id] ?? false);

  const childrenValuesTree = Object.values(treeData.children)

  const hasChildren = childrenValuesTree.length > 0;

  const amountChildrenChecked = useMemo(() => childrenValuesTree.reduce((amountChildrenChecked, treeChildren) => {
    if(Boolean(treeItems[treeChildren.id]) === true) {
      amountChildrenChecked++
    }

    return amountChildrenChecked
  }, 0), [childrenValuesTree, treeItems])

  const isIndeterminate = hasChildren && !!amountChildrenChecked && amountChildrenChecked < childrenValuesTree.length

  function handleChangeExpand(_: React.SyntheticEvent, isExpanded: boolean) {
    if(hasChildren) {
      setExpanded(isExpanded);
    }
  }

  function handleChecked(event: React.ChangeEvent<HTMLInputElement>) {
    handleAddItems(treeData, event.target.checked, treeParentData.id)
    setChecked(event.target.checked)


    const position = ref.current?.getBoundingClientRect().top ?? 0
    const scrollTop = window.scrollY
   
    window.scroll({
      top: scrollTop + position - (window.innerHeight / 2),
      behavior: "smooth",
    })
  }

  function handleClick(event: React.MouseEvent) {
    event.stopPropagation();
  }

  useEffect(() => {
    loadItemsToStorage(treeData.id)
  }, [treeData.id])

  useEffect(() => {
    setChecked(treeItems[treeData.id] ?? false)
  }, [treeItems, treeData.id])

  return (
    <div>
      <Accordion 
        expanded={expanded}
        onChange={handleChangeExpand} 
        slotProps={{ transition: { unmountOnExit: true } }}
      >
        <AccordionSummary 
          expandIcon={hasChildren && <ExpandMore />} 
        >  
          <FormControlLabel
            label={<Typography variant='h6' style={{ color: 'white' }}>{treeData.name}</Typography>}
            onClick={handleClick}
            inputRef={ref}
            control={
              <Checkbox 
                checked={checked} 
                onChange={handleChecked} 
                indeterminate={isIndeterminate}
                color="info"
              />
            }
          />
        </AccordionSummary>

        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, gap: '1rem' }}>
          {childrenValuesTree.length > 0 && (
            <AccordionDetails>
              {childrenValuesTree.map((value) => {
                return (     
                  <TreeItem 
                    treeData={value} 
                    treeParentData={treeData}
                    key={value.id}
                  />
                )
              })}
            </AccordionDetails>
          )}
        </Box>
      </Accordion>
    </div>
  );
}
