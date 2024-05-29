import { styled } from "@mui/material";
import bg from "../../../assets/bg-auth.webp";

export const SignFormWrapper = styled("div")(() => ({
  display: "flex",
  width: "100vw",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "lightgray",
  backgroundImage: `url(${bg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));
