const devConfig = {
  MONGO_URL: 'mongodb://localhost/equimperNodeMongApi-dev',
  JWT_SECRET:process.env.JWT_SECRET
}

const testConfig = {
  MONGO_URL: 'mongodb://localhost/equimperNodeMongApi-test'
}

const prodConfig = {
  MONGO_URL: 'mongodb://localhost/equimperNodeMongApi-prod'
}

const defaultConfig = {
  PORT: process.env.PORT || 3000
}


function envConfig(env){

  switch(env){
    case 'development':
     return devConfig

    case 'test':
     return testConfig

    case 'prod':
     return prodConfig

    default:
     return defaultConfig

  }
}


export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV)
}
