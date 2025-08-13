'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detectar iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Verificar se já está em modo standalone
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                      (window.navigator as any).standalone || 
                      document.referrer.includes('android-app://');
    setIsStandalone(standalone);

    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt disparado');
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      console.log('PWA foi instalado');
      setShowInstallButton(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Para iOS, mostrar instruções após um tempo
    if (iOS && !standalone) {
      const timer = setTimeout(() => {
        setShowInstallButton(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Para navegadores que suportam beforeinstallprompt
      deferredPrompt.prompt();
      
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('Usuário aceitou a instalação do PWA');
      } else {
        console.log('Usuário rejeitou a instalação do PWA');
      }
      
      setDeferredPrompt(null);
      setShowInstallButton(false);
    } else if (isIOS) {
      // Para iOS, mostrar instruções
      alert('Para instalar este app:\n\n1. Toque no botão de compartilhar (📤)\n2. Role para baixo e toque em "Adicionar à Tela Inicial"\n3. Toque em "Adicionar"');
    } else {
      // Para outros navegadores, tentar abrir configurações
      alert('Para instalar este app:\n\n• Chrome: Menu (⋮) > "Instalar TradeCalc PRO"\n• Edge: Menu (⋯) > "Apps" > "Instalar este site como um app"\n• Firefox: Menu > "Instalar"');
    }
  };

  // Não mostrar se já está instalado
  if (isStandalone || (!showInstallButton && !isIOS)) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-pulse">
      <button
        onClick={handleInstallClick}
        className="bg-gradient-to-r from-neon-purple to-neon-blue text-white font-bold py-3 px-6 rounded-full shadow-neon-purple hover:shadow-neon-blue transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
        title="Instalar como aplicativo"
      >
        <span className="text-2xl">📱</span>
        <span className="hidden sm:inline">Instalar App</span>
        <span className="sm:hidden">Instalar</span>
      </button>
      
      {/* Tooltip informativo */}
      <div className="absolute bottom-full right-0 mb-2 w-64 bg-dark-surface border border-neon-purple/30 rounded-lg p-3 text-sm text-white opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <p className="text-neon-purple font-semibold mb-1">💡 Instale como App</p>
        <p className="text-xs text-gray-300">
          {isIOS 
            ? 'Toque aqui para ver como instalar no iOS' 
            : 'Instale para usar offline e acesso rápido'}
        </p>
      </div>
    </div>
  );
}
