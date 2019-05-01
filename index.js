const express = require('express')
const app = express();
const list = require('./src/list/list');
const cart = require('./src/cart/cart');

app.use(express.json());
app.use(list);
app.use(cart);

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, console.log(`Running @ ${PORT}`));

