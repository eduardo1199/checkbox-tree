import styled from 'styled-components';

interface CheckboxContainerProps {
  checked: boolean;
}

interface TextProps extends CheckboxContainerProps {}
interface StyledCheckboxProps extends CheckboxContainerProps {}

export const CheckboxContainer = styled.div<CheckboxContainerProps>`
  display: flex;
  align-items: center;

  gap: 1rem
`;

export const HiddenCheckbox = styled.input.attrs({type: 'checkbox'})`
  overflow: hidden;
  white-space: nowrap;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
`;

export const Text = styled.label<TextProps>`
  color: ${props => props.checked ? '#d1f08a' : '#555'};
  cursor: pointer;
`;

export const StyledCheckbox = styled.label<StyledCheckboxProps>`
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background: ${props => props.checked ? '#d1f08a' : 'white'};
  margin-right: 6px;
  display: flex;
  justify-content: center;
  border-color: #555;
  align-items: center;
`;

export const StyledCheckboxIndetermination = styled.label`
  width: 23px;
  height: 5px;
  background: #555;
  margin-right: 6px;
  display: flex;
  justify-content: center;
  border-color: #555;
  align-items: center;
`;
