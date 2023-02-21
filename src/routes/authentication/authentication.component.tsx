import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import {
  AuthenticationContainer,
  SignInSignUpContainer,
} from "./authentication.styles";

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInSignUpContainer>
        <SignInForm />
      </SignInSignUpContainer>
      <SignInSignUpContainer>
        <SignUpForm />
      </SignInSignUpContainer>
    </AuthenticationContainer>
  );
};

export default Authentication;
