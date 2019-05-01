
const dbName = 'shoppy';
const userName = 'jayand017';
const password = 'Jsoft1989';
const uri = `mongodb+srv://${userName}:${password}@cluster001-hdeor.mongodb.net/${dbName}?retryWrites=true`;

const colList = 'list';
const colCart = 'cart';

module.exports = {uri, dbName, colList, colCart};