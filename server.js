import path from 'path'
import express from 'express'
import helmet from 'helmet'

const app = express()

app.use(helmet())
app.use(express.static(path.join(__dirname, 'build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.set('port', process.env.PORT || 3000)

const server = app.listen(app.get('port'), () => {
  console.log('listening on port ', server.address().port)
})
