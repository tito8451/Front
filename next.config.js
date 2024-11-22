/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Permet d'activer les vérifications supplémentaires pour React
  images: {
    domains: ['example.com'], // Ajoutez ici les domaines autorisés pour les images
  },
  webpack: (config, { isServer }) => {
    // Exemple de configuration personnalisée pour Webpack
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // Importe le package fs comme faux pour le client
      };
    }
    return config;
  },
  i18n: {
    locales: ['en-US', 'fr'], // Exemple d'internationalisation
    defaultLocale: 'en-US',
  },
};

module.exports = nextConfig;
