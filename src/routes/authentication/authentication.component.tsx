import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import "./authentication.styles.scss";

const Authentication = () => {
  useEffect(() => {
    const checkRedirectResult = async () => {
      const result = await getRedirectResult(auth);
      if (result) {
        await createUserDocumentFromAuth(result.user);
      }
    };
    checkRedirectResult();
  }, []);

  return (
    <div className="authentication-container">
      <h1>Sign In Page</h1>
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
