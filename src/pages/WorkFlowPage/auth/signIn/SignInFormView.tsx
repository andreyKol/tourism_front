import { useState } from 'react';
import { ColumnBox } from '../../../../components/atoms/boxes/ColumnBox';
import { CustomInput } from '../../../../components/atoms/inputs/CustomInput';
import { TextTypography } from '../../../../components/atoms/typographies/TextTypography';
import { RowBox } from '../../../../components/atoms/boxes/RowBox';
import { styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ConfirmButton } from '../../../../components/atoms/buttons/ConfirmButton';
import { setCookie } from 'typescript-cookie';
import { useSignInMutation } from '../../../../api/auth/authApi';

const StyledLink = styled('a')(() => ({
  color: '#005fff',
  cursor: 'pointer',
}));

export const SignInFormView = () => {
  const navigate = useNavigate();

  const [signIn] = useSignInMutation();

  const [inputValues, setInputValues] = useState({
    phone: '',
    password: '',
  });

  const handleInputChange = (id: string, newValue: string) => {
    setInputValues((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  };

  return (
    <ColumnBox
      sx={{
        width: '100%',
        maxWidth: '400px',
        maxHeight: '470px',
        background: '#fff',
        borderRadius: '24px',
        boxShadow: '0px 6px 16px -3px rgba(15, 23, 42, 0.05)',
        padding: '40px',
        boxSizing: 'border-box',
        alignItems: 'center',
        gap: '60px',
        '@media (max-width: 410px)': {
          maxWidth: '360px',
          padding: '30px 8px 24px',
        },
        '@media (max-height: 650px)': {
          paddingTop: '20px',
        },
      }}
    >
      <TextTypography
        sx={{
          fontSize: '24px',
          fontWeight: '700',
        }}
      >
        {'Вход'}
      </TextTypography>

      <ColumnBox
        sx={{
          gap: '20px',
        }}
      >
        <CustomInput
          id="phone"
          value={inputValues.phone}
          placeholder="Номер телефона"
          onChange={handleInputChange}
          maxHeight="50px"
        />
        <CustomInput
          id="password"
          value={inputValues.password}
          placeholder="Пароль"
          onChange={handleInputChange}
          maxHeight="50px"
        />
        <RowBox
          sx={{
            height: 'max-content',
            justifyContent: 'center',
            gap: '5px',
          }}
        >
          <TextTypography>{'Нет аккаунта?'}</TextTypography>
          <StyledLink onClick={() => navigate('/sign-up')}>{'Регистрация'}</StyledLink>
        </RowBox>
      </ColumnBox>
      <ConfirmButton
        disabled={inputValues.phone === '' || inputValues.password === ''}
        onClick={() => {
          signIn({
            phone: inputValues.phone,
            password: inputValues.password,
          })
            .unwrap()
            .then((response) => {
              setCookie('token', response?.token);
              navigate('/');
            })
            .catch((response) => {
              console.log(response);
            });
        }}
      >
        <TextTypography
          sx={{
            fontSize: '24px',
            color: '#fff',
          }}
        >
          {'Войти'}
        </TextTypography>
      </ConfirmButton>
    </ColumnBox>
  );
};
