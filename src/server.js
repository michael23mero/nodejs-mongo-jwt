const express = require('express')

class Servidor{
    constructor(){
        this.app = express()
        this.port = process.env.PORT

        require('./config/dbc').dbc()

        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
    }

    routes(){
        this.app.get('/', (req, res) => {
            res.json({
                mensaje: "Biemvenid@"
            })
        })
        this.app.use('/api/v1/user', require('./routes/user.routes'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor a su servicio en el puerto: ${this.port}`)
        })
    }
}

module.exports = Servidor;
