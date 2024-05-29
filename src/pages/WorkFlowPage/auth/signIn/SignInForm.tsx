import { SignFormWrapper } from "../../../../components/atoms/wrappers/SignFormWrapper";
import { SignInFormView } from "./SignInFormView";

type Props = {};
export const SignInForm = ({}: Props) => {
  return (
    <SignFormWrapper>
      <SignInFormView />
    </SignFormWrapper>
  );
};
