import { styled } from '@mui/material';

export const HeaderWrapper = styled('div')`
  position: sticky;
  top: 0;
  width: 100%;
  min-height: 60px;
  height: 60px;
  padding: 0 20px;
  padding-right: 60px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  @media (max-width: 410px) {
    padding: 0 16px;
    padding-right: 56px;
  }
`;
