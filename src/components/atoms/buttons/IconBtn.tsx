import { styled } from '@mui/material';
import { ReactNode } from 'react';

export const Btn = styled('button')`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: transparent;
  outline: 0;
  border: 0;
  margin: 0;
  border-radius: 0;
  padding: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  text-align: center;
  border-radius: 50%;
`;

interface Props {
  onClick?: (() => void) | ((e: React.SyntheticEvent<HTMLButtonElement>) => void);
  children: ReactNode;
  sx?: {};
  type?: 'button' | 'reset' | 'submit';
}

export const IconBtn = ({ onClick, children, sx, type = 'button' }: Props) => {
  return (
    <Btn sx={sx} type={type} onClick={onClick}>
      {children}
    </Btn>
  );
};
