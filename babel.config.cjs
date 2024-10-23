module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { esmodules: true } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};

// Gist used for config
// https://gist.github.com/Klerith/b2eafa2a5fb9f09d6d043781be976e06
