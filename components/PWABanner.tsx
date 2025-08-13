'use client';

import { useState, useEffect } from 'react';

export default function PWABanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Verificar se já está instalado
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                      (window.navigator as any).standalone || 
                      document.referrer.includes('android-app://');
    
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    setIsStandalone(standalone);
    setIsIOS(iOS);

    // Verificar se o banner foi fechado antes
    const bannerDismissed = localStorage.getItem('pwa-banner-dismissed');
    
    // Mostrar banner se não está instalado e não foi fechado
    if (!standalone && !bannerDismissed) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleInstall = () => {
    if (isIOS) {
      alert('Para instalar:\n\n1. Toque no botão de compartilhar (📤) no Safari\n2. Role e toque em "Adicionar à Tela Inicial"\n3. Toque em "Adicionar"');
    } else {
      alert('Para instalar:\n\n• Chrome: Clique no ícone de instalação na barra de endereços\n• Edge: Menu > Apps > Instalar\n• Ou procure pelo botão "📱 Instalar App" na página');
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  if (isStandalone || !showBanner) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-neon-purple/90 to-neon-blue/90 backdrop-blur-sm border-b border-neon-purple/30 text-white p-3 shadow-neon-purple">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">📱</span>
          <div>
            <p className="font-semibold text-sm">Instale como App!</p>
            <p className="text-xs opacity-90">
              Acesso rápido e funciona offline
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleInstall}
            className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Como Instalar
          </button>
          <button
            onClick={handleDismiss}
            className="text-white/70 hover:text-white p-1 transition-colors duration-200"
            title="Fechar"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
