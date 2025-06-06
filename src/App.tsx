import { useState, useEffect } from 'react';
import { AuthKitProvider } from '@farcaster/auth-kit';
import { farcasterConfig } from './farcasterConfig';
import TamagotchiGame from './components/TamagotchiGame';
import './index.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Эмуляция загрузки ресурсов (3 секунды)
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">
          <div className="spinner-circle"></div>
          <div className="spinner-circle"></div>
          <div className="spinner-circle"></div>
        </div>
        <p className="loading-text">Loading WarpPet...</p>
      </div>
    );
  }

  return (
    <AuthKitProvider config={farcasterConfig}>
      <TamagotchiGame />
    </AuthKitProvider>
  );
}