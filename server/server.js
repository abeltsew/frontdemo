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


if (process.env.NODE_ENV === 'production') {
    var config = {
        user: 'sa',
        password: `${process.env.DB_PASSWORD}`, //database password here for sa
        server: `${process.env.DB_PASSWORD}`,
        database: 'SchoolDB'
    };

} else {
    var config = {
        user: 'sa',
        password: 'El$hu5ebe', //database password here for sa
        server: 'localhost',
        database: 'SchoolDB'
    };
}




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

app.delete('/:id', (req, res) => {
    console.log('delete', req.params)
    var request = new sql.Request();

    request.query(`DELETE FROM Student WHERE firstName ='${req.params.id}'`)

})



if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    //if rout not an api

    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
var server = app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}..`);
});