import { styled } from "@mui/material";
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

export const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  border: `none`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
  background: 'white',
  borderRadius: '8px'
}));

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    {...props}
  />
))(() => ({
  background: '#a2b7c9',
  borderRadius: '8px',
  marginTop: '1rem',

  '& .MuiAccordionSummary-expandIconWrapper': {
    color: 'white'
  }
}));

export const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: 0,
}));