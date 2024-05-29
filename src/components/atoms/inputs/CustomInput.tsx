import { styled } from '@mui/material';
import { ReactNode } from 'react';
import { mainTheme } from '../../../navigation/Router';
import { ColumnBox } from '../boxes/ColumnBox';
import { TextTypography } from '../typographies/TextTypography';
import { useTranslation } from 'react-i18next';

interface Props {
  id: string;
  value: string;
  type?: string;
  placeholder?: string;
  maxWidth?: string;
  maxHeight?: string;
  disabled?: boolean;
  onChange: (id: string | any, value: string) => void;
  background?: string;
  border?: string;
  padding?: string;
  children?: ReactNode;
  error?: string;
  tokenAmount?: string;
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
`;
const StyledInput = styled('input')(() => ({
  width: '100%',
  background: 'transparent',
  ':-webkit-autofill': {
    WebkitBoxShadow: `0 0 0px 180rem ${mainTheme.workFlowPages.mainContent.background} inset`,
  },
}));

export const CustomInput = ({
  id,
  value,
  type = 'text',
  disabled = false,
  placeholder = '',
  maxWidth = '100%',
  maxHeight = '100px',
  background = 'transparent',
  border = '1px solid #98a5bd',
  padding = '15px',
  children = null,
  error = '',
  tokenAmount = '',
  autoComplete = 'off',
  onChange,
}: Props) => {
  const { t } = useTranslation();
  const shouldShowTokenAmount =
    (id === 'send' ||
      id === 'sendValue' ||
      id === 'sumWalletAddress' ||
      id === 'sumCardNumber' ||
      id === 'sumRecipientId' ||
      id === 'sumExwalletId') &&
    error !== 'maxSymbols';

  const getErrorText = () => {
    if (!shouldShowTokenAmount) {
      return t(`error.${error}`);
    } else {
      return `${t(`error.${error}`)} ${tokenAmount}`;
    }
  };

  return (
    <ColumnBox
      sx={{
        maxHeight: !!error ? `calc(${maxHeight} + 16px)` : maxHeight,
        minHeight: !!error ? `calc(${maxHeight} + 16px)` : maxHeight,
        width: '100%',
        maxWidth,
      }}
    >
      <InputWrapper
        sx={{
          border:
            !!error && id !== 'send'
              ? '1.3px solid #DC2626'
              : disabled
                ? `1px solid ${mainTheme.workFlowPages.mainContent.inputBorderDisabled}`
                : border,
          background: background,
          maxHeight: maxHeight,
          maxWidth: maxWidth,
        }}
      >
        <StyledInput
          id={id}
          type={type}
          value={value || ''}
          disabled={disabled}
          min={0}
          onChange={(event) => onChange(id, event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          sx={{
            padding: padding,
          }}
        />
        {children ? children : null}
      </InputWrapper>
      <ColumnBox
        sx={{
          transition: '0.5s',
          minHeight: !!error ? '16px' : 0,
          height: !!error ? '16px' : 0,
          overflow: 'hidden',
          paddingLeft: '10px',
        }}
      >
        <TextTypography sx={{ fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: '#E1291D' }}>
          {error ? getErrorText() : ''}
        </TextTypography>
      </ColumnBox>
    </ColumnBox>
  );
};
