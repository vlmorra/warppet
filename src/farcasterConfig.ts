export const farcasterConfig = {
  relay: "https://relay.farcaster.xyz",
  rpcUrl: "https://optimism-mainnet.public.blastapi.io", // Для продакшена
  domain: process.env.NEXT_PUBLIC_FARCASTER_DOMAIN, // Замените на ваш домен
  siweUri: process.env.NEXT_PUBLIC_FARCASTER_DOMAIN_AUTH, // Важно для продакшена
};