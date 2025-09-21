"use client";

import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Env Lens Studio</h3>
          <p className="text-sm opacity-80">
            Membingkai keindahan, menyempurnakan setiap momen. 
            Studio fotografi profesional untuk potret, produk, dan dokumentasi acara.
          </p>
        </div>

        {/* Menu */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Menu</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/#about" className="hover:underline">Tentang Kami</a></li>
            <li><a href="/Team" className="hover:underline">Tim</a></li>
            <li><a href="/#Harga" className="hover:underline">Pricing</a></li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Kontak</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} /> +62 858-6330-8655
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> info@envlensstudio.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Jakarta, Indonesia
            </li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Ikuti Kami</h4>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-primary">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-background/20 mt-8 py-4 text-center text-sm opacity-70">
        © {new Date().getFullYear()} Env Lens Studio. Semua Hak Dilindungi.
      </div>
    </footer>
  );
};
