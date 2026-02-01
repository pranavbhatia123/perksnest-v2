import analyticsIllustration from "@/assets/illustrations/analytics-illustration.png";
import marketingIllustration from "@/assets/illustrations/marketing-illustration.png";

interface FeatureSection {
  title: string;
  description: React.ReactNode;
  illustration: string;
}

const features: FeatureSection[] = [
  {
    title: "Discover deals tailored for you",
    description: (
      <>
        Browse <strong>350+ exclusive perks</strong> across categories like cloud hosting, 
        marketing tools, and productivity apps. Every deal is <strong>directly negotiated</strong> to 
        give founders the best possible savings.
      </>
    ),
    illustration: analyticsIllustration,
  },
  {
    title: "Scale faster, spend smarter",
    description: (
      <>
        Stop overpaying for essential tools. Access <strong>$250,000+ in credits</strong> from 
        top SaaS providers and reinvest your savings back into <strong>growing your startup</strong>.
      </>
    ),
    illustration: marketingIllustration,
  },
];

const FeatureCategoriesSection = () => {
  return (
    <section className="py-16 space-y-8">
      {features.map((feature, index) => (
        <div 
          key={index} 
          className="container-wide"
        >
          <div 
            className="relative rounded-3xl overflow-hidden min-h-[400px] lg:min-h-[500px]"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${feature.illustration})` }}
            />
            
            {/* Gradient overlay for better blending */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />
            
            {/* Glass effect card */}
            <div className="relative h-full min-h-[400px] lg:min-h-[500px] flex items-center">
              <div className="w-full lg:w-1/2 p-8 lg:p-12">
                <div className="backdrop-blur-xl bg-background/70 border border-white/20 rounded-2xl p-8 lg:p-10 shadow-2xl">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeatureCategoriesSection;
