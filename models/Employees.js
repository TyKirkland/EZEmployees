const {mongoose} = require('../config/connection');

const Schema = mongoose.Schema;

const employeesSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    }
    // need to add job category addition ability
    // need to add day and time availability options
    //need to link the employee with the workplace
})

const Employees = mongoose.model('employees', employeesSchema);

module.exports = Employees;