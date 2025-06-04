import { AuthKitProvider } from '@farcaster/auth-kit';
import TamagotchiGame from './components/TamagotchiGame';
import { farcasterConfig } from './farcasterConfig';

export default function App() {
  return (
    <AuthKitProvider config={farcasterConfig}>
      <TamagotchiGame />
    </AuthKitProvider>
  );
}
