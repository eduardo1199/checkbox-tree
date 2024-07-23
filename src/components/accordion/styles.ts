import styled from "styled-components";

interface ChevronProps {
  isExpanded: boolean;
}

export const Chevron = styled.div<ChevronProps>`
  border-style: solid;
  border-width: 0.2rem 0.2rem 0 0;
  height: 0.5rem;
  width: 0.5rem;
  transition: all 0.25s ease-in-out;
  transform: ${props => props.isExpanded ? "rotate(135deg)": "rotate(-45deg)"};
  color: white;
  margin-left: auto;
`;

export const Container = styled.div`
  padding: 0 1.25rem;
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: -0.125rem;
  }
`;

interface ComponentSummary {
  hasChildren: boolean;
}

export const  ContainerSummary = styled.div<ComponentSummary>`
  border: none;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.25;
  background: #a2b7c9;
  filter: ${props => props.hasChildren ? '' : 'background brightness(0.85);'};
  border-radius: 1rem;

  margin-bottom: 1rem;
  padding: 0 0.5rem;

  &:focus {
    background: #a2b7c9;
    filter: brightness(0.95);
  }

  &:hover {
    background: #a2b7c9;
  }
`;

interface ButtonContainer extends ComponentSummary {
  visible: boolean;
}

export const ButtonExpand = styled.button<ButtonContainer>`
  border: none;
  cursor: ${props => props.hasChildren ? 'pointer' : 'default'};
  background: transparent;
  flex: 1;
  width: 100%;
  height: 60px;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};;
`

export const ContentWrapper = styled.div<{ maxHeight?: number }>`
  transition: max-height 0.5s ease-in-out;
  overflow: hidden;
`;

export const Content = styled.div`
  color: rgba(0, 0, 0, 0.75);
  line-height: 1.5;
`;
