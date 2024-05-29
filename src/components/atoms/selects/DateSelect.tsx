import { RowBox } from '../boxes/RowBox';
import { TextTypography } from '../typographies/TextTypography';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { ClickAwayListener } from '@mui/material';
import ListWrapper from '../list/ListWrapper';
import Item from '../list/Item';
import { mainTheme } from '../../../navigation/Router';
import { getToday, getYesterday, getMonth, fromISO } from '../../../utils/dates';

interface Props {
  datePicker: (s: boolean) => void;
  date: {
    [key: string]: string;
  };
  handleChange: (id: string, newValue: {}) => void;
}

export const DateSelect = ({ datePicker, date, handleChange }: Props) => {
  const { t } = useTranslation();

  const options = [
    {
      label: 'today',
    },
    {
      label: 'yesterday',
    },
    {
      label: 'month',
    },
    {
      label: 'chooseDate',
    },
  ];

  const [openSelect, setOpenSelect] = useState(false);
  const [selected, setSelected] = useState('');
  const [dateDisplay, setDateDisplay] = useState('');

  useEffect(() => {
    if (selected === 'chooseDate' && date.date_from && date.date_to) {
      const formattedStart = fromISO(date.date_from);
      const formattedEnd = fromISO(date.date_to);
      setDateDisplay(formattedStart === formattedEnd ? formattedStart : `${formattedStart}-${formattedEnd}`);
    }
  }, [selected, date]);

  return (
    <ClickAwayListener onClickAway={() => setOpenSelect(false)}>
      <div
        style={{
          width: '100%',
          maxWidth: '240px',
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
            {selected === ''
              ? t('components.allTime')
              : selected === 'chooseDate'
                ? dateDisplay
                : t(`components.${selected}`)}
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
              width: '240px',
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
                  handleChange('dates', { date_from: '', date_to: '' });
                }}
              >
                <TextTypography
                  sx={{
                    color: '#94A3B8',
                    fontSize: '16px',
                    fontWeight: '400',
                  }}
                >
                  {t('components.allTime')}
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
                    if (option.label === 'chooseDate') {
                      datePicker(true);
                      setSelected('chooseDate');
                    } else {
                      setSelected(option.label);
                      option.label === 'today'
                        ? handleChange('dates', getToday())
                        : option.label === 'yesterday'
                          ? handleChange('dates', getYesterday())
                          : handleChange('dates', getMonth());
                    }
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
                        fontWeight: '400',
                      }}
                    >
                      {t(`components.${option.label}`)}
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
