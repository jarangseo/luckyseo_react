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
      console.log("auth", auth);
      const result = await getRedirectResult(auth);
      console.log(result);
      if (result) {
        const userDocRef = await createUserDocumentFromAuth(result.user);
        console.log(userDocRef);
      }
    };
    checkRedirectResult();
  }, []);

  // const logGoogleUser = async () => {
  //   const result = await signInWithGooglePopup();
  //   console.log(result);
  //   const userDocRef = await createUserDocumentFromAuth(result.user);
  //   console.log(userDocRef);
  // };

  // const logGoogleRedirectUser = async () => {
  //   const result = await signInWithGoogleRedirect();
  //   console.log(result);
  //   const userDocRef = await createUserDocumentFromAuth(result.user);
  //   console.log(userDocRef);
  // };

  return (
    <div className="authentication-container">
      <h1>Sign In Page</h1>
      {/* <button onClick={logGoogleUser}>Sign in with Google</button> */}
      {/* <button onClick={logGoogleRedirectUser}>
        Sign in with Google Redirect
      </button> */}
      {/* <Button
        onClick={async () => {
          try {
            console.log("Initiating Google redirect sign-in...");
            await signInWithGoogleRedirect();
            // Note: signInWithRedirect will redirect the user away from this page
            // The result will be available when the user returns via getRedirectResult
          } catch (error) {
            console.error("Error initiating redirect:", error);
          }
        }}
      >
        Sign in with Google Redirect
      </Button> */}
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
