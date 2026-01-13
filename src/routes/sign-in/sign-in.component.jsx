import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const signIn = () => {
  const logGoogleUser = async () => {
    const result = await signInWithGooglePopup();
    console.log(result);
  };
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  );
};

export default signIn;
