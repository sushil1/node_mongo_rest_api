import mongoose from 'mongoose'

import constants from './constants'

//remove the warning about promise

mongoose.Promise = global.Promise

//connect to the db with the url provided

try{
  mongoose.connect(constants.MONGO_URL, {useMongoClient:true})
} catch (err){
  mongoose.createConnection(constants.MONGO_URL)
}

mongoose.connection
  .once('open', () => console.log('MongoDB running'))
  .on('error', e => {
    throw e
   })
