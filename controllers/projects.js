const Project = require('../models/project')

module.exports = {
    index,
    createProject,
    showProject,
    deleteProject,
    updateProject
}

function updateProject(req, res){
    Project.findByIdAndUpdate(req.params.projectId, req.body, {new: true})
    .then(project => 
        res.json(project)
        )
}

function deleteProject(req,res){
    Project.findByIdAndDelete(req.params.projectId)
    .then(project =>
        res.json(project)
        )
}

function showProject(req, res){
    Project.findById(req.params.projectId)
    .populate('owner')
    .populate('comments.createdBy')
    .populate('features.tasks.user')
    .then( project => 
        res.json(project)
        )
}

function index(req,res){
    Project.find({})
    .populate('owner')
    .populate('comments.createdBy')
    .populate('features.tasks.user')
    .then(projects => res.json(projects))
    .catch(err => res.json(err))
}

function createProject(req,res){
    console.log(req.body)
    Project.create(req.body)
    .then(project => res.json(project))
    .catch(err => res.json(err))
}

