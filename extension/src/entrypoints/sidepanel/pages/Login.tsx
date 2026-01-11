import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { authAPI } from '@/services/api';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await authAPI.loginWithGoogle();
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    onLogin();
  };

  return (
    <div className="h-screen bg-[#0d1117] flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-[#161b22] border-[#30363d] text-white">
        <CardHeader>
          <CardTitle className="text-white">LeetCode Buddy</CardTitle>
          <CardDescription className="text-[#8b949e]">
            Compare LeetCode profiles and track progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-sm">
              {error}
            </div>
          )}
          <p className="text-[#8b949e] text-sm text-center mb-4">
            Sign in with your Google account to save comparison history
          </p>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-[#ffffff] hover:bg-[#b2b2b2] text-black"
          >
            {loading ? 'Authenticating...' : 'Login with Google'}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleSkip}
            disabled={loading}
            className="w-full bg-transparent border-[#30363d] text-[#8b949e] hover:bg-[#21262d] hover:text-white"
          >
            Continue without login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
