import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TreeData } from '../../App';
import { CheckboxParent } from '../CheckboxParent';

interface CheckBoxMarked {
  [id: string]: boolean;
}

interface CheckBoxTree {
  [id: string]: CheckBoxMarked;
}

interface CheckboxChildrenProps {
  data: TreeData
  onChangeCheckBox: (marker: boolean, id: string) => void;
  id: string;
  checked: boolean;
  initialDataTree: CheckBoxTree
}

export function CheckboxChildren({ data, onChangeCheckBox, id, checked, initialDataTree }: CheckboxChildrenProps){
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeCheckBox(event.target.checked, id)
  };

  const hasChildren = Object.values(data.children).length > 0;

  return (
    <>
      {hasChildren ? 
        <CheckboxParent 
          treeData={data} 
          initialValue={checked} 
          initialDataTree={initialDataTree}
        /> 
      : 
        <FormControlLabel
          label={data.name}
          control={
            <Checkbox 
              checked={checked ?? false} 
              onChange={handleChange} 
            />
          }
        />
      }
    </>
  );
}