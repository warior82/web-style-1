"use client";

import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Andi Pratama",
    role: "Founder & Lead Photographer",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sinta Lestari",
    role: "Creative Director",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rizky Hidayat",
    role: "Senior Photographer",
    img: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    name: "Dewi Anggraini",
    role: "Photo Editor",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Bima Saputra",
    role: "Videographer",
    img: "https://randomuser.me/api/portraits/men/51.jpg",
  },
];

export const TeamSection = () => {
  return (
    <section id="team" className="w-full px-8 py-20 bg-background">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <span className="block mb-2 text-xs md:text-sm text-primary font-medium uppercase">
          Tim Kami
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
          Profesional di Balik Lensa
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          Env Lens Studio didukung oleh tim berpengalaman yang siap menghadirkan karya terbaik dalam setiap momen.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {teamMembers.map((member, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover shadow-lg mb-4 border-4 border-primary/20"
            />
            <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
