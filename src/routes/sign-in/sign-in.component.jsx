import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const signIn = () => {
  const logGoogleUser = async () => {
    const result = await signInWithGooglePopup();
    console.log(result);
    const userDocRef = await createUserDocumentFromAuth(result.user);
    console.log(userDocRef);
  };
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  );
};

export default signIn;
