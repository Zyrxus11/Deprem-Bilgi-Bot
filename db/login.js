const { connect } = require("mongoose")
const system = require("../config.js")

module.exports = async(client) => {
    connect(system.mongo,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false
        })
        .then(() => {
            console.log("[MONGODB] Başarılı bir şekilde giriş sağlandı.")
        }).catch(err => {
            console.log("[MONGODB] Mongo'ya bağlanırken hata oluştu ve giriş sağlanılamadı.")
        })
}
