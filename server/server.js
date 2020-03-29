var express = require('express');

var bodyParser = require('body-parser')



var cors = require('cors')

var app = express();
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var sql = require("mssql");

// config for your database
var config = {
    user: 'sa',
    password: 'password', //database password here for sa
    server: 'localhost',
    database: 'SchoolDB'
};

// connect to your database
sql.connect(config, function (err) {

    if (err) console.log(err);

    app.get('/', function (req, res) {



        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('select * from Student', function (err, recordset) {

            if (err) console.log(err)

            // send records as a response
            res.send(recordset);

        });
    });
});

app.post('/', (req, res) => {
    console.log(req.body)
    const stud = req.body
    var request = new sql.Request();

    request.query(`INSERT INTO Student(firstName,lastName)
    VALUES ('${stud.firstName}', '${stud.lastName}')`)
})

var server = app.listen(5000, function () {
    console.log('Server is running..');
});