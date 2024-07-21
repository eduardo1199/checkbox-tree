import {  Box, Checkbox, FormControlLabel, Typography } from '@mui/material';


import { TreeData } from '../../App';
import React, {  useContext, useEffect, useMemo, useState } from 'react';
import { TreeItemContext } from '../../Context/TreeItemContext';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary } from './styles';

interface CheckboxParentProps {
  treeData: TreeData
}

export function TreeItem({ treeData }: CheckboxParentProps){
  const { treeItems, loadItemsToStorage, handleAddItems } = useContext(TreeItemContext)

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

  const handleChangeExpand = (_: React.SyntheticEvent, isExpanded: boolean) => {
    if(hasChildren) {
      setExpanded(isExpanded);
    }
  };

  function handleChecked(event: React.ChangeEvent<HTMLInputElement>) {
    handleAddItems(treeData, event.target.checked)
    setChecked(event.target.checked)
  }

  useEffect(() => {
    loadItemsToStorage(treeData.id)
  }, [treeData.id])

  useEffect(() => {
    setChecked(treeItems[treeData.id] ?? false)
  }, [treeItems, treeData.id])

  const handleClick = (event: any) => {
    event.stopPropagation();
  };

  return (
    <div>
      <Accordion 
        expanded={expanded}
        onChange={handleChangeExpand} 
        slotProps={{ transition: { unmountOnExit: true } }}
      >
        <AccordionSummary 
          expandIcon={hasChildren && <ExpandMore />} 
          onClick={handleClick}
        >
          <div>
            <FormControlLabel
              label={<Typography variant='h6' style={{ color: 'white' }}>{treeData.name}</Typography>}
              onClick={handleClick}
              control={
                <Checkbox 
                  checked={checked} 
                  onChange={handleChecked} 
                  indeterminate={hasChildren && !!amountChildrenChecked && amountChildrenChecked < childrenValuesTree.length}
                  color="primary"
                />
              }
            />
          </div>
        </AccordionSummary>

        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, gap: '1rem' }}>
          {childrenValuesTree.length > 0 && (
            <AccordionDetails>
              {childrenValuesTree.map((value) => {
                return (    
                  <TreeItem 
                    treeData={value} 
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
