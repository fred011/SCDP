import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Loader2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
 
export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
 
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
 
        // Store token and user data in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
 
        console.log('OAuth login successful for user:', user.email);
 
        setStatus('success');
        setMessage(`Successfully authenticated with ${user.provider}! Redirecting...`);
 
        // Redirect based on profile completion
        setTimeout(() => {
          if (!user.profileComplete) {
            navigate('/complete-profile');
          } else {
            navigate('/');
          }
        }, 2000);
 
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">OAuth Authentication</CardTitle>
          <CardDescription>
            {status === 'loading' && 'Processing authentication...'}
            {status === 'success' && 'Authentication successful!'}
            {status === 'error' && 'Authentication failed'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          {status === 'loading' && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground text-center">
                Please wait while we complete your authentication...
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
              
              {/* Check if we need to get user data to determine profile completion */}
              {(() => {
                const userParam = searchParams.get('user');
                if (userParam) {
                  const user = JSON.parse(decodeURIComponent(userParam));
                  if (!user.profileComplete) {
                    return (
                      <Button onClick={handleCompleteProfile} className="w-full">
                        Complete Your Profile
                      </Button>
                    );
                  }
                }
                return (
                  <Button onClick={handleGoHome} className="w-full">
                    Go to Home
                  </Button>
                );
              })()}
            </>
          )}
 
          {status === 'error' && (
            <>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {message}
                </AlertDescription>
              </Alert>
              <div className="flex gap-3 w-full">
                <Button variant="outline" onClick={handleRetry} className="flex-1">
                  Try Again
                </Button>
                <Button onClick={handleGoHome} className="flex-1">
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
 