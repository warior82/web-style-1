"use client";

import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaFacebookF, FaMapMarkerAlt } from "react-icons/fa";

export const ContactSection = () => {
  return (
    <section id="contact" className="w-full px-8 py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <span className="block mb-2 text-xs md:text-sm text-primary font-medium uppercase">
          Hubungi Kami
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
          Mari Terhubung dengan Env Lens Studio
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          Kami siap membantu Anda untuk konsultasi, pemesanan paket fotografi,
          maupun kerjasama kreatif lainnya.
        </p>
      </div>

      {/* Kontak Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Telepon */}
        <motion.a
          href="tel:+6285863308655"
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-card rounded-2xl shadow-lg flex flex-col items-center gap-4 transition-all hover:bg-primary hover:text-primary-foreground"
        >
          <FaPhoneAlt size={28} />
          <h4 className="text-lg font-semibold">Telepon</h4>
          <p className="text-sm">+62 858-6330-8655</p>
        </motion.a>

        {/* Email */}
        <motion.a
          href="mailto:info@envlensstudio.com"
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-card rounded-2xl shadow-lg flex flex-col items-center gap-4 transition-all hover:bg-primary hover:text-primary-foreground"
        >
          <FaEnvelope size={28} />
          <h4 className="text-lg font-semibold">Email</h4>
          <p className="text-sm">info@envlensstudio.com</p>
        </motion.a>

        {/* Alamat */}
        <motion.a
          href="https://maps.google.com?q=Jakarta,Indonesia"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-card rounded-2xl shadow-lg flex flex-col items-center gap-4 transition-all hover:bg-primary hover:text-primary-foreground"
        >
          <FaMapMarkerAlt size={28} />
          <h4 className="text-lg font-semibold">Alamat</h4>
          <p className="text-sm">Jakarta, Indonesia</p>
        </motion.a>
      </div>

      {/* Sosial Media */}
      <div className="mt-12 flex justify-center gap-6">
        <a
          href="https://instagram.com/envlensstudio"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
        >
          <FaInstagram size={22} />
        </a>
        <a
          href="https://facebook.com/envlensstudio"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
        >
          <FaFacebookF size={22} />
        </a>
      </div>
    </section>
  );
};
