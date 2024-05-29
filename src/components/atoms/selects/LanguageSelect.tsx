import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { RowBox } from '../boxes/RowBox';
import { TextTypography } from '../typographies/TextTypography';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { mainTheme } from '../../../navigation/Router';
import i18next from 'i18next';

export const LanguageSelect = () => {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState(i18next.language ? i18next.language.split('-')[0] : 'ru');
  const languages = ['ru', 'en'];

  const handleChange = (e: SelectChangeEvent) => {
    setSelected(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Select
      labelId="demo-select-small-label"
      id="demo-select-small"
      displayEmpty
      value={selected}
      renderValue={() => (
        <RowBox
          sx={{
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
            {t(`languages.${selected}`)}
          </TextTypography>
          <img src={`${mainTheme.sprite}#arrowDown`} style={{ maxHeight: '20px', maxWidth: '20px' }} />
        </RowBox>
      )}
      onChange={handleChange}
      sx={{
        fontSize: '18px',
        fontWeight: 700,
        color: 'rgba(71, 83, 105, 1)',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '12px !important',
        '.MuiSelect-select': {
          background: `${mainTheme.workFlowPages.mainContent.background} !important`,
          maxWidth: '160px',
          minWidth: '160px',
          borderRadius: '12px !important',
          width: '160px',
          border: '1px solid #98A5BD !important',
          '&:hover': {
            border: '1px solid #98A5BD !important',
          },
          '@media (max-width: 350px)': {
            maxWidth: '140px',
            minWidth: '140px',
            width: '140px',
          },
        },
        '&::before': {
          display: 'none',
        },
        '&::after': {
          display: 'none',
        },
        legend: {
          display: 'none',
        },
        fieldset: {
          border: 'none',
        },
        '& .MuiList-padding': {
          paddingTop: '0px !important',
          paddingBottom: '0px',
        },
      }}
      inputProps={{
        sx: {
          background: '#EBF0F9',
          '&:focus': {
            background: '#EBF0F9',
          },
        },
        MenuProps: {
          MenuListProps: {
            sx: {
              padding: '0px',
              display: 'flex',
              flexDirection: 'column',
            },
          },
          PaperProps: {
            sx: {
              backgroundColor: mainTheme.workFlowPages.mainContent.background,
              outline: 'none',
              padding: '0px',
              borderRadius: '12px',
              border: 'none',
              height: 'max-content',
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              msOverflowStyle: 'none',
              scrollbarWidth: 'auto',
              scrollbarHeight: '10px',
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#CAD1E2',
                borderRadius: '12px',
                position: 'absolute',
                width: '20px',
                height: '20px',
              },
              '&::-webkit-scrollbar-track': {
                borderRadius: '6px 8px 8px 6px',
              },
              '& .MuiMenuItem-root.Mui-selected': {
                backgroundColor: `${mainTheme.workFlowPages.mainContent.bgSelectedItem} !important`,
              },
            },
          },
        },
      }}
    >
      {languages?.map((language: string) => (
        <MenuItem
          sx={{
            padding: '9px 10px',
            height: '56px',
            background: mainTheme.workFlowPages.mainContent.background,
            justifyContent: 'space-between',
            ':hover': {
              background: mainTheme.workFlowPages.mainContent.bgItemHover,
            },
          }}
          key={language}
          value={language}
        >
          <TextTypography
            sx={{
              color: '#475369',
              fontWeight: '400',
            }}
          >
            {t(`languages.${language}`)}
          </TextTypography>
          {language === selected && (
            <img src={`${mainTheme.sprite}#checkMark`} alt="check" style={{ maxHeight: '20px', maxWidth: '20px' }} />
          )}
        </MenuItem>
      ))}
    </Select>
  );
};
