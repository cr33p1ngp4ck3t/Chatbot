'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="p-8 bg-slate-800 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Authentication Error</h2>
        <div className="text-red-400 mb-4">
          {error === 'Configuration' && (
            <p>There is a problem with the server configuration. Please try again later.</p>
          )}
          {error === 'AccessDenied' && (
            <p>You do not have permission to sign in.</p>
          )}
          {error === 'Callback' && (
            <p>There was a problem with the authentication callback.</p>
          )}
          {!error && (
            <p>An unknown error occurred during authentication.</p>
          )}
        </div>
        <div className="text-center">
          <Link 
            href="/auth/signin"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Try again
          </Link>
        </div>
      </div>
    </div>
  );
}
