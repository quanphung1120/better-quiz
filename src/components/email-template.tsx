import React from "react";

const EmailTemplate = ({
  magicLink = "https://example.com/auth/verify?token=abc123",
}) => {
  return (
    <div>
      <h2>Sign in to BetterQuiz</h2>

      <p>
        Click the link below to securely sign in to your account. This link will
        expire in 15 minutes.
      </p>

      <p>
        <a href={magicLink}>Sign In to BetterQuiz</a>
      </p>

      <p>
        If the link doesn't work, you can copy and paste this URL into your
        browser:
      </p>

      <p>{magicLink}</p>

      <p>If you didn't request this email, you can safely ignore it.</p>
    </div>
  );
};

export default EmailTemplate;
