"use client";

import { motion } from "framer-motion";

export const ProfileSection = () => {
  return (
    <section className="w-full px-8 py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Gambar / showcase */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-xl"
        >
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            alt="Studio Env Lens"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Deskripsi Profil */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="block mb-2 text-xs md:text-sm text-primary font-medium uppercase">
            Tentang Kami
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Studio Fotografi Profesional dengan Sentuhan Kreatif
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            Env Lens Studio hadir sebagai studio fotografi berskala profesional
            yang menggabungkan teknologi modern dengan estetika seni visual.
            Kami melayani berbagai kebutuhan fotografi, mulai dari potret
            pribadi, produk komersial, fashion, hingga dokumentasi acara besar.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
            Dengan tim fotografer berpengalaman dan fasilitas studio lengkap,
            setiap karya yang kami hasilkan dirancang untuk menciptakan
            kesan mendalam, elegan, dan berkelas.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
