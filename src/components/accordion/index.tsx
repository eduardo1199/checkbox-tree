import { ReactNode, useRef, useState } from "react";
import { Chevron, Container, Content, ContentWrapper, ButtonExpand, ContainerSummary } from "./styles";

interface AccordionProps extends React.ComponentProps<'div'> {
  children: ReactNode;
  checkBoxContent: ReactNode
  visibilityExpandIcon: boolean;
  expanded: boolean
  onChangeExpanded: (value: boolean) => void
}

export const Accordion = ({ checkBoxContent, onChangeExpanded, children , visibilityExpandIcon, expanded , ...props }: AccordionProps): JSX.Element => {
  const [height, setHeight] = useState<number>(0)
  const contentRef = useRef<HTMLDivElement | null>(null);

  function handleExpandToggle() {
    onChangeExpanded(!expanded)

    setHeight(expanded ? 0 : contentRef.current?.scrollHeight ?? 0 + window.outerHeight)
  }

  return (
    <Container {...props}>
      <ContainerSummary hasChildren={visibilityExpandIcon}>
        {checkBoxContent}
      
        <ButtonExpand 
          hasChildren={visibilityExpandIcon} 
          onClick={handleExpandToggle} 
          visible={visibilityExpandIcon}
          data-testid="accordion-button"
        >
          <Chevron isExpanded={expanded} />
        </ButtonExpand> 
   
      </ContainerSummary>
      <ContentWrapper style={{ maxHeight: `${height}px` }} ref={contentRef}>
        <Content>{children}</Content>
      </ContentWrapper>
    </Container>
  );
};
