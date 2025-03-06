'use client';

import { useState, useEffect } from 'react';
import { Mail, Linkedin, Code, Heart, Copy, Check, Globe, Palette, Server, PenTool } from 'lucide-react';

export default function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);
  
  // Kontrollera mörkt läge
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkDarkMode = () => {
        const isDark = document.documentElement.classList.contains('dark');
        setIsDarkMode(isDark);
      };
      
      // Initial kontroll
      checkDarkMode();
      
      // Ställ in en observer för att spåra temaändringar
      const observer = new MutationObserver(() => {
        checkDarkMode();
      });
      
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
      
      return () => observer.disconnect();
    }
  }, []);
  
  // Funktion för att kopiera e-post
  const copyEmail = () => {
    navigator.clipboard.writeText('portfolio@example.com')
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Kunde inte kopiera text: ', err);
      });
  };
  
  return (
    <footer id="footer" className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} py-12 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} overflow-hidden relative`}>
      {/* Dekorativa element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div>
      <div className={`absolute top-0 left-0 w-32 h-32 rounded-full bg-blue-500/5 -translate-x-1/2 -translate-y-1/2 blur-3xl ${isDarkMode ? 'opacity-30' : 'opacity-20'}`}></div>
      <div className={`absolute bottom-0 right-0 w-64 h-64 rounded-full bg-purple-500/5 translate-x-1/3 translate-y-1/3 blur-3xl ${isDarkMode ? 'opacity-30' : 'opacity-20'}`}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Första raden med tre kolumner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 mb-12">
          {/* Om oss - Första kolumn */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Om Galleriet
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              En samling av portföljer från studenter i programmet Civilingenjör Interaktion och Design vid Umeå Universitet. Skapad som ett personligt projekt för inspiration och för att visa upp vår talangfulla studentkår.
            </p>
          </div>
          
          {/* Begär ändringar - Andra kolumn */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-blue-500" />
              Begär Ändringar
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Vill du lägga till, ta bort eller uppdatera din information? Skicka ett meddelande med din begäran så hjälper jag dig.
            </p>
            <button 
              onClick={copyEmail}
              className={`group flex items-center px-4 py-2 rounded-md mt-2 border ${isDarkMode ? 'border-gray-800 hover:border-blue-900/60 bg-gray-800/30 hover:bg-blue-900/20' : 'border-gray-200 hover:border-blue-200 bg-gray-100/50 hover:bg-blue-50/50'} transition-all duration-300`}
            >
              {copied ? (
                <Check size={16} className={`mr-2 transition-transform duration-300 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              ) : (
                <Copy size={16} className={`mr-2 transition-transform duration-300 group-hover:scale-110 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              )}
              <span className={`${isDarkMode ? 'text-gray-300 group-hover:text-blue-300' : 'text-gray-700 group-hover:text-blue-700'} transition-colors duration-300`}>
                {copied ? 'Kopierad!' : 'portfolio@example.com'}
              </span>
            </button>
          </div>
          
          {/* Tredje kolumn - Kompaktare rollförklaringar med t.ex. */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <PenTool className="w-5 h-5 mr-2 text-purple-500" />
              Kategorier
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {/* Designer - kompakt version med t.ex. */}
              <div className={`px-3 py-1.5 rounded-md ${isDarkMode ? 'bg-gray-800/60 hover:bg-gray-800/80' : 'bg-gray-100 hover:bg-gray-200/70'} flex items-center group transition-colors duration-300`}>
                <Palette className={`w-4 h-4 mr-2 flex-shrink-0 ${isDarkMode ? 'text-green-400' : 'text-green-600'} group-hover:scale-110 transition-transform duration-300`} />
                <div className="min-w-0">
                  <p className="font-medium text-sm leading-none mb-0.5">Designer</p>
                  <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Ex. UX/UI, interaktionsdesign
                  </p>
                </div>
              </div>

              {/* Utvecklare - kompakt version med t.ex. */}
              <div className={`px-3 py-1.5 rounded-md ${isDarkMode ? 'bg-gray-800/60 hover:bg-gray-800/80' : 'bg-gray-100 hover:bg-gray-200/70'} flex items-center group transition-colors duration-300`}>
                <Code className={`w-4 h-4 mr-2 flex-shrink-0 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} group-hover:scale-110 transition-transform duration-300`} />
                <div className="min-w-0">
                  <p className="font-medium text-sm leading-none mb-0.5">Utvecklare</p>
                  <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Ex. frontend, backend, fullstack
                  </p>
                </div>
              </div>

              {/* Annat - kompakt version med t.ex. */}
              <div className={`px-3 py-1.5 rounded-md ${isDarkMode ? 'bg-gray-800/60 hover:bg-gray-800/80' : 'bg-gray-100 hover:bg-gray-200/70'} flex items-center group transition-colors duration-300`}>
                <Server className={`w-4 h-4 mr-2 flex-shrink-0 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} group-hover:scale-110 transition-transform duration-300`} />
                <div className="min-w-0">
                  <p className="font-medium text-sm leading-none mb-0.5">Annat</p>
                  <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Ex. UX-research, projektledning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Andra raden med jämnt fördelade kolumner - förbättrad för mobil */}
        <div className={`pt-6 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-0">
            {/* Kontakt - vänstercentrerad */}
            <div className="col-span-1">
              <h4 className={`text-xs font-medium mb-3 uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}></h4>
              <div className="flex items-center space-x-3">
                <a 
                  href="https://linkedin.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${isDarkMode ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-300'} transition-all duration-300 p-2 rounded-full flex items-center justify-center`}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a 
                  href="https://lukashedstrom.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${isDarkMode ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-300'} transition-all duration-300 p-2 rounded-full flex items-center justify-center`}
                  aria-label="Website"
                >
                  <Globe size={18} />
                </a>
              </div>
            </div>

            {/* Teknikstack - högercentrerad */}
            <div className="col-span-1 text-right">
              <h4 className={`text-xs font-medium mb-3 uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}></h4>
              <div className="flex flex-wrap gap-1.5 justify-end">
                <a 
                  href="https://nextjs.org" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-2.5 py-1 text-xs font-medium rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors duration-300`}
                >
                  Next.js 15
                </a>
                <a 
                  href="https://tailwindcss.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-2.5 py-1 text-xs font-medium rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors duration-300`}
                >
                  Tailwind
                </a>
                <a 
                  href="https://www.typescriptlang.org" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-2.5 py-1 text-xs font-medium rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors duration-300`}
                >
                  TS
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}