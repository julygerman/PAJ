const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({ 
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    name: String,
    content: String,
    taskStatus:{type: String, enum: ['In Progress', 'Completed', 'Backlog']}
})

const featureSchema = new Schema({
    feature: String,
    featureStatus:{type: String, enum: ['In Progress', 'Completed', 'Backlog'], default: 'Backlog'},
    tasks: [taskSchema]
})

const commentSchema = new Schema({
    content: String,
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'}
})

const projectSchema = new Schema({
    name: String,
    owner:  { type: Schema.Types.ObjectId, ref: 'User'},
    features: [featureSchema],
    status:{type: Boolean, default: false},
    description: String,
    contributors: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    comments: [commentSchema]

})


module.exports = mongoose.model('Project', projectSchema)