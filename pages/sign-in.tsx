// pages/sign-in.tsx
import { useSignInModal } from "../components/layout/sign-in-modal";

const SignInPage = () => {
  const { SignInModal } = useSignInModal();

  return (
    <>
      <SignInModal />
      {/* You can add more content or styling to this page as needed */}
    </>
  );
};

export default SignInPage;
