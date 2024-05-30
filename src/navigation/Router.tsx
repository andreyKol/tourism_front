import { memo, ReactNode, useCallback, useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { MainForm } from "../pages/WorkFlowPage/Main/MainForm";
import { ChatForm } from "../pages/WorkFlowPage/Chat/ChatForm";
import { AuthRoute } from "../security/AuthRoute";
import lightTheme from "../styles/themes/light";
import { SignInForm } from "../pages/WorkFlowPage/auth/signIn/SignInForm";
import { SignUpForm } from "../pages/WorkFlowPage/auth/signUp/SignUpForm";
import { ProfileForm } from "../pages/WorkFlowPage/profile/ProfileForm";
import { Landing } from "../pages/landing/Landing";
import { Country } from "../components/molecules/Country/Country";

export let mainTheme = lightTheme;

const AnimatedRoutes = memo(() => {
  const location = useLocation();

  const getElement = useCallback(
    (children: ReactNode) => <AuthRoute>{children}</AuthRoute>,
    []
  );

  const getForm = useCallback((children: ReactNode) => children, []);

  const __THEME__ = "light";

  useEffect(() => {
    if (!localStorage.getItem("theme")) localStorage.setItem("theme", "light");
  }, []);

  switch (__THEME__) {
    case "light":
      mainTheme = lightTheme;
      break;
    default:
      mainTheme = lightTheme;
      break;
  }

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={getElement(<MainForm />)} />
      <Route path="/chat/:id" element={getElement(<ChatForm />)} />
      <Route path="/countries/:id" element={<Country />} />
      <Route path="/profile" element={getElement(<ProfileForm />)} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/sign-in" element={getForm(<SignInForm />)} />
      <Route path="/sign-up" element={getForm(<SignUpForm />)} />
      <Route path="*" element={<Navigate to="/" />} key="*" />
    </Routes>
  );
});

export const Router = memo(() => (
  <BrowserRouter basename="/">
    <AnimatedRoutes />
  </BrowserRouter>
));

Router.displayName = "Router";
