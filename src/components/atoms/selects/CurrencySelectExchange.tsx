import { useEffect, useState } from 'react';
import { RowBox } from '../boxes/RowBox';
import { CustomSearchInput } from '../inputs/CustomSearchInput';
import { TextTypography } from '../typographies/TextTypography';
import { Icon } from '../icon/icon';
import { ClickAwayListener } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ListWrapper from '../list/ListWrapper';
import Item from '../list/Item';
import { useDebounce } from '../../../utils/useDebounce/useDebounce';
import { mainTheme } from '../../../navigation/Router';
import { WalletChange } from '../../../models/walletTypes';

interface Props {
  setSelected: (data: { token_from: string; network_from: string }) => void;
  wallets: WalletChange[];
}

export const CurrencySelectExchange = ({ setSelected, wallets }: Props) => {
  const { t } = useTranslation();
  const [openSelect, setOpenSelect] = useState(false);
  const [inputValues, setInputValues] = useState({
    searchValue: '',
  });
  const [filteredWallets, setFilteredWallets] = useState(wallets);
  const [selectedWallet, setSelectedWallet] = useState(filteredWallets[0]);
  const searchInput = document.getElementById('searchValue');

  useEffect(() => {
    if (openSelect) {
      setTimeout(() => {
        searchInput?.focus();
      }, 300);
    }
  }, [openSelect]);

  useEffect(() => {
    setSelectedWallet(wallets[0]);
    setSelected(selectedWallet);
  }, [wallets, selectedWallet]);

  const handleFilter = (newValue: string) => {
    setFilteredWallets(
      newValue === ''
        ? wallets
        : wallets.filter((wallet: { token_from: string }) =>
            wallet.token_from.toLowerCase().includes(newValue.toLowerCase())
          )
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
    setSelected(selectedWallet);
  }, []);

  return (
    <ClickAwayListener
      onClickAway={() => {
        setOpenSelect(false);
        handleClear();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '140px',
        }}
      >
        <RowBox
          onClick={() => {
            setOpenSelect((prev) => !prev);
            handleClear();
          }}
          sx={{
            height: '64px',
            borderRadius: '12px',
            padding: '10px',
            background: mainTheme.workFlowPages.mainContent.bgSelect,
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
            <Icon name={selectedWallet?.token_from} width="32px" height="32px" />
            <TextTypography
              sx={{
                color: mainTheme.workFlowPages.mainContent.textSelect,
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              {selectedWallet?.token_from}
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
        <div
          style={{
            position: 'relative',
          }}
        >
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
              />
            </RowBox>
            <div>
              {filteredWallets?.map((wallet: { token_from: string; network_from: string }) => (
                <Item
                  sx={{
                    background:
                      selectedWallet.token_from === wallet.token_from
                        ? mainTheme.workFlowPages.mainContent.bgSelectedItem
                        : 'transparent',
                  }}
                  key={wallet.network_from}
                  value={wallet.token_from}
                  onClick={() => {
                    setOpenSelect(false);
                    setSelectedWallet({ token_from: wallet.token_from, network_from: wallet.network_from });
                    setSelected({ token_from: wallet.token_from, network_from: wallet.network_from });
                    handleClear();
                  }}
                >
                  <RowBox
                    sx={{
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <Icon name={wallet.token_from} width="32px" height="32px" />
                    <TextTypography
                      key={wallet.network_from}
                      sx={{
                        color: mainTheme.workFlowPages.mainContent.textSelect,
                        fontWeight: '400',
                      }}
                    >
                      {wallet.token_from}
                    </TextTypography>
                  </RowBox>
                  {selectedWallet.token_from === wallet.token_from ? (
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
