// Module imports
const validator = require('validator');
const mailgun = require("mailgun-js");

// Import environment variables
const {DOMAIN, API_KEY} = process.env;

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
    // Module imports

// Create a new Mailgun client
const mg = mailgun({apiKey: API_KEY, domain: DOMAIN});
const data = {
	from: "Mailgun Sandbox <postmaster@sandboxc16b4872ad744f9dab3675ccc842718e.mailgun.org>",
	to: "devmax.corl@gmail.com",
	subject: `Contact from ${fullName}: ${email}`,
	text: message
};

mg.messages().send(data, function (error, body) {
    if (error) {
        console.log(error);
        res.status(400).send(error);
    } else {
        res.status(200).send(body);
    }
});
    
    
}
