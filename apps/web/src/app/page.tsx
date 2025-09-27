// apps/web/src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
export default function HomePage() {
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

      {/* Hero / Banner */}
      <section className="relative">
        <Image
          src="https://totunik.ro/wp-content/uploads/2021/02/banner.jpg"
          alt="Banner"
          width={1920}
          height={450}
          className="w-full h-[450px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">
            We are a company specialized in turnkey projects
          </h1>
        </div>
      </section>

      {/* Intro / About section */}
      <section className="container mx-auto py-16 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-lg leading-relaxed">
            We are a company specialized in turnkey projects (including interior design) for retail shops and bank offices. We have more than 10 years of experience carrying out exploratory works, preparing projects and schedules, interior decorations (electrical, mechanical, flooring, glass works, facade, painting, furniture).
          </p>
          <Link
            href="/company"
            className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            See more
          </Link>
        </div>
      </section>

      {/* Feature / Stats / Highlights */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-600">+10</h2>
            <p className="mt-2 text-sm text-gray-600">years experience</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-600">1000+</h2>
            <p className="mt-2 text-sm text-gray-600">clients</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-600">Certificates</h2>
            <p className="mt-2 text-sm text-gray-600">Quality & trust</p>
          </div>
        </div>
      </section>

      {/* Clients / Gallery */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-2xl font-semibold mb-8 text-center">Clients & Projects</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Example images kept with original URLs */}
          <Image
            src="https://totunik.ro/wp-content/uploads/2021/02/bank-credit-europe-bucharest.jpg"
            alt="Project 1"
            width={300}
            height={144}
            className="w-full h-36 object-cover rounded"
          />
          <Image
            src="https://totunik.ro/wp-content/uploads/2021/02/magazin-colins-militari.jpg"
            alt="Project 2"
            width={300}
            height={144}
            className="w-full h-36 object-cover rounded"
          />
          <Image
            src="https://totunik.ro/wp-content/uploads/2021/02/magazin-altinyildiz-sun-plaza.jpg"
            alt="Project 3"
            width={300}
            height={144}
            className="w-full h-36 object-cover rounded"
          />
          <Image
            src="https://totunik.ro/wp-content/uploads/2021/02/garanti-bank-craiova.jpg"
            alt="Project 4"
            width={300}
            height={144}
            className="w-full h-36 object-cover rounded"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="container mx-auto text-center space-y-4 px-6">
          <p>© {new Date().getFullYear()} Totunik. – Data protection</p>
          <p>Made by Justpixel</p>
        </div>
      </footer>
    </main>
  );
}