import { RowBox } from '../boxes/RowBox';
import { TextTypography } from '../typographies/TextTypography';
import { useTranslation } from 'react-i18next';
import { ClickAwayListener } from '@mui/material';
import { useState } from 'react';
import ListWrapper from '../list/ListWrapper';
import Item from '../list/Item';
import { mainTheme } from '../../../navigation/Router';

interface Props {
  handleChange: (bankBane: string, sub: string) => void;
}

export const BankSelect = ({ handleChange }: Props) => {
  const { t } = useTranslation();

  const options = [
    {
      label: 'sber',
      sub_token: 'SBERRUB',
    },
    {
      label: 'tinkoff',
      sub_token: 'CARDRUB',
    },
    {
      label: 'alfa',
      sub_token: 'CARDRUB',
    },
    {
      label: 'other',
      sub_token: 'CARDRUB',
    },
  ];

  const [openSelect, setOpenSelect] = useState(false);
  const [selected, setSelected] = useState('');

  return (
    <ClickAwayListener onClickAway={() => setOpenSelect(false)}>
      <div
        style={{
          width: '100%',
          maxWidth: '110px',
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
            width: '110px',
          }}
        >
          {selected === '' ? (
            <TextTypography
              sx={{
                color: '#94A3B8',
                fontSize: '16px',
                fontWeight: '400',
              }}
            >
              {t('bank.bank')}
            </TextTypography>
          ) : null}
          {selected === '' ? null : (
            <img src={`${mainTheme.sprite}#${selected}`} style={{ height: '32px', width: '32px' }} />
          )}
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
              width: '170px',
              maxHeight: openSelect ? '260px' : '0px',
            }}
          >
            <div>
              {options?.map((option) => (
                <Item
                  sx={{
                    padding: '12px 10px',
                    background:
                      selected === option.label ? mainTheme.workFlowPages.mainContent.bgSelectedItem : 'transparent',
                  }}
                  key={option.label}
                  value={option.label}
                  onClick={() => {
                    setOpenSelect(false);
                    setSelected(option.label);
                    handleChange(option.label, option.sub_token);
                  }}
                >
                  <RowBox
                    sx={{
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img src={`${mainTheme.sprite}#${option.label}`} style={{ height: '32px', width: '32px' }} />
                    <TextTypography
                      key={option.label}
                      sx={{
                        color: mainTheme.workFlowPages.mainContent.textSelect,
                        fontSize: '16px',
                        fontWeight: '400',
                      }}
                    >
                      {t(`bank.${option.label}`)}
                    </TextTypography>
                  </RowBox>
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
