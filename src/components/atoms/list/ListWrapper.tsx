import { styled } from '@mui/material';
import { mainTheme } from '../../../navigation/Router';

const ListWrapper = styled('ul')(() => ({
  padding: '0',
  margin: '0',
  width: '240px',
  maxHeight: '260px',
  position: 'absolute',
  top: '12px',
  overflowX: 'hidden',
  overflowY: 'auto',
  zIndex: '2',
  background: mainTheme.workFlowPages.mainContent.background,
  borderRadius: '12px',
  transition: '0.3s ease-in-out',
  boxShadow: mainTheme.workFlowPages.mainContent.boxShadow,
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'auto',
  scrollbarHeight: '10px',
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#CAD1E2',
    borderRadius: '8px',
    position: 'absolute',
    width: '20px',
    height: '20px',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '6px 8px 8px 6px',
  },
}));

export default ListWrapper;
