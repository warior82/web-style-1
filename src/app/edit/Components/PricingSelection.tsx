"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

interface PricingData {
  waNumber: string;
  section: {
    tag: string;
    title: string;
    description: string;
  };
  plans: PricingPlan[];
}

export const PricingSection = () => {
  const [data, setData] = useState<PricingData | null>(null);

  useEffect(() => {
    fetch("/json/pricing.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching pricing:", err));
  }, []);

  if (!data) return null;

  const { waNumber, section, plans } = data;

  return (
    <section className="w-full px-8 py-20 bg-background">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <span className="block mb-2 text-xs md:text-sm text-primary font-medium uppercase">
          {section.tag}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
          {section.title}
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          {section.description}
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl shadow-lg border flex flex-col justify-between ${
              plan.highlight
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-card-foreground border-border"
            }`}
          >
            <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
            <p className="text-lg mb-4 opacity-80">{plan.description}</p>
            <div className="text-3xl font-bold mb-6">{plan.price}</div>
            <ul className="space-y-3 text-left mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check
                    size={18}
                    className={`${
                      plan.highlight
                        ? "text-primary-foreground"
                        : "text-primary"
                    }`}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href={`https://wa.me/${waNumber}?text=Halo,%20saya%20tertarik%20dengan%20paket%20${plan.title}%20dengan%20harga%20${plan.price}.%20Mohon%20info%20lebih%20lanjut.`}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-2 px-4 rounded-md font-medium transition-all text-center mt-auto ${
                plan.highlight
                  ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              Pilih Paket
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
