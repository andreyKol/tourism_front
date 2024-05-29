import { styled } from '@mui/material';
import { mainTheme } from '../../../navigation/Router';

interface Props {
  id: string;
  value: string;
  type?: string;
  options?: any;
  pattern?: string;
  placeholder?: string;
  maxWidth?: string;
  maxHeight?: string;
  disabled?: boolean;
  fontSize?: string | number;
  onChange: (id: string, value: string) => void;
  alignText?: 'flex-start' | 'center' | 'flex-end';
  background?: string;
  border?: string;
  padding?: string;
  minHeight?: string;
  autoFocus?: boolean;
  autoComplete?: 'on' | 'off';
}

const InputWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #98a5bd;
  border-radius: 12px;
  box-sizing: border-box;
  transition: 0.3s;
  align-self: center;
  padding: 0 10px;
`;

const StyledInput = styled('input')(() => ({
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  background: 'transparent',
  ':-webkit-autofill': {
    WebkitTextFillColor: mainTheme.workFlowPages.mainContent.textColor,
    WebkitBoxShadow: `0 0 0px 180rem ${mainTheme.workFlowPages.mainContent.background} inset`,
  },
}));

export const CustomSearchInput = ({
  id,
  value,
  type = 'text',
  disabled = false,
  placeholder = '',
  maxWidth = '100%',
  maxHeight = '100px',
  background = 'transparent',
  border = '1px solid #98a5bd',
  padding = '0 8px',
  minHeight = '44px',
  autoFocus = false,
  autoComplete = 'off',
  onChange,
}: Props) => {
  return (
    <InputWrapper
      sx={{
        border: border,
        background: disabled ? '#EBF0F9' : background,
        minHeight: minHeight,
        height: maxHeight,
        maxHeight: maxHeight,
        maxWidth: maxWidth,
      }}
    >
      <img src={`${mainTheme.sprite}#searchGrey`} style={{ height: '20px', width: '20px' }} />
      <StyledInput
        id={id}
        type={type}
        value={value || ''}
        disabled={disabled}
        onChange={(event) => onChange(id, event.target.value)}
        placeholder={placeholder}
        style={{
          padding: padding,
          color: mainTheme.workFlowPages.mainContent.textColor,
        }}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
      />
    </InputWrapper>
  );
};
