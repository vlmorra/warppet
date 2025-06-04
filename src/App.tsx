import { AuthKitProvider } from '@farcaster/auth-kit';
import TamagotchiGame from './components/TamagotchiGame';
import { farcasterConfig } from './farcasterConfig';
import './App.css';

export default function App() {
  return (
    <AuthKitProvider config={farcasterConfig}>
      <TamagotchiGame />
    </AuthKitProvider>
  );
}