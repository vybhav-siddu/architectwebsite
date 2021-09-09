const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    user_name: {
        type: String
    },
    user_email: {
        type: String
    },
    user_contact: {
        type: String
    },
    user_message: {
        type: String
    },
})

//create collection
const contact_con = new mongoose.model("contact", contactSchema);

module.exports = contact_con;