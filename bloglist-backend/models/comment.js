const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const commentSchema = mongoose.Schema({
  content: { type: String }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Comment', commentSchema)