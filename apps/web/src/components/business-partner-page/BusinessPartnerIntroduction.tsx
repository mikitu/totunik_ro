interface BusinessPartnerIntroductionProps {
  introduction: {
    content: string;
  };
}

export default function BusinessPartnerIntroduction({ introduction }: BusinessPartnerIntroductionProps) {
  const { content } = introduction;

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div 
            className="prose prose-lg prose-gray max-w-none text-center"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </section>
  );
}
