"use client";

import {useLocale, useTranslations} from "next-intl";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "@/i18n/navigation";
import {routing} from "@/i18n/routing";
import type {Locale} from "next-intl";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();

  function changeLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;
    const hash = typeof window === "undefined" ? "" : window.location.hash;
    router.replace(`${pathname}${hash}`, {locale: nextLocale, scroll: false});
  }

  return (
    <div className="flex items-center" aria-label={t("language")}>
      {routing.locales.map((item, index) => (
        <span key={item} className="flex items-center">
          {index > 0 && <span className="px-1 text-muted-foreground" aria-hidden="true">|</span>}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={`h-8 px-2 ${locale === item ? "font-bold text-primary" : "text-muted-foreground"}`}
            aria-pressed={locale === item}
            onClick={() => changeLocale(item)}
          >
            {item.toUpperCase()}
          </Button>
        </span>
      ))}
    </div>
  );
}
