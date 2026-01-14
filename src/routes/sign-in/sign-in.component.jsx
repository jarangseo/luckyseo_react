import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        console.log("Checking redirect result...");
        const result = await getRedirectResult(auth);
        console.log("Redirect result:", result);
        
        if (result) {
          console.log("User signed in via redirect:", result.user);
          const userDocRef = await createUserDocumentFromAuth(result.user);
          console.log("User document reference:", userDocRef);
        } else {
          console.log("No redirect result found. This is normal if:");
          console.log("1. No redirect authentication was initiated");
          console.log("2. Redirect authentication hasn't completed yet");
          console.log("3. Redirect result was already processed");
        }
      } catch (error) {
        console.error("Error getting redirect result:", error);
      }
    };
    checkRedirectResult();
  }, []);

  const logGoogleUser = async () => {
    const result = await signInWithGooglePopup();
    console.log(result);
    const userDocRef = await createUserDocumentFromAuth(result.user);
    console.log(userDocRef);
  };

  // const logGoogleRedirectUser = async () => {
  //   const result = await signInWithGoogleRedirect();
  //   console.log(result);
  //   const userDocRef = await createUserDocumentFromAuth(result.user);
  //   console.log(userDocRef);
  // };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
      {/* <button onClick={logGoogleRedirectUser}>
        Sign in with Google Redirect
      </button> */}
      <button
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
      </button>
    </div>
  );
};

export default SignIn;
