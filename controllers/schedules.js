const express = require('express');
const router = express.Router();

const Employees = require('../models/Employees');
const Workplaces = require('../models/Workplaces');
const Shifts = require('../models/Shifts');

//routes

//workplace index route
router.get('', async (req, res, next) => {
    try{
        let myWorkplaces;
        myWorkplaces = await Workplaces.find({user: req.session.currentUser.id});
        res.render('workplaces/index', {workplaces: myWorkplaces, user: req.session.currentUser});
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
    res.render('workplaces/new', {user: req.session.currentUser});
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
        const myEmployees = await Employees.find({});
        const myShifts = await Shifts.find({});

        res.render('workplaces/show', {myWorkplace, myEmployees, myShifts});
    }
    catch(err){
        console.log(err);
        next();
    }
})

//shift create page route
router.get('/:id/newshift', async (req, res, next) => {
    const myEmployees = await Employees.find({});
    const workplaceID = req.params.id;
    res.render('shifts/new', {myEmployees, workplaceID});
})

//shift post route
router.post('/:id/shift', async (req, res, next) => {
    try{
        const newShift = await Shifts.create(req.body);
        res.redirect(`/schedules/${req.params.id}`);
    }
    catch(err){
        res.redirect('/error');
        next();
    }
})

//shift edit page route
router.get('/:workplaceid/:shiftid/shift', async (req, res, next) => {
    try{
        const shiftToBeEdited = await Shifts.findById(req.params.shiftid);
        const myEmployees = await Employees.find({});
        res.render('shifts/edit', {shift: shiftToBeEdited, workplaceID: req.params.workplaceid, myEmployees});
    }
    catch(err){
        console.log(err);
        next();
    }
})

//shift update route
router.put('/:workplaceid/:shiftid/shift', async (req, res, next) => {
    try{
        const updatedShift = await Shifts.findByIdAndUpdate(req.params.shiftid, req.body);
        res.redirect(`/schedules/${req.params.workplaceid}`);
    }
    catch(err){
        console.log(err);
        next();
    }
})

//shift delete route
router.delete('/:workplaceid/:shiftid/shift', async (req, res, next) => {
    try{
        const deletedItem = await Shifts.findByIdAndDelete(req.params.shiftid);
        res.redirect(`/schedules/${req.params.workplaceid}`);
    }
    catch(err){
        console.log(err);
        next();
    }
})


//employee create page route
router.get('/:id/newemployee', async (req, res, next) => {
    const employeesWorkplace = await Workplaces.findById(req.params.id);
    res.render('employees/new', {employeesWorkplace});
})

//employee post route
router.post('/:id/employee', async (req, res, next) => {
    try{
        const newEmployee = await Employees.create(req.body);
        res.redirect(`/schedules/${req.params.id}`);
    }
    catch(err){
        res.redirect('/schedules');
        next();
    }
})

//employee edit page route
router.get('/:workplaceid/:employeeid', async (req, res, next) => {
    try{
        const employeeToBeEdited = await Employees.findById(req.params.employeeid);
        res.render('employees/edit', {employee: employeeToBeEdited, workplaceID: req.params.workplaceid});
    }
    catch(err){
        console.log(err);
        next();
    }
})

//employee update route
router.put('/:workplaceid/:employeeid', async (req, res, next) => {
    try{
        const updatedEmployee = await Employees.findByIdAndUpdate(req.params.employeeid, req.body);
        res.redirect(`/schedules/${req.params.workplaceid}`);
    }
    catch(err){
        console.log(err);
        next();
    }
})

//employee delete route
router.delete('/:workplaceid/:employeeid', async (req, res, next) => {
    try{
        const deletedItem = await Employees.findByIdAndDelete(req.params.employeeid);
        res.redirect('/schedules');
    }
    catch(err){
        console.log(err);
        next();
    }
})

module.exports = router;