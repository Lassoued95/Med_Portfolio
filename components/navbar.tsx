"use client";

import {useState} from "react";
import {Menu, X} from "lucide-react";
import {useTranslations} from "next-intl";
import {Button} from "@/components/ui/button";
import {LanguageSwitcher} from "@/components/language-switcher";
import {ModeToggle} from "@/components/mode-toggle";
import {Link} from "@/i18n/navigation";

const navigationItems = [
  ["home", "#home"],
  ["about", "#about"],
  ["resume", "#resume"],
  ["projects", "#projects"],
  ["competitions", "#competitions"],
  ["certifications", "#certifications"],
  ["internships", "#internships"],
  ["contact", "#contact"]
] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="#home" className="font-bold text-xl">Mohamed Lassoued</Link>
        <nav className="hidden gap-6 md:flex" aria-label={t("primaryNavigation")}>
          {navigationItems.map(([label, href]) => (
            <Link key={label} href={href} className="scroll-smooth text-sm font-medium underline-offset-4 hover:underline">
              {t(label)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block"><LanguageSwitcher /></div>
          <ModeToggle />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Button variant="outline" size="sm" asChild className="hidden md:flex">
            <Link href="#contact">{t("cta")}</Link>
          </Button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" className="container space-y-3 border-t bg-background py-4 md:hidden" aria-label={t("mobileNavigation")}>
          {navigationItems.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="block py-1 text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {t(label)}
            </Link>
          ))}
          <Link href="#contact" className="block py-1 text-sm font-medium" onClick={() => setMenuOpen(false)}>
            {t("cta")}
          </Link>
          <div className="sm:hidden"><LanguageSwitcher /></div>
        </nav>
      )}
    </header>
  );
}
