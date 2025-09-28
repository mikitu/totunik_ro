import Link from 'next/link';
import Image from 'next/image';

export default function TestPage() {
  return (
    <main className="font-sans text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between p-6">
          <Link href="/">
            <Image
              src="https://totunik.ro/wp-content/uploads/2018/07/logo-Copy-1.png"
              alt="Totunik logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <nav className="space-x-6 text-sm font-medium">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/company" className="hover:text-blue-600">Company</Link>
            <Link href="/construction" className="hover:text-blue-600">Construction</Link>
            <Link href="/paint" className="hover:text-blue-600">Paint</Link>
            <Link href="/products" className="hover:text-blue-600">Products</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <div className="container mx-auto py-16 px-6">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Test Page
            </h1>
            <p className="text-gray-500 text-sm">
              This is a static test page to verify routing works
            </p>
          </header>
          
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed">
              <p>This is a test page that demonstrates the routing structure is working correctly.</p>
              <p>The dynamic route at <code>/[slug]/page.tsx</code> will handle pages from Strapi, while static routes like this one work as expected.</p>
              
              <h2>Next Steps</h2>
              <ol>
                <li>Set up the Pages content type in Strapi</li>
                <li>Configure API permissions</li>
                <li>Create sample content</li>
                <li>Test the dynamic routing with real Strapi data</li>
              </ol>
              
              <p>
                <Link href="/" className="text-blue-600 hover:underline">
                  ← Back to Home
                </Link>
              </p>
            </div>
          </div>
        </article>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Totunik. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
