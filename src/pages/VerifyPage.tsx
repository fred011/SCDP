/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  ArrowLeft,
  Mail,
  CheckCircle2,
  XCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";

// API base URL - same as registration
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://digital-skills-platform.onrender.com/api";

export default function VerifyPage() {
  const navigate = useNavigate();
  const [contact, setContact] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [contactError, setContactError] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);
  const [isRedirectingToLMS, setIsRedirectingToLMS] = useState(false);

  const validateContact = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      return "Please enter your email address";
    }

    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }

    return "";
  };

  const handleSendCode = async () => {
    const error = validateContact(contact);
    if (error) {
      setContactError(error);
      return;
    }

    setContactError("");
    setIsSending(true);
    setVerificationError("");
    setIsAlreadyVerified(false);

    try {
      console.log("Sending verification code to:", contact);

      const response = await fetch(`${API_BASE_URL}/auth/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: contact,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Check if user doesn't exist
        if (response.status === 404 || result.code === "USER_NOT_FOUND") {
          throw new Error(
            "No account found with this email. Please register first."
          );
        }
        // Check if email is already verified
        else if (result.code === "ALREADY_VERIFIED") {
          setIsAlreadyVerified(true);
          setIsSuccess(true);
          return;
        } else {
          throw new Error(result.error || "Failed to send verification code");
        }
      }

      console.log("Verification code sent:", result);

      setIsCodeSent(true);
      setShowCodeModal(true);
    } catch (error: any) {
      console.error("Send code error:", error);
      setContactError(
        error.message || "Failed to send verification code. Please try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleVerify = async () => {
    if (!verificationCode) {
      setVerificationError("Please enter the verification code");
      return;
    }

    setIsVerifying(true);
    setVerificationError("");

    try {
      console.log("Verifying code:", verificationCode, "for email:", contact);

      const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: contact,
          code: verificationCode,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Verification failed");
      }

      console.log("Verification successful:", result);

      // Show success and then navigate or show success screen
      setIsSuccess(true);

      // You can also store the token if needed for future requests
      if (result.token) {
        localStorage.setItem("authToken", result.token);
      }
      // Check if profile is complete and redirect to LMS
      if (result.user?.profileComplete) {
        await redirectToLMS(result.token);
      } else {
        setIsSuccess(true);
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      setVerificationError(
        error.message || "Invalid verification code. Please try again."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  // this is the  LMS function to redirect
  const redirectToLMS = async (token: string) => {
    try {
      setIsRedirectingToLMS(true);

      const response = await fetch(`${API_BASE_URL}/auth/sync-to-lms`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to connect to LMS");
      }

      // Redirect to LMS
      if (result.lmsLoginUrl) {
        window.location.href = result.lmsLoginUrl;
      } else {
        throw new Error("No LMS URL received");
      }
    } catch (error: any) {
      console.error("LMS redirect error:", error);
      // Fallback: show success page with manual LMS button
      setIsSuccess(true);
      setIsRedirectingToLMS(false);
    }
  };

  const handleExplorePlatform = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      setIsRedirectingToLMS(true);

      const response = await fetch(`${API_BASE_URL}/auth/sync-to-lms`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to connect to LMS");
      }

      // Redirect to LMS
      if (result.lmsLoginUrl) {
        window.location.href = result.lmsLoginUrl;
      } else {
        throw new Error("No LMS URL received");
      }
    } catch (error: any) {
      console.error("LMS redirect error:", error);
      alert("Failed to connect to LMS. Please try again.");
      setIsRedirectingToLMS(false);
    }
  };

  const handleCompleteProfile = () => {
    navigate("/complete-profile");
  };

  const handleContactChange = (value: string) => {
    setContact(value);
    if (contactError) {
      setContactError("");
    }
    // Reset verification state if email changes
    if (isCodeSent) {
      setIsCodeSent(false);
      setVerificationCode("");
      setVerificationError("");
    }
    setIsAlreadyVerified(false);
  };

  const handleFinish = () => {
    navigate("/");
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col">
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto flex h-16 items-center px-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <Card className="border-green-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center py-8">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>
                  <h2 className="mb-3 text-2xl font-bold text-gray-800 tracking-tight">
                    {isAlreadyVerified
                      ? "Welcome Back!"
                      : "Verification Successful!"}
                  </h2>
                  <p className="mb-2 text-gray-600 leading-relaxed max-w-md text-base">
                    {isAlreadyVerified
                      ? "Your email is already verified. Welcome back to the SCDP community!"
                      : "Your email has been successfully verified. Welcome to the SCDP community!"}
                  </p>
                  <div className="mt-8 w-full max-w-sm space-y-3">
                    <div className="rounded-lg bg-gray-50 p-4 text-left border border-gray-200">
                      <p className="mb-2 text-sm font-semibold text-gray-800">
                        What's Next:
                      </p>
                      <ol className="space-y-1 text-sm text-gray-600">
                        <li>• Explore available courses and training</li>
                        <li>• Connect with community projects</li>
                        <li>• Access digital skills resources</li>
                      </ol>
                    </div>
                    <Button
                      onClick={handleFinish}
                      className="w-full bg-green-600 text-white hover:bg-green-700 transition-all transform hover:scale-105 rounded-lg"
                      size="lg"
                    >
                      {isRedirectingToLMS ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Connecting to LMS...
                        </>
                      ) : (
                        <>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Explore Learning Platform
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleCompleteProfile}
                      variant="outline"
                      className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      Complete Your Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex justify-center">
              <div className="text-4xl font-bold text-gray-800">
                <span
                  style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800 }}
                >
                  <span className="text-green-600">S</span>
                  <span className="text-yellow-500">C</span>
                  <span className="text-red-500">D</span>
                  <span className="text-blue-600">P</span>
                </span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Account Verification
            </h1>
            <p className="text-gray-600 mt-2">
              Verify your email to access the Smart Community Development
              Platform.
            </p>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-gray-800">Verify Your Email</CardTitle>
              <CardDescription className="text-gray-600">
                Enter your registered email address to receive a verification
                code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="contact"
                    type="email"
                    placeholder="your.email@example.com"
                    value={contact}
                    onChange={(e) => handleContactChange(e.target.value)}
                    disabled={isCodeSent || isSuccess}
                    className={
                      contactError ? "border-red-500" : "border-gray-300"
                    }
                  />
                  {contactError && (
                    <p className="text-sm text-red-600">{contactError}</p>
                  )}
                </div>

                <Button
                  type="button"
                  className="w-full bg-green-600 text-white hover:bg-green-700 transition-all transform hover:scale-105 rounded-lg"
                  onClick={handleSendCode}
                  disabled={!contact || isCodeSent || isSending || isSuccess}
                >
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking...
                    </>
                  ) : isCodeSent ? (
                    "Code Sent"
                  ) : (
                    "Send Verification Code"
                  )}
                </Button>

                {isCodeSent && !isSuccess && (
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div className="space-y-2">
                      <Label htmlFor="code" className="text-gray-700">
                        Verification Code *
                      </Label>
                      <Input
                        id="code"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        maxLength={6}
                        className={
                          verificationError
                            ? "border-red-500"
                            : "border-gray-300 text-center text-lg"
                        }
                      />
                      {verificationError && (
                        <p className="text-sm text-red-600">
                          {verificationError}
                        </p>
                      )}
                    </div>

                    <Button
                      type="button"
                      className="w-full bg-green-600 text-white hover:bg-green-700 transition-all transform hover:scale-105 rounded-lg"
                      onClick={handleVerify}
                      disabled={
                        !verificationCode ||
                        isVerifying ||
                        verificationCode.length !== 6
                      }
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify & Continue"
                      )}
                    </Button>
                  </div>
                )}

                {verificationError && !isCodeSent && (
                  <Alert
                    variant="destructive"
                    className="bg-red-50 border-red-200"
                  >
                    <XCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="ml-2 text-red-600">
                      {verificationError}
                    </AlertDescription>
                  </Alert>
                )}
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-gray-600">New to SCDP? </span>
                <Link
                  to="/RegisterPage"
                  className="text-green-600 hover:text-green-700 hover:underline font-medium"
                >
                  Join our community
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Code Sent Modal */}
      <Dialog open={showCodeModal} onOpenChange={setShowCodeModal}>
        <DialogContent className="bg-white border-0 shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-800">
              <Mail className="h-5 w-5 text-green-600" />
              Verification Code Sent
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              We've sent a verification code to your email address. Please check
              your inbox and enter the code to verify your account.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="rounded-lg bg-green-50 px-8 py-4 mb-4 border border-green-200">
              <p className="text-lg font-semibold text-green-700 text-center">
                Check your email at:
                <br />
                <span className="font-bold">{contact}</span>
              </p>
            </div>
            <p className="text-sm text-gray-500 text-center">
              The code will expire in 24 hours. If you don't see the email,
              check your spam folder.
            </p>
          </div>
          <Button
            onClick={() => setShowCodeModal(false)}
            className="w-full bg-green-600 text-white hover:bg-green-700 transition-all transform hover:scale-105 rounded-lg"
          >
            Got it
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
