// Debug page to check environment variables
// Remove this file after debugging
// Updated to force new deployment

export default function DebugEnvPage() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Debug</h1>
      <div className="bg-gray-100 p-4 rounded">
        <p>
          <strong>NEXT_PUBLIC_STRAPI_API_URL:</strong> {strapiUrl || 'NOT SET'}
        </p>
        <p>
          <strong>Expected:</strong> https://totunik-ro.onrender.com
        </p>
        <p>
          <strong>Status:</strong>{' '}
          {strapiUrl === 'https://totunik-ro.onrender.com' ? '✅ Correct' : '❌ Incorrect'}
        </p>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>If this shows "NOT SET" or "localhost:1337", then:</p>
        <ol className="list-decimal list-inside mt-2">
          <li>Check Vercel environment variables</li>
          <li>Make sure it's set for "Production" environment</li>
          <li>Redeploy the application</li>
        </ol>
      </div>
    </div>
  );
}
