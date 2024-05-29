import { useEffect, useState } from 'react';
import { RowBox } from '../boxes/RowBox';
import { TextTypography } from '../typographies/TextTypography';
import { useAppSelector } from '../../../store/store';
import { Icon } from '../icon/icon';
import { ClickAwayListener } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ListWrapper from '../list/ListWrapper';
import Item from '../list/Item';
import { useDebounce } from '../../../utils/useDebounce/useDebounce';
import { mainTheme } from '../../../navigation/Router';
import { CustomSearchInput } from '../inputs/CustomSearchInput';
import { ListContainer } from '../list/ListContainer';

interface Props {
  handleChange: (id: string, newValue: {}) => void;
}

export const CurrencySelectHistory = ({ handleChange }: Props) => {
  const { t } = useTranslation();
  const [openSelect, setOpenSelect] = useState(false);
  const [inputValues, setInputValues] = useState({
    searchValue: '',
  });
  const [selected, setSelected] = useState('');
  const allWallets = useAppSelector((state) => state.select.wallets);
  const [filteredWallets, setFilteredWallets] = useState(allWallets);

  const searchInput = document.getElementById('searchValue');

  const handleFilter = (newValue: string) => {
    setFilteredWallets(
      newValue === ''
        ? allWallets
        : allWallets.filter((wallet) => wallet.currency.toLowerCase().includes(newValue.toLowerCase()))
    );
  };

  const handleInputChange = (id: string, newValue: string) => {
    handleFilter(newValue);
    setInputValues((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  };

  const handleClear = useDebounce(() => {
    handleFilter('');
    setInputValues({
      searchValue: '',
    });
  }, 50);

  useEffect(() => {
    if (openSelect) {
      setTimeout(() => {
        searchInput?.focus();
      }, 300);
    }
  }, [openSelect]);

  return (
    <ClickAwayListener onClickAway={() => setOpenSelect(false)}>
      <div
        style={{
          width: '100%',
          maxWidth: '160px',
        }}
      >
        <RowBox
          onClick={() => {
            setOpenSelect((prev) => !prev);
            handleClear();
          }}
          sx={{
            maxWidth: '160px',
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
            {selected ? <Icon name={selected} width="32px" height="32px" /> : null}
            <TextTypography
              sx={{
                color: '#94A3B8',
                fontSize: '16px',
                fontWeight: selected ? '600' : '400',
              }}
            >
              {selected === '' ? t('components.allCurrencies') : selected}
            </TextTypography>
          </RowBox>
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
        <ListContainer>
          <ListWrapper
            sx={{
              width: '210px',
              maxHeight: openSelect ? '260px' : '0px',
              right: '0px',
            }}
          >
            <RowBox
              sx={{
                maxWidth: '180px',
                maxHeight: '44px',
                padding: '12px 10px',
                position: 'relative',
              }}
            >
              <CustomSearchInput
                id="searchValue"
                type="search"
                value={inputValues.searchValue}
                onChange={handleInputChange}
                placeholder={t('components.findToken')}
                maxWidth="180px"
                maxHeight="44px"
                padding="0 10px"
              />
            </RowBox>
            <div>
              <Item
                sx={{
                  background: selected === '' ? mainTheme.workFlowPages.mainContent.background : 'transparent',
                }}
                onClick={() => {
                  setOpenSelect(false);
                  setSelected('');
                  handleClear();
                  handleChange('token', { token: '', network: '' });
                }}
              >
                <TextTypography
                  sx={{
                    color: '#94A3B8',
                    fontSize: '16px',
                    fontWeight: '400',
                  }}
                >
                  {t('components.allCurrencies')}
                </TextTypography>
              </Item>
              {filteredWallets?.map((wallet: { currency: string; network?: string }) => (
                <Item
                  sx={{
                    background:
                      selected === wallet.currency ? mainTheme.workFlowPages.mainContent.bgSelectedItem : 'transparent',
                  }}
                  key={wallet.currency}
                  value={wallet.currency}
                  onClick={() => {
                    setOpenSelect(false);
                    setSelected(wallet.currency);
                    handleChange('token', {
                      token: wallet.currency === 'USDTTRC' || wallet.currency === 'USDTERC' ? 'USDT' : wallet.currency,
                      network: wallet?.network ? wallet?.network : '',
                    });
                    handleClear();
                  }}
                >
                  <RowBox
                    sx={{
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <Icon name={wallet.currency} width="32px" height="32px" />
                    <TextTypography
                      key={wallet.currency}
                      sx={{
                        color: mainTheme.workFlowPages.mainContent.textSelect,
                        fontWeight: '400',
                      }}
                    >
                      {wallet.currency}
                    </TextTypography>
                  </RowBox>
                  {selected === wallet.currency ? (
                    <img src={`${mainTheme.sprite}#checkMark`} style={{ maxHeight: '20px', maxWidth: '20px' }} />
                  ) : null}
                </Item>
              ))}
              <div />
            </div>
          </ListWrapper>
        </ListContainer>
      </div>
    </ClickAwayListener>
  );
};
