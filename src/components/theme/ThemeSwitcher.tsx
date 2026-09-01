"use client";

import { motion } from "framer-motion";
import { useTheme, THEMES, type Theme } from "./ThemeProvider";
import { InkDropIcon, BrushIcon, KatanaIcon } from "@/components/layout/icons";
const ICONS:Record<Theme,React.ComponentType<{width?:number;height?:number}>>={ink:InkDropIcon,calligraphy:BrushIcon,samurai:KatanaIcon};
export default function ThemeSwitcher(){const{theme,setTheme}=useTheme();return <div role="radiogroup" aria-label="Visual theme" className="relative flex items-center gap-0.5 rounded-full border p-0.5" style={{borderColor:"color-mix(in srgb, var(--color-silver) 22%, transparent)"}}>{THEMES.map((item)=>{const Icon=ICONS[item.id],active=theme===item.id;return <button key={item.id} type="button" role="radio" aria-checked={active} aria-label={`${item.label} theme: ${item.tagline}`} title={`${item.label}: ${item.tagline}`} onClick={()=>setTheme(item.id)} className="relative flex h-8 w-8 items-center justify-center rounded-full" style={{color:active?"var(--color-ink)":"var(--color-silver)"}}>{active&&<motion.span layoutId="theme-pill" className="absolute inset-0 rounded-full" style={{background:"var(--color-accent)"}} transition={{type:"spring",stiffness:400,damping:32}}/>}<span className="relative z-10"><Icon width={16} height={16}/></span></button>;})}</div>;}
