import { useEffect, useState } from "react";
import { ColumnBox } from "../../../../components/atoms/boxes/ColumnBox";
import { CustomInput } from "../../../../components/atoms/inputs/CustomInput";
import { TextTypography } from "../../../../components/atoms/typographies/TextTypography";
import { RowBox } from "../../../../components/atoms/boxes/RowBox";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ConfirmButton } from "../../../../components/atoms/buttons/ConfirmButton";
import { useSignUpMutation } from "../../../../api/auth/authApi";
import { setCookie } from "typescript-cookie";

const StyledLink = styled("a")(() => ({
  color: "#005fff",
  cursor: "pointer",
}));

export const SignUpFormView = () => {
  const navigate = useNavigate();

  const [signUp] = useSignUpMutation();

  const [inputValues, setInputValues] = useState({
    name: "",
    surName: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(
      !inputValues.email ||
        !inputValues.surName ||
        !inputValues.name ||
        inputValues.phone.length < 11 ||
        btoa(inputValues.password) !== btoa(inputValues.repeatPassword)
    );
  }, [inputValues]);

  const handleInputChange = (id: string, newValue: string) => {
    setInputValues((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  };

  return (
    <ColumnBox
      sx={{
        width: "100%",
        maxWidth: "400px",
        height: "max-content",
        background: "#fff",
        borderRadius: "24px",
        boxShadow: "0px 6px 16px -3px rgba(15, 23, 42, 0.05)",
        padding: "40px",
        boxSizing: "border-box",
        alignItems: "center",
        gap: "30px",
        "@media (max-width: 410px)": {
          maxWidth: "360px",
          padding: "30px 8px 24px",
        },
        "@media (max-height: 650px)": {
          paddingTop: "20px",
        },
      }}
    >
      <TextTypography
        sx={{
          fontSize: "24px",
          fontWeight: "700",
        }}
      >
        {"Регистрация"}
      </TextTypography>
      <ColumnBox
        sx={{
          gap: "20px",
        }}
      >
        <RowBox
          sx={{
            gap: "10px",
          }}
        >
          <CustomInput
            id="name"
            value={inputValues.name}
            placeholder="Имя"
            onChange={handleInputChange}
            maxHeight="50px"
          />
          <CustomInput
            id="surName"
            value={inputValues.surName}
            placeholder="Фамилия"
            onChange={handleInputChange}
            maxHeight="50px"
          />
        </RowBox>
        <CustomInput
          id="email"
          value={inputValues.email}
          placeholder="Email"
          onChange={handleInputChange}
          maxHeight="50px"
        />
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
        <CustomInput
          id="repeatPassword"
          value={inputValues.repeatPassword}
          placeholder="Повторите пароль"
          onChange={handleInputChange}
          maxHeight="50px"
        />
        <RowBox
          sx={{
            height: "max-content",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <TextTypography>{"Есть аккаунт?"}</TextTypography>
          <StyledLink onClick={() => navigate("/sign-in")}>
            {"Войти"}
          </StyledLink>
        </RowBox>
      </ColumnBox>
      <ConfirmButton
        disabled={
          !!Object.values(inputValues).filter((el) => !el).length || disabled
        }
        onClick={() => {
          signUp({
            name: inputValues.name,
            surname: inputValues.surName,
            email: inputValues.email,
            phone: inputValues.phone,
            password: inputValues.password,
          })
            .unwrap()
            .then((response) => {
              console.log("reg", response);
              setCookie("token", response?.data);
              navigate("/sign-in");
            })
            .catch((response) => {
              console.log(response);
            });
        }}
        sx={{
          fontSize: "24px",
        }}
      >
        {"Регистрация"}
      </ConfirmButton>
    </ColumnBox>
  );
};
