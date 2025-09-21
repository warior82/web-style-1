"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    title: "Basic",
    price: "Rp 2.500.000",
    description: "Paket ideal untuk sesi foto sederhana & intimate.",
    features: [
      "Durasi 3 jam sesi foto",
      "10 Foto hasil editing profesional",
      "1 Fotografer",
      "Resolusi tinggi siap cetak",
    ],
  },
  {
    title: "Premium",
    price: "Rp 5.000.000",
    description: "Paket lengkap untuk event & kebutuhan komersial.",
    features: [
      "Durasi 6 jam sesi foto",
      "25 Foto hasil editing profesional",
      "2 Fotografer",
      "Video dokumentasi singkat",
      "Akses file full HD",
    ],
    highlight: true,
  },
  {
    title: "Exclusive",
    price: "Rp 10.000.000",
    description: "Pilihan terbaik untuk event besar & produksi skala tinggi.",
    features: [
      "Durasi seharian penuh",
      "50+ Foto hasil editing profesional",
      "3 Fotografer + 1 Videografer",
      "Album cetak eksklusif",
      "Video cinematic full HD",
    ],
  },
];

export const PricingSection = () => {
  return (
    <section className="w-full px-8 py-20 bg-background">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <span className="block mb-2 text-xs md:text-sm text-primary font-medium uppercase">
          Pricing
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
          Paket Fotografi Profesional
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          Pilih paket yang sesuai dengan kebutuhan Anda, mulai dari sesi foto
          sederhana hingga dokumentasi skala besar. Setiap paket dirancang untuk
          menghadirkan kualitas terbaik dari Env Lens Studio.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan, idx) => (
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
                      plan.highlight ? "text-primary-foreground" : "text-primary"
                    }`}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href={`https://wa.me/6285863308655?text=Halo,%20saya%20tertarik%20dengan%20paket%20${plan.title}%20dengan%20harga%20${plan.price}.%20Mohon%20info%20lebih%20lanjut.`}
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
