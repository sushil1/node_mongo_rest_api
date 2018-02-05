import mongoose, {Schema } from 'mongoose'
import Validator from 'validator'
import uniqueValidator from 'mongoose-unique-validator'
import { hashSync, compareSync } from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'

import Post from '../posts/post.model'
import {passwordReg} from './user.validation'
import constants from '../../config/constants'


const UserSchema = new Schema({

  email:{
    type:String,
    required:[true, 'Email is required'],
    unique:true,
    lowercase:true,
    trim:true,
    validate:{
      validator(email){
        return Validator.isEmail(email)
      },
      message: '{VALUE} is not a valid {PATH}'
    }
  },
  firstName:{
    type:String,
    required:[true, 'First Name is required'],
    trim:true,
  },
  lastName:{
    type:String,
    required:[true, 'First Name is required'],
    trim:true,
  },
  userName:{
    type:String,
    required:[true, 'User Name is required'],
    trim:true,
  },
  password:{
    type:String,
    required:[true, 'Password is required'],
    trim:true,
    minlength: [6, 'Password need to be longer'],
    validate:{
      validator(password){
        return passwordReg.test(password)
      },
      message: '{VALUE} is not a valid {PATH}'
    }
  },
  favourites: {
    posts: [{
      type:Schema.Types.ObjectId,
      ref: 'Post'
    }]
  },

},{timestamps:true})

UserSchema.pre('save', function(next){
  if(this.isModified('password')){
    this.password = this._hashPassword(this.password)
    return next()
  }
  return next()
})

UserSchema.plugin(uniqueValidator, {
  message:'{VALUE} already taken'
})

UserSchema.methods = {
  _hashPassword(password){
    return hashSync(password)
  },
  authenticateUser(password){
    return compareSync(password, this.password)
  },
  createToken(){
    return jwt.sign(
      { _id:this._id}, constants.JWT_SECRET
    )
  },
  toAuthJSON(){
    return {
      _id:this._id,
      userName:this.userName,
      token:`JWT ${this.createToken()}`,
      admin:this.admin,
    }
  },
  toJSON(){
    return {
      _id:this._id,
      userName:this.userName
    }
  },
  _favourites: {
    async posts(postId){
      if(this.favourites.posts.indexOf(postId) >= 0){
        this.favourites.posts.remove(postId)
        await Post.decFavouriteCount(postId)
      } else{
        this.favourites.posts.push(postId)
        await Post.incFavouriteCount(postId)
      }
      return this.save()
    },
    isPostIsFavourite(postId){
      if(this.favourites.posts.indexOf(postId) >= 0){
        return true
      }
      return false
    }
  }
}



export default mongoose.model('User', UserSchema)
