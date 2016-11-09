var express = require('express');
var app = express();
var fs = require('fs');
var json2csv = require('json2csv');
var path = require('path');
//var args = process.argv.slice(2);
var chart = require('./chart');
//app.use(express.static(__dirname + "/public"));
var bodyParser = require('body-parser');
var schedule = require('node-schedule');

app.use(bodyParser.json()); // 2
app.use(bodyParser.urlencoded({
    extended: true
})); // 3

var dirname = "/usr/data/crawl/result/"; //"/usr/data/crawl/result/";//
var naver = "naver/";
var daum = "daum/";
var twitter = "twitter/";
var naverCumulative = "naverCumulative/";
var daumCumulative = "daumCumulative/";
var twitterCumulative = "twitterCumulative/";

var j = schedule.scheduleJob('0 */30 * * * *', function() { //every 30 minutes
    var str = fs.readFileSync('/usr/data/crawl/komoran/twitter/word.txt') + '';
    var args = str.split("/");
    var fields = ['date'];

    args.forEach(function(data) {
        fields.push(data);
    });

    // naver
    fs.readdir(dirname + naver, function(err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            throw err;
        }
        fs.readFile("/usr/data/crawl/komoran/naver/index.txt", 'utf-8', function(err, content) {
            if (err) {
                console.error("Could not list the directory.", err);
                throw err;
            }

            var start = content;
            var tsvData = [];
            var size = files.length;
            start++;
            if (start == size)
                start = 0;

            for (var i = 0; i < size; i++) {
                var data = fs.readFileSync(dirname + naver + start + ".txt", 'utf-8');
                var obj = JSON.parse(data);
                var json = {};

                json.date = 0.5 * (size - i - 1);
                for (var j = 0; j < args.length; j++) {
                    var tmp = obj[args[j]];
                    if (typeof tmp == 'undefined')
                        tmp = 0;
                    json[args[j]] = tmp;
                }
                tsvData.push(json);

                if (start == size - 1)
                    start = 0;
                else
                    start++;
            }
            var tsv = json2csv({
                data: tsvData,
                fields: fields,
                del: '\t'
            });
            fs.writeFile('./public/naver.tsv', tsv, function(err) {
                if (err) throw err;
                console.log('file saved');
            });
        });
    });

    // naverCumulative
    fs.readdir(dirname + naverCumulative, function(err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            throw err;
        }
        fs.readFile("/usr/data/crawl/result/naverCumulative/index.txt", 'utf-8', function(err, content) {
            if (err) {
                console.error("Could not list the directory.", err);
                throw err;
            }

            var start = content;
            var tsvData = [];
            var size = files.length - 1;
            start++;
            if (start == size)
                start = 0;

            for (var i = 0; i < size; i++) {
                var str = "" + start;
                var pad = "000";
                var ans = pad.substring(0, pad.length - str.length) + str;
                var data = fs.readFileSync(dirname + naverCumulative + ans + ".txt", 'utf-8');
                var obj = JSON.parse(data);
                var json = {};

                if (size - 1 == i)
                    json.date = 0;
                else
                    json.date = (size - i) / 48;
                for (var j = 0; j < args.length; j++) {
                    var tmp = obj[args[j]];
                    if (typeof tmp == 'undefined')
                        tmp = 0;
                    json[args[j]] = tmp;
                }
                tsvData.push(json);

                if (start == size - 1)
                    start = 0;
                else
                    start++;
            }
            var tsv = json2csv({
                data: tsvData,
                fields: fields,
                del: '\t'
            });
            fs.writeFile('./public/naverCumulative.tsv', tsv, function(err) {
                if (err) throw err;
                console.log('file saved');
            });
        });
    });

    // daum
    fs.readdir(dirname + daum, function(err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            throw err;
        }
        fs.exists("/usr/data/crawl/komoran/daum/index.txt", function(fileok) {
            if (fileok) fs.readFile("/usr/data/crawl/komoran/daum/index.txt", 'utf-8', function(err, content) {
                if (err) {
                    console.error("Could not list the directory.", err);
                    throw err;
                }

                var start = content;
                var tsvData = [];
                var size = files.length;
                start++;
                if (start == size)
                    start = 0;

                for (var i = 0; i < size; i++) {
                    var data = fs.readFileSync(dirname + daum + start + ".txt", 'utf-8');
                    var obj = JSON.parse(data);
                    var json = {};

                    json.date = 0.5 * (size - i - 1);
                    for (var j = 0; j < args.length; j++) {
                        var tmp = obj[args[j]];
                        if (typeof tmp == 'undefined')
                            tmp = 0;
                        json[args[j]] = tmp;
                    }
                    tsvData.push(json);

                    if (start == size - 1)
                        start = 0;
                    else
                        start++;
                }
                var tsv = json2csv({
                    data: tsvData,
                    fields: fields,
                    del: '\t'
                });
                fs.writeFile('./public/daum.tsv', tsv, function(err) {
                    if (err) throw err;
                    console.log('file saved');
                });
            });
        });
    });

    // daumCumulative
    fs.readdir(dirname + daumCumulative, function(err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            throw err;
        }
        fs.readFile("/usr/data/crawl/result/daumCumulative/index.txt", 'utf-8', function(err, content) {
            if (err) {
                console.error("Could not list the directory.", err);
                throw err;
            }

            var start = content;
            var tsvData = [];
            var size = files.length - 1;
            start++;
            if (start == size)
                start = 0;

            for (var i = 0; i < size; i++) {
                var str = "" + start;
                var pad = "000";
                var ans = pad.substring(0, pad.length - str.length) + str;
                var data = fs.readFileSync(dirname + daumCumulative + ans + ".txt", 'utf-8');
                var obj = JSON.parse(data);
                var json = {};

                if (size - 1 == i)
                    json.date = 0;
                else
                    json.date = (size - i) / 48;
                for (var j = 0; j < args.length; j++) {
                    var tmp = obj[args[j]];
                    if (typeof tmp == 'undefined')
                        tmp = 0;
                    json[args[j]] = tmp;
                }
                tsvData.push(json);

                if (start == size - 1)
                    start = 0;
                else
                    start++;
            }
            var tsv = json2csv({
                data: tsvData,
                fields: fields,
                del: '\t'
            });
            fs.writeFile('./public/daumCumulative.tsv', tsv, function(err) {
                if (err) throw err;
                console.log('file saved');
            });
        });
    });

    // twitter
    fs.readdir(dirname + twitter, function(err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            throw err;
        }
        fs.readFile("/usr/data/crawl/komoran/twitter/index.txt", 'utf-8', function(err, content) {
            if (err) {
                console.error("Could not list the directory.", err);
                throw err;
            }

            var start = content;
            var tsvData = [];
            var size = files.length;
            start++;
            if (start == size)
                start = 0;

            for (var i = 0; i < size; i++) {
                var data = fs.readFileSync(dirname + twitter + start + ".txt", 'utf-8');
                var obj = JSON.parse(data);
                var json = {};

                json.date = 0.5 * (size - i - 1);
                for (var j = 0; j < args.length; j++) {
                    var tmp = obj[args[j]];
                    if (typeof tmp == 'undefined')
                        tmp = 0;
                    json[args[j]] = tmp;
                }
                tsvData.push(json);

                if (start == size - 1)
                    start = 0;
                else
                    start++;
            }
            var tsv = json2csv({
                data: tsvData,
                fields: fields,
                del: '\t'
            });
            fs.writeFile('./public/twitter.tsv', tsv, function(err) {
                if (err) throw err;
                console.log('file saved');
            });
        });
    });

    // twitterCumulative
    fs.readdir(dirname + twitterCumulative, function(err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            throw err;
        }
        fs.readFile("/usr/data/crawl/result/twitterCumulative/index.txt", 'utf-8', function(err, content) {
            if (err) {
                console.error("Could not list the directory.", err);
                throw err;
            }

            var start = content;
            var tsvData = [];
            var size = files.length - 1;
            start++;
            if (start == size)
                start = 0;

            for (var i = 0; i < size; i++) {
                var str = "" + start;
                var pad = "000";
                var ans = pad.substring(0, pad.length - str.length) + str;
                var data = fs.readFileSync(dirname + twitterCumulative + ans + ".txt", 'utf-8');
                var obj = JSON.parse(data);
                var json = {};

                if (size - 1 == i)
                    json.date = 0;
                else
                    json.date = (size - i) / 48;
                for (var j = 0; j < args.length; j++) {
                    var tmp = obj[args[j]];
                    if (typeof tmp == 'undefined')
                        tmp = 0;
                    json[args[j]] = tmp;
                }
                tsvData.push(json);

                if (start == size - 1)
                    start = 0;
                else
                    start++;
            }
            var tsv = json2csv({
                data: tsvData,
                fields: fields,
                del: '\t'
            });
            fs.writeFile('./public/twitterCumulative.tsv', tsv, function(err) {
                if (err) throw err;
                console.log('file saved');
            });
        });
    });

});

app.get("/create", function(req, res) {
    res.sendFile(__dirname + "/form.html");
});


app.post("/create", function(req, res) {
    var arr = req.body.name.filter(function(n) {
        return n !== "";
    });
    var data = arr.join('/');

    fs.writeFileSync('/usr/data/crawl/komoran/twitter/word.txt', data);

    res.redirect('/');
});

app.get("/", function(req, res) {
    res.redirect('/host');
});

app.use('/host', chart);

app.listen(8080, function() {
    console.log('server');
});
