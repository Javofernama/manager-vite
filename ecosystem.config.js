module.exports = {
    apps: [
      {
        name: "manager-vite",
        script: "serve",
        args: "-s dist -l 5173 --single",
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  