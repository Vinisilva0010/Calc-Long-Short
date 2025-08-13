import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para armazenar nosso valor
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Retorna uma versão encapsulada da função setState do useState que persiste o novo valor no localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permite que value seja uma função para que tenhamos a mesma API do useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Salva no estado
      setStoredValue(valueToStore);
      
      // Salva no localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Erro ao salvar no localStorage:`, error);
    }
  };

  useEffect(() => {
    try {
      // Busca do localStorage
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      }
    } catch (error) {
      console.error(`Erro ao carregar do localStorage:`, error);
      setStoredValue(initialValue);
    }
  }, []);

  return [storedValue, setValue] as const;
}

