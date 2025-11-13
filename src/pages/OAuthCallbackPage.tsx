import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Loader2, CheckCircle2, XCircle, AlertCircle, ExternalLink } from 'lucide-react';

// API base URL - same as other pages
const API_BASE_URL = 'https://digital-skills-platform.onrender.com/api';

export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'redirecting'>('loading');
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState<any>(null);

  const redirectToLMS = async (token: string) => {
    try {
      setStatus('redirecting');
      
      const response = await fetch(`${API_BASE_URL}/auth/sync-to-lms`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to connect to LMS');
      }

      // Redirect to LMS
      if (result.lmsLoginUrl) {
        window.location.href = result.lmsLoginUrl;
      } else {
        throw new Error('No LMS URL received');
      }

    } catch (error: any) {
      console.error('LMS redirect error:', error);
      setStatus('error');
      setMessage(error.message || 'Failed to connect to LMS. Please try again.');
    }
  };

  const handleExplorePlatform = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate("/");
      return;
    }

    await redirectToLMS(token);
  };

  const handleTemporaryAccess = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate("/");
      return;
    }

    try {
      setStatus('redirecting');
      
      // Send a special flag to indicate temporary access with incomplete profile
      const response = await fetch(`${API_BASE_URL}/auth/sync-to-lms`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          temporaryAccess: true,
          profileIncomplete: true
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to connect to LMS');
      }

      // Redirect to LMS with temporary access
      if (result.lmsLoginUrl) {
        window.location.href = result.lmsLoginUrl;
      } else {
        throw new Error('No LMS URL received');
      }

    } catch (error: any) {
      console.error('LMS temporary access error:', error);
      setStatus('error');
      setMessage(error.message || 'Failed to connect to LMS. Please try again.');
    }
  };

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const token = searchParams.get('token');
        const userParam = searchParams.get('user');
        const error = searchParams.get('error');

        console.log('OAuth callback received:', { token, userParam, error });

        if (error) {
          throw new Error(`OAuth authentication failed: ${error}`);
        }

        if (!token || !userParam) {
          throw new Error('Invalid OAuth callback parameters');
        }

        // Decode and parse user data
        const user = JSON.parse(decodeURIComponent(userParam));
        setUserData(user);

        // Store token and user data in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));

        console.log('OAuth login successful for user:', user.email);
        console.log('Profile complete:', user.profileComplete);

        setStatus('success');
        setMessage(`Successfully authenticated with ${user.provider}!`);

        // If profile is complete, redirect to LMS immediately
        if (user.profileComplete) {
          console.log('Profile complete, redirecting to LMS...');
          await redirectToLMS(token);
        } else {
          console.log('Profile incomplete, waiting for user action...');
          setMessage(`Successfully authenticated with ${user.provider}! You can complete your profile now or get temporary access to the learning platform.`);
        }

      } catch (error: any) {
        console.error('OAuth callback error:', error);
        setStatus('error');
        setMessage(error.message || 'Authentication failed. Please try again.');
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate]);

  const handleRetry = () => {
    navigate('/register');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleCompleteProfile = () => {
    navigate('/complete-profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">OAuth Authentication</CardTitle>
          <CardDescription>
            {status === 'loading' && 'Processing authentication...'}
            {status === 'success' && 'Authentication successful!'}
            {status === 'redirecting' && 'Connecting to Learning Platform...'}
            {status === 'error' && 'Authentication failed'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          {status === 'loading' && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-green-600" />
              <p className="text-gray-600 text-center">
                Please wait while we complete your authentication...
              </p>
            </>
          )}

          {status === 'redirecting' && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-green-600" />
              <Alert className="border-blue-200 bg-blue-50">
                <AlertDescription className="text-blue-800 text-center">
                  Connecting you to the Learning Platform...
                </AlertDescription>
              </Alert>
              <p className="text-sm text-gray-500 text-center">
                This may take a few moments
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-800 text-center">
                  {message}
                </AlertDescription>
              </Alert>
              
              {/* Show appropriate buttons based on profile completion */}
              {userData?.profileComplete ? (
                <div className="space-y-3 w-full">
                  <Button 
                    onClick={handleExplorePlatform} 
                    className="w-full bg-green-600 text-white hover:bg-green-700"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Go to Learning Platform
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleGoHome}
                    className="w-full"
                  >
                    Back to Home
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 w-full">
                  <div className="text-center mb-2">
                    <p className="text-sm text-gray-600 mb-3">
                      Choose how you'd like to proceed:
                    </p>
                  </div>
                  <Button 
                    onClick={handleCompleteProfile} 
                    className="w-full bg-green-600 text-white hover:bg-green-700"
                  >
                    Complete Profile First
                  </Button>
                  <Button 
                    onClick={handleTemporaryAccess}
                    variant="outline" 
                    className="w-full border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Temporary Access to LMS
                  </Button>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-2">
                    <p className="text-xs text-yellow-800 text-center">
                      <strong>Note:</strong> You'll need to complete your profile in the LMS to access all features.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {status === 'error' && (
            <>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-800">
                  {message}
                </AlertDescription>
              </Alert>
              <div className="flex gap-3 w-full">
                <Button variant="outline" onClick={handleRetry} className="flex-1">
                  Try Again
                </Button>
                <Button onClick={handleGoHome} className="flex-1 bg-green-600 text-white hover:bg-green-700">
                  Go Home
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}