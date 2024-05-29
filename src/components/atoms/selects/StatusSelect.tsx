import { RowBox } from '../boxes/RowBox';
import { TextTypography } from '../typographies/TextTypography';
import { useTranslation } from 'react-i18next';
import { ClickAwayListener } from '@mui/material';
import { useState } from 'react';
import ListWrapper from '../list/ListWrapper';
import Item from '../list/Item';
import { mainTheme } from '../../../navigation/Router';

interface Props {
  handleChange: (id: string, newValue: string) => void;
}

export const StatusSelect = ({ handleChange }: Props) => {
  const { t } = useTranslation();

  const options = [
    {
      label: 'success',
    },
    {
      label: 'pending',
    },
    {
      label: 'error',
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
          <TextTypography
            sx={{
              color: '#94A3B8',
              fontSize: '16px',
              fontWeight: '400',
            }}
          >
            {selected === '' ? t('components.allStatuses') : t(`statuses.${selected}`)}
          </TextTypography>
          <img
            src={`${mainTheme.sprite}#arrowDown`}
            style={{
              maxHeight: '20px',
              maxWidth: '20px',
              transition: '0.4s',
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
              width: '160px',
              maxHeight: openSelect ? '260px' : '0px',
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
                  handleChange('status', '');
                }}
              >
                <TextTypography
                  sx={{
                    color: '#94A3B8',
                    fontSize: '16px',
                    fontWeight: '400',
                  }}
                >
                  {t('components.allStatuses')}
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
                    handleChange('status', option.label.toUpperCase());
                  }}
                >
                  <RowBox
                    sx={{
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <TextTypography
                      key={option.label}
                      sx={{
                        color: mainTheme.workFlowPages.mainContent.textSelect,
                        fontSize: '16px',
                        fontWeight: '400',
                      }}
                    >
                      {t(`statuses.${option.label}`)}
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
