import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, CheckCircle, Copy, Download, Send, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { useToast } from "../../components/hooks/use-toast";
import { motion } from "framer-motion";
import { useState } from "react";

interface UserData {
  first_name: string;
  last_name: string;
  physical_address: string;
  email: string;
  dob: string;
  qualification: string;
  province: string;
  region: string;
  race: string;
  cellphone: string;
  gender?: string;
  id_passport?: string;
  employment_status?: string;
  salary_range?: string;
  municipality?: string;
}

interface ExternalApiResponse {
  status: "success" | "error";
  message: string;
}

export default function ProfileConfirmationPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState<ExternalApiResponse | null>(null);

  // Get the user data from location state or from localStorage as fallback
  const userData = location.state?.userData || 
    JSON.parse(localStorage.getItem('userRegistrationData') || '{}');

  // Format the JSON exactly as required for the external API
  const formattedUserData: UserData = {
    first_name: userData.first_name || userData.firstName || "Not provided",
    last_name: userData.last_name || userData.lastName || "Not provided",
    physical_address: userData.physical_address || userData.physicalAddress || "Not provided",
    email: userData.email || "Not provided",
    dob: userData.dob || userData.dateOfBirth || "Not provided",
    qualification: userData.qualification || userData.educationLevel || "Not provided",
    province: userData.province || "Not provided",
    region: userData.region || userData.district || "Not provided",
    race: userData.race || "Not provided",
    cellphone: userData.cellphone || "Not provided",
  };

  // External API configuration
  const EXTERNAL_API_URL = 'https://finallmsdomain.com/api/register-student';
  // In production, this should be stored in environment variables
  const API_KEY = import.meta.env.VITE_EXTERNAL_API_KEY || 'SECRET_API_KEY_I_WILL_PROVIDE';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(formattedUserData, null, 2));
      setCopied(true);
      toast({
        title: "Copied!",
        description: "User data copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(formattedUserData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `user-profile-${formattedUserData.first_name}-${formattedUserData.last_name}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "User data downloaded as JSON file",
    });
  };

  const submitToExternalSystem = async () => {
    try {
      setIsSubmitting(true);
      setApiResponse(null);

      // Validate required fields
      const requiredFields = [
        'first_name', 'last_name', 'physical_address', 'email', 
        'dob', 'qualification', 'province', 'region', 'race', 'cellphone'
      ];

      const missingFields = requiredFields.filter(field => 
        !formattedUserData[field as keyof UserData] || formattedUserData[field as keyof UserData] === "Not provided"
      );

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      console.log('Submitting to external system:', formattedUserData);
      console.log('API URL:', EXTERNAL_API_URL);

      const response = await fetch(EXTERNAL_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(formattedUserData),
      });

      const result: ExternalApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit to external system');
      }

      setApiResponse(result);

      if (result.status === 'success') {
        toast({
          title: "Success!",
          description: result.message || "Data successfully submitted to external system",
        });
      } else {
        toast({
          title: "External System Error",
          description: result.message || "External system returned an error",
          variant: "destructive",
        });
      }

    } catch (error: any) {
      console.error('External API submission error:', error);
      setApiResponse({
        status: 'error',
        message: error.message || 'Failed to submit data to external system'
      });
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit data to external system",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToHome = () => {
    // Clear any temporary registration data
    localStorage.removeItem('userRegistrationData');
    navigate("/");
  };

  // If no user data is available, redirect to home
  if (!userData || Object.keys(userData).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">No user data found.</p>
              <Button onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Button
            variant="ghost"
            onClick={handleBackToHome}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Logo and Title */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex justify-center">
              <img 
                src="/images/design-mode/Made_with_insMind-images-removebg-preview(2).png" 
                alt="CSIR Logo" 
                width={160}
                height={53}
                className="h-12 w-auto" 
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                Registration Complete!
              </h1>
              <p className="mt-2 text-muted-foreground text-base">
                Your profile has been successfully created
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight">
                  User Profile Data
                </CardTitle>
                <CardDescription className="text-base">
                  This is the JSON data that will be submitted to our external system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* JSON Display */}
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">User Data JSON</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        className="flex items-center gap-2"
                      >
                        {copied ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                        {copied ? "Copied!" : "Copy JSON"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadJSON}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download JSON
                      </Button>
                    </div>
                  </div>
                  <pre className="text-sm whitespace-pre-wrap bg-white dark:bg-slate-800 p-4 rounded border overflow-auto max-h-96">
                    {JSON.stringify(formattedUserData, null, 2)}
                  </pre>
                </div>

                {/* External API Response */}
                {apiResponse && (
                  <Card className={apiResponse.status === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        {apiResponse.status === 'success' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <div className="h-5 w-5 rounded-full bg-red-600 flex items-center justify-center">
                            <span className="text-white text-xs">!</span>
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-sm">
                            {apiResponse.status === 'success' ? 'External System Response' : 'External System Error'}
                          </h4>
                          <p className="text-sm mt-1">{apiResponse.message}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Data Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{formattedUserData.first_name} {formattedUserData.last_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{formattedUserData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-medium">{formattedUserData.cellphone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date of Birth:</span>
                        <span className="font-medium">{formattedUserData.dob}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Location & Education</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Province:</span>
                        <span className="font-medium">{formattedUserData.province}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Region:</span>
                        <span className="font-medium">{formattedUserData.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Race:</span>
                        <span className="font-medium">{formattedUserData.race}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Education:</span>
                        <span className="font-medium">{formattedUserData.qualification}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-4">
                  <Button 
                    onClick={handleBackToHome} 
                    variant="outline"
                  >
                    Skip External Submission
                  </Button>
                  
                  <Button 
                    onClick={submitToExternalSystem} 
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Submit to External System
                      </>
                    )}
                  </Button>
                </div>

                {/* API Configuration Info */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-sm text-blue-800 mb-2">
                      External System Configuration
                    </h4>
                    <div className="text-xs text-blue-700 space-y-1">
                      <p><strong>Endpoint:</strong> {EXTERNAL_API_URL}</p>
                      <p><strong>Method:</strong> POST</p>
                      <p><strong>Authentication:</strong> Bearer Token</p>
                      <p><strong>Required Fields:</strong> first_name, last_name, physical_address, email, dob, qualification, province, region, race, cellphone</p>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}