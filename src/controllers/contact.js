// Module imports
const { Form } = require('multiparty');
const validator = require('validator');

const nodemailer = require("nodemailer");

/**
 * Handles contact request
 * @param {Request} req 
 * @param {Response} res 
 * @return {Response} 
 */
module.exports = ({body: {fullName, email, message}}, res) => {
    let response = {data: null, error: false, message: ''}

    if(!fullName || !email || !message) {
        response = {...response, error: true, message: 'All fields are required'}
    }

    if(!validator.isEmail(email)) response = {...response, error: true, message: "Email is invalid"}

    if(response.error) return res.status(400).send(response);

    // ! Email site owner
    
}
