import Image from "next/image";

export default function CmsFooter({ footer }: { footer: any }) {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="container mx-auto grid md:grid-cols-4 gap-10">
        {/* Logo & description */}
        <div>
          {footer?.logo && (
            <Image src={footer.logo.url} alt="Logo" width={120} height={40} />
          )}
          {footer?.description && (
            <p className="mt-4 text-gray-400">{footer.description}</p>
          )}
        </div>

        {/* Link Groups */}
        {Array.isArray(footer?.navigation) && footer.navigation.map((group: any, idx: number) => (
          <div key={idx}>
            <h3 className="font-semibold mb-4">{group.title}</h3>
            <ul className="space-y-2">
              {Array.isArray(group.links) && group.links.map((link: any, i: number) => (
                <li key={i}>
                  <a href={link.url} className="text-gray-400 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Social Links */}
        <div>
          <h3 className="font-semibold mb-4">Follow us</h3>
          <div className="flex gap-4">
            {Array.isArray(footer?.socials) && footer.socials.map((s: any, i: number) => (
              <a key={i} href={s.url} className="text-gray-400 hover:text-white">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        {footer?.copyright}
      </div>
    </footer>
  );
}

