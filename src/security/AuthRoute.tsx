import { jwtDecode } from "jwt-decode";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import { setUser } from "../store/redux/user/user.slice";
import { useAppDispatch } from "../store/store";

interface Props {
  children: ReactNode;
}

export const AuthRoute = ({ children: PageComponent }: Props) => {
  const currentUser = getCookie("token");
  const dispatch = useAppDispatch();

  if (!currentUser || currentUser === "undefined") {
    console.log(0, currentUser);
    return <Navigate to="/landing" />;
  }

  const user: {
    id: number;
    role: string;
  } = jwtDecode(currentUser as string);

  dispatch(
    setUser({
      id: user.id,
      role: 1,
    })
  );

  return <>{PageComponent}</>;
};
