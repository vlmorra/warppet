import { useState, useEffect } from 'react';
import { useAuthKit, SignInButton } from '@farcaster/auth-kit';
import styles from './TamagotchiGame.module.css';

interface Pet {
  name: string;
  color: string;
  emoji: string;
  age: number;
  level: number;
}

interface Stats {
  health: number;
  hunger: number;
  happiness: number;
  coins: number;
}

export default function TamagotchiGame() {
  const { isAuthenticated, profile } = useAuthKit();
  const [hasPet, setHasPet] = useState(false);
  const [pet, setPet] = useState<Pet | null>(null);
  const [stats, setStats] = useState<Stats>({
    health: 0,
    hunger: 0,
    happiness: 0,
    coins: 0,
  });
  const [showMenu, setShowMenu] = useState(false);

  const petTypes = [
    { name: 'Fluffy', color: '#FF9AA2', emoji: '🐰' },
    { name: 'Spike', color: '#FFB7B2', emoji: '🦔' },
    { name: 'Bubbles', color: '#FFDAC1', emoji: '🐟' },
    { name: 'Shadow', color: '#E2F0CB', emoji: '🐱' },
    { name: 'Rocky', color: '#B5EAD7', emoji: '🦎' },
  ];

  // Система ухудшения состояний
  useEffect(() => {
    if (!hasPet) return;

    const interval = setInterval(() => {
      setStats(prev => {
        const newHunger = Math.max(0, prev.hunger - 10);
        const newHappiness = Math.max(0, prev.happiness - 10);
        
        let healthDecrease = 0;
        if (newHunger < 20 || newHappiness < 20) {
          healthDecrease = 5;
        }
        
        return {
          ...prev,
          hunger: newHunger,
          happiness: newHappiness,
          health: Math.max(0, prev.health - healthDecrease),
        };
      });
    }, 3600000);

    return () => clearInterval(interval);
  }, [hasPet]);

  const createPet = () => {
    const randomPet = petTypes[Math.floor(Math.random() * petTypes.length)];
    
    setPet({
      ...randomPet,
      age: 0,
      level: 1,
    });

    setStats({
      health: 80,
      hunger: 50,
      happiness: 50,
      coins: 10,
    });

    setHasPet(true);
  };

  const care = () => {
    setStats(prev => ({
      ...prev,
      health: Math.min(100, prev.health + 10),
      coins: prev.coins + 1,
    }));
  };

  const feed = () => {
    setStats(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 15),
      coins: prev.coins + 1,
    }));
  };

  const play = () => {
    setStats(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 20),
      coins: prev.coins + 1,
    }));
  };

  const toggleMenu = () => setShowMenu(!showMenu);

  const getPetStatus = () => {
    if (stats.health < 30 || stats.hunger < 20 || stats.happiness < 20) {
      return 'sad';
    }
    return 'happy';
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.startScreen}>
          <h1 className={styles.title}>WARP</h1>
          <h1 className={styles.title}>PET</h1>
          <SignInButton />
          <p className={styles.authHint}>Sign in with Farcaster to play</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {!hasPet ? (
        <div className={styles.startScreen}>
          <h1 className={styles.title}>WARP</h1>
          <h1 className={styles.title}>PET</h1>
          {profile?.username && <p className={styles.welcome}>Welcome, @{profile.username}!</p>}
          <button onClick={createPet} className={styles.createBtn}>
            CREATE PET
          </button>
        </div>
      ) : (
        <>
          <div className={styles.stats}>
            <span>❤️ {Math.round(stats.health)}</span>
            <span>🍔 {Math.round(stats.hunger)}</span>
            <span>😊 {Math.round(stats.happiness)}</span>
            <span>💰 {stats.coins}</span>
          </div>

          <div className={styles.petArea}>
            {pet && (
              <div className={styles.petDisplay}>
                <div 
                  className={`${styles.petEmoji} ${getPetStatus() === 'sad' ? styles.sad : ''}`}
                  style={{ backgroundColor: pet.color }}
                >
                  {getPetStatus() === 'sad' ? '😢' : pet.emoji}
                </div>
                <h2 className={styles.petName}>{pet.name}</h2>
                <p>Level: {pet.level}</p>
                {stats.health < 30 && <p className={styles.warning}>Pet needs help!</p>}
              </div>
            )}
          </div>

          {!showMenu ? (
            <div className={styles.actions}>
              <button onClick={feed}>Feed</button>
              <button onClick={play}>Play</button>
              <button onClick={care}>Care</button>
              <button onClick={toggleMenu}>Menu</button>
            </div>
          ) : (
            <div className={styles.menu}>
              <button>Buy premium</button>
              <button>Shop</button>
              <button onClick={toggleMenu} className={styles.closeBtn}>Close</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}