import express from 'express'
import router from "./router.js";
import fileUpload from 'express-fileupload';

const PORT = process.env.BACKEND_PORT || 8080;

const app = express()


app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
app.use(express.json()))
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)