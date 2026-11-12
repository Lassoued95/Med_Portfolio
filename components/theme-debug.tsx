"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import {useTranslations} from "next-intl"

export function ThemeDebug() {
  const t = useTranslations("common")
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  const translatedTheme = (value: string | undefined) => {
    if (value === "light") return t("themeLight")
    if (value === "dark") return t("themeDark")
    if (value === "system") return t("themeSystem")
    return value
  }

  return (
    <div className="fixed bottom-4 right-4 bg-background border border-border p-4 rounded-md shadow-md z-50">
      <p>{t("currentTheme")}: {translatedTheme(theme)}</p>
      <p>{t("resolvedTheme")}: {translatedTheme(resolvedTheme)}</p>
      <div className="flex gap-2 mt-2">
        <button onClick={() => setTheme("light")} className="px-2 py-1 bg-secondary rounded-md text-sm">
          {t("themeLight")}
        </button>
        <button onClick={() => setTheme("dark")} className="px-2 py-1 bg-secondary rounded-md text-sm">
          {t("themeDark")}
        </button>
        <button onClick={() => setTheme("system")} className="px-2 py-1 bg-secondary rounded-md text-sm">
          {t("themeSystem")}
        </button>
      </div>
    </div>
  )
}
