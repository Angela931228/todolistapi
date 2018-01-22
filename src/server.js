import express from 'express'
import './modules/load'
import './modules/firebase'
import './modules/controllers'
import router from './modules/controllers'

const app = express()

app.use(router)

const port = process.env.PORT || 3000
const server = app.listen(port, () => console.log(`Service is now running on port ${port}`))

export default server
