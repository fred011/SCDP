import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useToast } from "../components/hooks/use-toast";

export default function RegisterPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleOAuthLogin = (provider: string) => {
    const API_BASE_URL =
      import.meta.env.VITE_API_URL ||
      "https://digital-skills-platform.onrender.com/api";

    if (provider === "Google") {
      window.location.href = `${API_BASE_URL}/auth/google`;
    } else if (provider === "Microsoft") {
      window.location.href = `${API_BASE_URL}/auth/microsoft`;
    } else if (provider === "Facebook") {
      toast({
        title: "Coming Soon",
        description: "Facebook login will be available soon.",
        variant: "default",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col">
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

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
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
              Join Our Community
            </h1>
            <p className="mt-2 text-gray-600 text-base leading-relaxed">
              Become part of the movement empowering rural communities through
              technology and education.
            </p>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-bold text-gray-800 tracking-tight">
                Create Your Account
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Choose your preferred registration method to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Register Manually Button - Moved to top */}
              <Button
                className="w-full h-12 text-base font-semibold bg-green-600 text-white hover:bg-green-700 transition-all transform hover:scale-105 rounded-lg"
                onClick={() => navigate("/ManualRegistrationPage")}
              >
                Register Manually
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500 font-medium">
                    or continue with
                  </span>
                </div>
              </div>

              {/* OAuth Buttons */}
              <Button
                variant="outline"
                className="w-full h-12 text-base font-medium border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all transform hover:scale-105 rounded-lg"
                onClick={() => handleOAuthLogin("Google")}
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <Button
                variant="outline"
                className="w-full h-12 text-base font-medium border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all transform hover:scale-105 rounded-lg"
                onClick={() => handleOAuthLogin("Microsoft")}
              >
                <svg
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h11v11H0z" fill="#F25022" />
                  <path d="M12 0h11v11H12z" fill="#7FBA00" />
                  <path d="M0 12h11v11H0z" fill="#00A4EF" />
                  <path d="M12 12h11v11H12z" fill="#FFB900" />
                </svg>
                Continue with Microsoft
              </Button>

              <Button
                variant="outline"
                className="w-full h-12 text-base font-medium border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all transform hover:scale-105 rounded-lg"
                onClick={() => handleOAuthLogin("Facebook")}
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Continue with Facebook
              </Button>

              {/* Footer Note */}
              <p className="text-xs text-center text-gray-500 leading-relaxed pt-2">
                By continuing, you agree to SCDP's Terms & Conditions and
                Privacy Policy.
              </p>
            </CardContent>
          </Card>

          {/* Existing User Prompt */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 font-semibold hover:text-green-700 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
