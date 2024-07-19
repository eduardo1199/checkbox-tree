import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TreeData } from '../../App';
import { CheckboxParent } from '../CheckboxParent';

interface CheckboxChildrenProps {
  data: TreeData
  onChangeCheckBox: (marker: boolean, id: string) => void;
  id: string;
  checked: boolean;
}

export function CheckboxChildren({ data, onChangeCheckBox, id, checked }: CheckboxChildrenProps){
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