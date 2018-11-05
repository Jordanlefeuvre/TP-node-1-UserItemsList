const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const user = require('./user')
app.use('/user', user)

const items = require('./items');
app.use('/items', items);

const list = require('./list');
app.use('/list', list);

app.listen(9999, () => {
    console.log('App listening on port 9999')
})
