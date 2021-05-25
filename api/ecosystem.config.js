// ecosystem.config.js
module.exports = {
    apps: [{
      name: 'myApp',
      script: 'dist/src/main.js',
      exec_mode: 'cluster', // enables clustering
      instances: 'max',
      autorestart: true,
      log_date_format  : "YYYY-MM-DD HH:mm:ss",
      max_memory_restart: '256M',
      env: {
        NODE_ENV: 'development'
      }, 
      env_production: {
        NODE_ENV: 'production'
      }
    },
  ]
  
  
  }
  