import { ReactNode } from 'react';
import { RowBox } from '../boxes/RowBox';

interface Props {
  children: ReactNode;
}

export const WorkFlowWrapper = ({ children }: Props) => (
  <RowBox
    sx={{
      alignItems: 'center',
      justifyContent: 'flex-start',
      maxWidth: '1200px',
      gap: '34px',
    }}
  >
    {children}
  </RowBox>
);
