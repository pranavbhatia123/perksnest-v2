import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Rajan Mehta",
    role: "Co-Founder",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
    quote: "PerksNest was the best investment I made in the early days of my company. Pays for itself instantly with Premium, very responsive team, new deals added every week.",
  },
  {
    name: "Priya Nair",
    role: "Founder & CEO",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=faces",
    quote: "The PerksNest team has been incredibly responsive and helpful. Every offer has worked perfectly and saved us thousands of dollars.",
  },
  {
    name: "Marcus Osei",
    role: "Head of Engineering",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=faces",
    quote: "PerksNest helped us discover new tools and get free credits on ones we already use. It's like free money — sounds too good to be true, but it's completely real!",
  },
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 bg-secondary/50">
      <div className="container-wide">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-6">
          They're growing more and spending less with PerksNest
        </h2>
        
        <div className="flex items-center justify-center gap-8 overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 transition-all duration-300 ${
                index === currentIndex ? "opacity-100" : "opacity-50"
              }`}
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="max-w-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-foreground">{testimonial.name}</span>
                  <span className="text-xs text-muted-foreground">{testimonial.role}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{testimonial.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
