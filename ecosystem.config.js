module.exports = {
    apps: [
        {
            name: 'presson-store',
            script: 'npm',
            args: 'start',
            env: {
                NODE_ENV: 'production',
                PORT: 3000
            },
            // Restart authentication
            max_restarts: 10,
            restart_delay: 4000,
            time: true
        },
    ],
};
