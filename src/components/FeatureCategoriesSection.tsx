import analyticsIllustration from "@/assets/illustrations/analytics-illustration.png";
import marketingIllustration from "@/assets/illustrations/marketing-illustration.png";

interface FeatureSection {
  title: string;
  description: React.ReactNode;
  illustration: string;
  bgColor: string;
  reverse?: boolean;
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
    bgColor: "bg-primary/5",
    reverse: false,
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
    bgColor: "bg-background",
    reverse: true,
  },
];

const FeatureCategoriesSection = () => {
  return (
    <section className="py-16">
      {features.map((feature, index) => (
        <div key={index} className={`${feature.bgColor} py-16 lg:py-24`}>
          <div className="container-wide">
            <div className={`flex flex-col ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
              {/* Text Content */}
              <div className="flex-1 max-w-xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                  {feature.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Illustration */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={feature.illustration} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
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
