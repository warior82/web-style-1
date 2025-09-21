"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, User, Briefcase, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface NavbarProps {
  items?: NavItem[]
  logo?: React.ReactNode
  className?: string
}

const Navbar = ({ 
  items = [
    { name: "Beranda", href: "#", icon: Home },
    { name: "Tentang", href: "#about", icon: User },
    { name: "Portfolio", href: "#portfolio", icon: Briefcase },
    { name: "Kontak", href: "#contact", icon: FileText }
  ],
  logo,
  className 
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState(items[0]?.name || "")

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])



  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center w-full py-6 px-4 z-50">
      <motion.div 
        className={cn(
          "flex items-center justify-between px-6 py-3 rounded-full shadow-lg w-full max-w-4xl relative z-10 transition-all duration-300",
          isScrolled 
            ? "bg-background/80 backdrop-blur-lg border border-border" 
            : "bg-background border border-border",
          className
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="flex items-center">
          {logo}
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <a 
                href={item.href} 
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "text-sm font-medium transition-colors px-3 py-2 rounded-full relative",
                  activeTab === item.name 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
                {activeTab === item.name && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/5 rounded-full border border-primary/20"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </a>
            </motion.div>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a
            href="/#Kontak"
            className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-full hover:bg-primary/90 transition-colors shadow-md"
          >
            Hubungi Kami
          </a>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden flex items-center p-2 rounded-full hover:bg-accent transition-colors" 
          onClick={toggleMenu} 
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6 text-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6 text-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-lg z-[60] pt-24 px-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col space-y-6 max-w-sm mx-auto">
              {items.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <a 
                      href={item.href} 
                      className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-accent" 
                      onClick={() => {
                        setActiveTab(item.name)
                        toggleMenu()
                      }}
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                      <span>{item.name}</span>
                    </a>
                  </motion.div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6"
              >
                <a
                  href="/#Kontak"
                  className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-primary-foreground bg-primary rounded-full hover:bg-primary/90 transition-colors shadow-md"
                  onClick={toggleMenu}
                >
                  Hubungi Kami
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Nav() {
  const [navData, setNavData] = useState<{
    logo: { initial: string; text: string };
    navItems: { name: string; href: string }[];
    cta: { text: string; href: string };
  } | null>(null);

  useEffect(() => {
    fetch('/Json/Nav.json')
      .then(res => res.json())
      .then(data => setNavData(data));
  }, []);

  const navItems = navData?.navItems.map(item => {
    const icons = {
      "Beranda": Home,
      "Tentang": User,
      "Tim": Briefcase,
      "Harga": FileText,
      "Kontak": FileText
    };
    return { ...item, icon: icons[item.name as keyof typeof icons] };
  }) || [];

  const defaultLogo = (
    <motion.div
      className="flex items-center space-x-2"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm">{navData?.logo.initial || 'E'}</span>
      </div>
      <span className="font-semibold text-lg tracking-tight text-foreground">{navData?.logo.text || 'Env Lens'}</span>
    </motion.div>
  );

  return (
    <div className="pt-24 bg-background">
      <Navbar items={navItems} logo={defaultLogo} />
    </div>
  )
}
