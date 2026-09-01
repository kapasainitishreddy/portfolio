"use client";

import { createContext, useContext, useEffect, useState } from "react";
export type Theme="ink"|"calligraphy"|"samurai";export type Mode="light"|"dark";
export const THEMES:{id:Theme;label:string;tagline:string}[]=[{id:"ink",label:"Suminagashi",tagline:"Floating rings"},{id:"calligraphy",label:"Shodō",tagline:"Sumi brush"},{id:"samurai",label:"Bushidō",tagline:"Stillness and steel"}];
const THEME_KEY="snrk_theme",MODE_KEY="snrk_mode";
interface ThemeState{theme:Theme;setTheme:(theme:Theme)=>void;mode:Mode;setMode:(mode:Mode)=>void;toggleMode:()=>void}
const ThemeContext=createContext<ThemeState|null>(null);
export function ThemeProvider({children}:{children:React.ReactNode}){const[theme,setThemeState]=useState<Theme>("ink");const[mode,setModeState]=useState<Mode>("dark");useEffect(()=>{const savedTheme=localStorage.getItem(THEME_KEY) as Theme|null;if(savedTheme==="ink"||savedTheme==="calligraphy"||savedTheme==="samurai")setThemeState(savedTheme);const savedMode=localStorage.getItem(MODE_KEY) as Mode|null;if(savedMode==="light"||savedMode==="dark")setModeState(savedMode);},[]);useEffect(()=>document.documentElement.setAttribute("data-theme",theme),[theme]);useEffect(()=>document.documentElement.setAttribute("data-mode",mode),[mode]);const setTheme=(next:Theme)=>{setThemeState(next);try{localStorage.setItem(THEME_KEY,next);}catch{}};const setMode=(next:Mode)=>{setModeState(next);try{localStorage.setItem(MODE_KEY,next);}catch{}};const toggleMode=()=>setMode(mode==="dark"?"light":"dark");return <ThemeContext.Provider value={{theme,setTheme,mode,setMode,toggleMode}}>{children}</ThemeContext.Provider>;}
export function useTheme():ThemeState{const ctx=useContext(ThemeContext);return ctx??{theme:"ink",setTheme:()=>{},mode:"dark",setMode:()=>{},toggleMode:()=>{}};}
