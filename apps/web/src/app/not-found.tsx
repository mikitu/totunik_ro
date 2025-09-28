import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main className="font-sans text-gray-800">
      <Header />

      {/* 404 Content */}
      <div className="container mx-auto py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. The page may have been moved, deleted, or the URL might be incorrect.
          </p>
          <Link 
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
