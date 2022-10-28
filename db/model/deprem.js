const mongoose = require("mongoose")

module.exports = mongoose.model("System", new mongoose.Schema({
    kanal: String,
    sunucu: String,
    status: String,
    channel: String
}))