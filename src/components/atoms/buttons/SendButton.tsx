import { mainTheme } from '../../../navigation/Router';
import { RippleButton } from './RippleButton';

interface Props {
  onClick: () => void;
  children: string;
  disabled?: boolean;
  sx?: {};
  isBlocked?: boolean;
}
export const SendButton = ({ onClick, children, sx, disabled = false, isBlocked = false }: Props) => {
  return (
    <RippleButton
      onClick={onClick}
      disabled={disabled}
      sx={{
        maxWidth: '326px',
        maxHeight: '56px',
        padding: '16px 30px',
        borderRadius: '28px',
        fontWeight: '700',
        fontSize: '20px',
        lineHeight: '28px',
        background: mainTheme.workFlowPages.mainContent.buttons.default.bg,
        color: mainTheme.workFlowPages.mainContent.buttons.default.text,
        '&:hover': {
          background: mainTheme.workFlowPages.mainContent.buttons.hover.bg,
          color: mainTheme.workFlowPages.mainContent.buttons.hover.text,
        },
        '&:disabled': {
          background: isBlocked
            ? mainTheme.workFlowPages.mainContent.buttons.blocked.bg
            : mainTheme.workFlowPages.mainContent.buttons.disabled.bg,
          color: isBlocked
            ? mainTheme.workFlowPages.mainContent.buttons.blocked.text
            : mainTheme.workFlowPages.mainContent.buttons.disabled.text,
        },
        ...sx,
      }}
    >
      {children}
    </RippleButton>
  );
};
