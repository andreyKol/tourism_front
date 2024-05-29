import { ReactNode } from 'react';
import { mainTheme } from '../../../navigation/Router';

interface Props {
  onClick?: () => void;
  children: string | ReactNode;
  disabled?: boolean;
  sx?: {};
}
export const ConfirmButton = ({ onClick, children, sx, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '280px',
        padding: '16px 30px',
        borderRadius: '28px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: disabled ? 'gray' : mainTheme.workFlowPages.mainContent.buttons.default.bg,
        color: mainTheme.workFlowPages.mainContent.buttons.default.text,
        ...sx,
      }}
    >
      {children}
    </button>
  );
};
