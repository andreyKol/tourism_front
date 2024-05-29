import { SignFormWrapper } from '../../../../components/atoms/wrappers/SignFormWrapper';
import { SignUpFormView } from './SignUpFormView';

type Props = {};
export const SignUpForm = ({}: Props) => {
  return (
    <SignFormWrapper>
      <SignUpFormView />
    </SignFormWrapper>
  );
};
