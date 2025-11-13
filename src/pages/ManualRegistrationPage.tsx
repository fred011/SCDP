/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Mail,
} from "lucide-react";
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
import { useToast } from "../components/hooks/use-toast";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

// Step 1: Basic Registration Schema
const step1Schema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    cellphone: z
      .string()
      .regex(
        /^0[0-9]{9}$/,
        "Please enter a valid 10-digit South African number starting with 0"
      )
      .min(10, "Contact number must be exactly 10 digits")
      .max(10, "Contact number must be exactly 10 digits"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (data: { password: any; confirmPassword: any }) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );

// Step 2: Email Verification Schema
const step2Schema = z.object({
  verificationCode: z
    .string()
    .min(6, "Verification code must be at least 6 characters"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://digital-skills-platform.onrender.com/api";

export default function ManualRegistrationPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Step 1: Registration Form
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      cellphone: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Step 2: Verification Form
  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      verificationCode: "",
    },
  });

  // Step 1: Registration Only
  const onStep1Submit = async (data: Step1Data) => {
    try {
      setIsSubmitting(true);

      // Prepare registration data (exclude confirmPassword)
      const { confirmPassword, ...registrationData } = data;

      console.log("Sending registration data:", registrationData);

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      console.log("Registration response:", result);

      // Store token and email for verifications
      setAuthToken(result.token);
      setUserEmail(data.email);

      // Move to verification step
      setCurrentStep(2);

      toast({
        title: "Registration Successful!",
        description: "Please check your email for the verification code.",
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Email Verification
  const onStep2Submit = async (data: Step2Data) => {
    if (!userEmail) {
      toast({
        title: "Error",
        description: "Email not found. Please start over.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      console.log("Verifying email with code:", data.verificationCode);

      const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          code: data.verificationCode,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Email verification failed");
      }

      console.log("Email verification response:", result);

      // Update auth token with the new one from verification
      if (result.token) {
        setAuthToken(result.token);
        // Store token for profile completion
        localStorage.setItem("authToken", result.token);
      }

      // Move to success page
      setIsSuccess(true);

      toast({
        title: "Email Verified Successfully!",
        description: "Your account is now fully activated.",
      });
    } catch (error: any) {
      console.error("Email verification error:", error);
      toast({
        title: "Verification Failed",
        description: error.message || "Please check the code and try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendVerification = async () => {
    if (!userEmail) {
      toast({
        title: "Error",
        description: "Email not found",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_BASE_URL}/auth/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to resend verification code");
      }

      toast({
        title: "Code Sent!",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error: any) {
      console.error("Resend verification error:", error);
      toast({
        title: "Resend Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigateToProfile = () => {
    navigate("/complete-profile");
  };

  const handleCancel = () => {
    navigate("/register");
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  // Success View - After registration and verification
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
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <Card className="border-green-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
                  >
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </motion.div>
                  <h2 className="mb-3 text-2xl font-bold text-gray-800 tracking-tight">
                    Welcome to SCDP!
                  </h2>
                  <p className="mb-2 text-gray-600 leading-relaxed max-w-md text-base">
                    Your account has been successfully created and verified.
                    You're now part of our community empowering rural
                    development through technology.
                  </p>
                  <div className="mt-8 w-full max-w-sm space-y-3">
                    <div className="rounded-lg bg-gray-50 p-4 text-left border border-gray-200">
                      <p className="mb-2 text-sm font-semibold text-gray-800">
                        Next Steps:
                      </p>
                      <ol className="space-y-1 text-sm text-gray-600">
                        <li>
                          • Complete your profile to personalize your experience
                        </li>
                        <li>
                          • Explore available courses and training programs
                        </li>
                        <li>• Join community discussions and projects</li>
                      </ol>
                    </div>
                    <div className="space-y-3">
                      <Button
                        onClick={handleNavigateToProfile}
                        className="w-full bg-green-600 text-white hover:bg-green-700 transition-all transform hover:scale-105 rounded-lg"
                        size="lg"
                      >
                        Complete Your Profile
                      </Button>
                      <Button
                        onClick={() => navigate("/")}
                        variant="outline"
                        className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
                      >
                        Explore Platform First
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link
            to="/RegisterPage"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to registration options
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Logo and Title */}
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
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              {currentStep === 1 ? "Join Our Community" : "Verify Your Email"}
            </h1>
            <p className="mt-2 text-gray-600 text-base">
              {currentStep === 1
                ? "Step 1 of 2 - Create your account to access SCDP resources"
                : "Step 2 of 2 - Secure your account with email verification"}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-600">
                Step {currentStep} of 2
              </span>
              <span className="text-sm text-gray-500">
                {currentStep === 1 ? "50%" : "100%"} Complete
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-600 to-blue-600"
                initial={{ width: "0%" }}
                animate={{
                  width: currentStep === 1 ? "50%" : "100%",
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {currentStep === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 tracking-tight">
                    Create Your Account
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600">
                    Join thousands of community members accessing digital skills
                    and resources.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={step1Form.handleSubmit(onStep1Submit)}
                    className="space-y-4"
                  >
                    {/* Name Fields */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label
                          htmlFor="firstName"
                          className="text-base font-medium text-gray-700"
                        >
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Controller
                          name="firstName"
                          control={step1Form.control}
                          render={({ field }) => (
                            <Input
                              id="firstName"
                              placeholder="John"
                              value={field.value}
                              onChange={field.onChange}
                              className={
                                step1Form.formState.errors.firstName
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }
                            />
                          )}
                        />
                        {step1Form.formState.errors.firstName && (
                          <p
                            className="text-sm text-red-600 font-medium"
                            role="alert"
                          >
                            {step1Form.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="lastName"
                          className="text-base font-medium text-gray-700"
                        >
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Controller
                          name="lastName"
                          control={step1Form.control}
                          render={({ field }) => (
                            <Input
                              id="lastName"
                              placeholder="Doe"
                              value={field.value}
                              onChange={field.onChange}
                              className={
                                step1Form.formState.errors.lastName
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }
                            />
                          )}
                        />
                        {step1Form.formState.errors.lastName && (
                          <p
                            className="text-sm text-red-600 font-medium"
                            role="alert"
                          >
                            {step1Form.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-base font-medium text-gray-700"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Controller
                        name="email"
                        control={step1Form.control}
                        render={({ field }) => (
                          <Input
                            id="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            value={field.value}
                            onChange={field.onChange}
                            className={
                              step1Form.formState.errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                            }
                          />
                        )}
                      />
                      {step1Form.formState.errors.email && (
                        <p
                          className="text-sm text-red-600 font-medium"
                          role="alert"
                        >
                          {step1Form.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Contact Number */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="contactNumber"
                        className="text-base font-medium text-gray-700"
                      >
                        Mobile Number <span className="text-red-500">*</span>
                      </Label>
                      <Controller
                        name="cellphone"
                        control={step1Form.control}
                        render={({ field }) => (
                          <Input
                            id="contactNumber"
                            type="tel"
                            placeholder="0123456789"
                            value={field.value}
                            onChange={field.onChange}
                            className={
                              step1Form.formState.errors.cellphone
                                ? "border-red-500"
                                : "border-gray-300"
                            }
                            maxLength={10}
                          />
                        )}
                      />
                      {step1Form.formState.errors.cellphone && (
                        <p
                          className="text-sm text-red-600 font-medium"
                          role="alert"
                        >
                          {step1Form.formState.errors.cellphone.message}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Enter your 10-digit South African number starting with 0
                      </p>
                    </div>

                    {/* Password Fields */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label
                          htmlFor="password"
                          className="text-base font-medium text-gray-700"
                        >
                          Password <span className="text-red-500">*</span>
                        </Label>
                        <Controller
                          name="password"
                          control={step1Form.control}
                          render={({ field }) => (
                            <Input
                              id="password"
                              type="password"
                              placeholder="••••••"
                              value={field.value}
                              onChange={field.onChange}
                              className={
                                step1Form.formState.errors.password
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }
                            />
                          )}
                        />
                        {step1Form.formState.errors.password && (
                          <p
                            className="text-sm text-red-600 font-medium"
                            role="alert"
                          >
                            {step1Form.formState.errors.password.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="confirmPassword"
                          className="text-base font-medium text-gray-700"
                        >
                          Confirm Password{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Controller
                          name="confirmPassword"
                          control={step1Form.control}
                          render={({ field }) => (
                            <Input
                              id="confirmPassword"
                              type="password"
                              placeholder="••••••"
                              value={field.value}
                              onChange={field.onChange}
                              className={
                                step1Form.formState.errors.confirmPassword
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }
                            />
                          )}
                        />
                        {step1Form.formState.errors.confirmPassword && (
                          <p
                            className="text-sm text-red-600 font-medium"
                            role="alert"
                          >
                            {step1Form.formState.errors.confirmPassword.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Password Requirements */}
                    <div className="rounded-lg bg-gray-50 p-3 border border-gray-200">
                      <p className="text-sm font-medium mb-1 text-gray-700">
                        Password Requirements:
                      </p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• At least 6 characters</li>
                        <li>• One uppercase letter</li>
                        <li>• One lowercase letter</li>
                        <li>• One number</li>
                        <li>• One special character (@$!%*?&)</li>
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        className="bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-600 text-white hover:bg-green-700 transition-all transform hover:scale-105 rounded-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Registering...
                          </>
                        ) : (
                          <>
                            Continue
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 tracking-tight">
                    Email Verification
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600">
                    Please enter the verification code sent to your email
                    address to secure your account.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={step2Form.handleSubmit(onStep2Submit)}
                    className="space-y-6"
                  >
                    {/* Email Verification Section */}
                    <div className="space-y-4">
                      <div className="flex flex-col items-center text-center mb-6">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                          <Mail className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Check Your Email
                        </h3>
                        <p className="text-gray-600 mt-2">
                          We sent a verification code to{" "}
                          <strong className="text-gray-800">{userEmail}</strong>
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="verificationCode"
                          className="text-base font-medium text-gray-700"
                        >
                          Verification Code{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Controller
                          name="verificationCode"
                          control={step2Form.control}
                          render={({ field }) => (
                            <Input
                              id="verificationCode"
                              placeholder="Enter 6-digit code"
                              value={field.value}
                              onChange={field.onChange}
                              className={
                                step2Form.formState.errors.verificationCode
                                  ? "border-red-500 text-center text-lg"
                                  : "border-gray-300 text-center text-lg"
                              }
                              maxLength={6}
                            />
                          )}
                        />
                        {step2Form.formState.errors.verificationCode && (
                          <p
                            className="text-sm text-red-600 font-medium"
                            role="alert"
                          >
                            {
                              step2Form.formState.errors.verificationCode
                                .message
                            }
                          </p>
                        )}
                      </div>

                      <div className="text-center">
                        <Button
                          type="button"
                          variant="link"
                          onClick={handleResendVerification}
                          disabled={isSubmitting}
                          className="text-sm text-green-600 hover:text-green-700"
                        >
                          Didn't receive the code? Click to resend
                        </Button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBackToStep1}
                        disabled={isSubmitting}
                        className="bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-600 text-white hover:bg-green-700 transition-all transform hover:scale-105 rounded-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          "Verify & Complete"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
