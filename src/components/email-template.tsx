interface EmailTemplateProps {
  pin: string;
}

export default function EmailTemplate({ pin }: EmailTemplateProps) {
  return (
    <div>
      <h2>Your BetterQuiz Verification Code</h2>

      <p>
        Use the verification code below to sign in to your account. This code
        will expire in 10 minutes.
      </p>

      <p>
        <strong>Verification Code: {pin}</strong>
      </p>

      <p>Enter this code on the sign-in page to access your account.</p>

      <p>If you didn&apos;t request this code, you can safely ignore it.</p>
    </div>
  );
}
