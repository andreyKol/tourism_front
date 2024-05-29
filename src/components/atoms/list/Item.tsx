import { styled } from '@mui/material';
import { mainTheme } from '../../../navigation/Router';

const Item = styled('li')(() => ({
  display: 'flex',
  padding: '12px 16px',
  boxSizing: 'border-box',
  borderBottom: '1px solid mainTheme.workFlowPages.mainContent.borderSelect',
  background: 'transparent',
  gap: '10px',
  alignItems: 'center',
  cursor: 'pointer',
  ':hover': {
    background: mainTheme.workFlowPages.mainContent.bgItemHover,
  },
}));

export default Item;
