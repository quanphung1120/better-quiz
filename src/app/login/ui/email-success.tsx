"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Mail, ArrowLeft, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface EmailSuccessProps {
  email: string;
  onBack: () => void;
  sendOtp: (email: string) => Promise<void>;
}

export function EmailSuccessForm({
  email,
  onBack,
  sendOtp,
}: EmailSuccessProps) {
  const router = useRouter();
  const countdownTime = 120;

  const [canResend, setCanResend] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(countdownTime);
  const [otpValue, setOtpValue] = useState<string>("");
  const [isValidating, setIsValidating] = useState<boolean>(false);

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown, canResend]);

  useEffect(() => {
    const verifyOtp = async () => {
      if (otpValue.length === 6) {
        setIsValidating(true);
        const { error } = await authClient.signIn.emailOtp({
          email: email,
          otp: otpValue,
        });

        if (error) {
          toast.error("Failed to verify OTP. Please try again.");
          setIsValidating(false);
        } else {
          router.push("/dashboard");
          toast.success("OTP verified successfully! Redirecting...");
        }
      }
    };

    verifyOtp();
  }, [otpValue, email, router]);

  const handleResendEmail = () => {
    sendOtp(email);
    setCanResend(false);
    setCountdown(countdownTime);
    setOtpValue("");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="bg-background border-none shadow-none w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">
          Enter Verification Code
        </CardTitle>
        <CardDescription>
          We&apos;ve sent a 6-digit code to <strong>{email}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otpValue}
            onChange={(value) => setOtpValue(value)}
            disabled={isValidating}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code from your email. The code will expire in 10
            minutes.
          </p>
        </div>

        <div className="bg-muted border rounded-lg p-4">
          <h3 className="font-medium mb-2">{"Didn't receive the code?"}</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Check your spam or junk folder</li>
            <li>• Make sure you entered the correct email</li>
            <li>• Wait a few minutes for delivery</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleResendEmail}
            variant="outline"
            className="w-full bg-transparent"
            disabled={!canResend}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {canResend
              ? "Resend Verification Code"
              : `Resend in ${formatTime(countdown)}`}
          </Button>

          <Button onClick={onBack} variant="ghost" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Having trouble?{" "}
            <a href="/support" className="text-primary hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
