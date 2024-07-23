import React, { useRef } from 'react';
import 
{ 
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  StyledCheckboxIndetermination,
  Text
} from './styles';

interface CheckboxProps extends React.ComponentProps<'input'>{
  children: string 
  isChecked: boolean
  onCheckElement: (checked: boolean, position: number) => void
  isIndeterminate: boolean
}

export function Checkbox({ children, isChecked, onCheckElement, isIndeterminate }: CheckboxProps) {
  const ref = useRef<HTMLInputElement | null>(null)

  function handleCheckboxChange(){
    const position = ref.current?.getBoundingClientRect().top ?? 0

    onCheckElement(!isChecked, position)
  }

  return (
    <CheckboxContainer checked={isChecked ?? false} onClick={handleCheckboxChange} data-testid="check-box">
      <HiddenCheckbox onChange={handleCheckboxChange} checked={isChecked} ref={ref} />
      {isIndeterminate ? 
        <StyledCheckboxIndetermination 
          data-testid="check-box-indeterminate" 
        /> : 
        <StyledCheckbox 
          checked={isChecked ?? false} 
        />
      }
      <Text checked={isChecked ?? false}>{children}</Text>
    </CheckboxContainer>
);
}
