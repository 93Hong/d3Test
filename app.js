var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var json2csv = require('json2csv');
var args = process.argv.slice(2);

fs.readFile('C:\\Data\\crawl\\komoran\\komoResult1.txt', 'utf8', function (err, data) {
    if (err) throw err;
    var obj = JSON.parse(data);

    var fields = ['age', 'population'];
    var tsvData = [];

    for (var i = 0; i < args.length; i++) {      
        var json = new Object();
        json.age = args[i];
        json.population = obj[args[i]];
        tsvData.push(json);
    }
    console.log(tsvData);

    var tsv = json2csv({ data: tsvData, fields: fields, del: '\t' });
    fs.writeFile('./public/data.tsv', tsv, function(err) {
        if (err) throw err;
        console.log('file saved');
    });
});

app.use(express.static(__dirname + '/public'));

//app.get('/', function(req, res) {
//  res.send('he');
//});

app.listen(8000, function() {
  console.log('server');
});
