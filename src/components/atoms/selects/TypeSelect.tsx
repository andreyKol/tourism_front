import { RowBox } from '../boxes/RowBox';
import { TextTypography } from '../typographies/TextTypography';
import { useTranslation } from 'react-i18next';
import { ClickAwayListener } from '@mui/material';
import { useState } from 'react';
import ListWrapper from '../list/ListWrapper';
import Item from '../list/Item';
import { mainTheme } from '../../../navigation/Router';

interface Props {
  handleChange: (id: string, newValue: {}) => void;
}

export const TypeSelect = ({ handleChange }: Props) => {
  const { t } = useTranslation();
  const options = [
    {
      label: 'deposit',
      request: {
        type: 'IN',
        transaction_type: 'DEFAULT',
      },
    },
    {
      label: 'send',
      request: {
        type: 'OUT',
        transaction_type: 'DEFAULT',
      },
    },
    {
      label: 'exchange',
      request: {
        type: '',
        transaction_type: 'SWAP',
      },
    },
  ];

  const [openSelect, setOpenSelect] = useState(false);
  const [selected, setSelected] = useState('');

  return (
    <ClickAwayListener onClickAway={() => setOpenSelect(false)}>
      <div
        style={{
          width: '100%',
          maxWidth: '160px',
        }}
      >
        <RowBox
          onClick={() => setOpenSelect((prev) => !prev)}
          sx={{
            height: '56px',
            borderRadius: '12px',
            border: '1px solid #98A5BD',
            padding: '10px',
            boxSizing: 'border-box',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <RowBox
            sx={{
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <TextTypography
              sx={{
                color: '#94A3B8',
                fontSize: '16px',
                fontWeight: '400',
              }}
            >
              {selected === '' ? t('type.allTypes') : t(`type.${selected}`)}
            </TextTypography>
          </RowBox>
          <img
            src={`${mainTheme.sprite}#arrowDown`}
            style={{
              maxHeight: '20px',
              maxWidth: '20px',
              transition: '0.3s',
              transform: openSelect ? 'rotate(-180deg)' : 'rotate(0deg)',
            }}
          />
        </RowBox>
        <div
          style={{
            position: 'relative',
          }}
        >
          <ListWrapper
            sx={{
              width: '200px',
              maxHeight: openSelect ? '260px' : '0px',
              '@media (max-width: 640px)': {
                right: '0px',
              },
            }}
          >
            <div>
              <Item
                sx={{
                  background: selected === '' ? mainTheme.workFlowPages.mainContent.background : 'transparent',
                }}
                onClick={() => {
                  setOpenSelect(false);
                  setSelected('');
                  handleChange('type', { type: '', transaction_type: '' });
                }}
              >
                <TextTypography
                  sx={{
                    color: '#94A3B8',
                    fontSize: '16px',
                    fontWeight: '400',
                  }}
                >
                  {t('type.allTypes')}
                </TextTypography>
              </Item>
              {options?.map((option) => (
                <Item
                  sx={{
                    background:
                      selected === option.label ? mainTheme.workFlowPages.mainContent.bgSelectedItem : 'transparent',
                  }}
                  key={option.label}
                  value={option.label}
                  onClick={() => {
                    setOpenSelect(false);
                    setSelected(option.label);
                    handleChange('type', option.request);
                  }}
                >
                  <RowBox
                    sx={{
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img
                      src={`${mainTheme.sprite}#${option.label}TypeSelect`}
                      style={{ height: '24px', width: '24px' }}
                    />
                    <TextTypography
                      key={option.label}
                      sx={{
                        color: mainTheme.workFlowPages.mainContent.textSelect,
                        fontWeight: '400',
                      }}
                    >
                      {t(`type.${option.label}`)}
                    </TextTypography>
                  </RowBox>
                  {selected === option.label ? (
                    <img src={`${mainTheme.sprite}#checkMark`} style={{ maxHeight: '20px', maxWidth: '20px' }} />
                  ) : null}
                </Item>
              ))}
              <div />
            </div>
          </ListWrapper>
        </div>
      </div>
    </ClickAwayListener>
  );
};
