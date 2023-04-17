const express = require('express');
const router = express.Router();

const { Employees } = require('../models/Employees');
const Workplaces = require('../models/Workplaces');

//routes

//workplace index route
router.get('', async (req, res, next) => {
    try{
        let myWorkplaces;
        myWorkplaces = await Workplaces.find({});
        res.render('workplaces/index', {workplaces: myWorkplaces});
    }
    catch(err){
        console.log(err);
        next();
    }
})

//workplace post route
router.post('', async (req, res, next) => {
    try{
        const newWorkplace = await Workplaces.create(req.body);
        res.redirect('schedules');
    }
    catch(err){
        res.redirect('schedules/new');
        next();
    }
})

//workplace create route
router.get('/new', (req, res) => {
    res.render('workplaces/new');
})

//workplace edit page route
router.get('/:id/edit', async (req, res, next) => {
    try{
        const workplaceToBeEdited = await Workplaces.findById(req.params.id);
        res.render('workplaces/edit', {workplace: workplaceToBeEdited});
    }
    catch(err){
        console.log(err);
        next();
    }
})

//workplace update route
router.put('/:id', async (req, res, next) => {
    try{
        const updatedWorkplace = await Workplaces.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/schedules/${req.params.id}`);
    }
    catch(err){
        console.log(err);
        next();
    }
})

//workplace delete route
router.delete('/:id', async (req, res, next) => {
    try{
        const deletedItem = await Workplaces.findByIdAndDelete(req.params.id);
        res.redirect('/schedules');
    }
    catch(err){
        console.log(err);
        next();
    }
})

//workplace show route
router.get('/:id', async (req, res, next) => {
    try{
        const myWorkplace = await Workplaces.findById(req.params.id);
        res.render('workplaces/show', {myWorkplace});
    }
    catch(err){
        console.log(err);
        next();
    }
})

module.exports = router;