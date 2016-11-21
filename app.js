var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var json2csv = require('json2csv');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var schedule = require('node-schedule');
var HashMap = require('hashmap');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// variable declaration
var pre = "/usr"; //"c:";//
var dirname = pre + "/data/crawl/result/",
    naver = "naver/",
    daum = "daum/",
    twitter = "twitter/",
    naverCumulative = "naverCumulative/",
    daumCumulative = "daumCumulative/",
    twitterCumulative = "twitterCumulative/";
var allWords = [],
    englishWords = [],
    word = null,
    engine = null;
var title = [],
    url = [];
///////////////////////////////////////////


///////////////////////////////////////////
// every 30 minutes, create new 4 tsv files
///////////////////////////////////////////
var j = schedule.scheduleJob('0 */30 * * * *', function() { //every 30 minutes
    //var str = fs.readFileSync('/usr/data/crawl/komoran/twitter/word.txt') + '';
    //var allWords = str.split("/");

    if (allWords !== null && typeof allWords !== 'undefined' && allWords.length > 0) {
        var fields = ['date'];

        allWords.forEach(function(data) {
            fields.push(data);
        });

        // naver
        fs.readdir(dirname + naver, function(err, files) {
            if (err) {
                console.error("Could not list the directory.", err);
                throw err;
            }
            fs.readFile(pre + "/data/crawl/komoran/naver/index.txt", 'utf-8', function(err, content) {
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
                    for (var j = 0; j < allWords.length; j++) {
                        var tmp = obj[allWords[j]];
                        if (typeof tmp == 'undefined')
                            tmp = 0;
                        json[allWords[j]] = tmp;
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
                });
            });
        });

        // naverCumulative
        fs.readdir(dirname + naverCumulative, function(err, files) {
            if (err) {
                console.error("Could not list the directory.", err);
                throw err;
            }
            fs.readFile(pre + "/data/crawl/result/naverCumulative/index.txt", 'utf-8', function(err, content) {
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
                    for (var j = 0; j < allWords.length; j++) {
                        var tmp = obj[allWords[j]];
                        if (typeof tmp == 'undefined')
                            tmp = 0;
                        json[allWords[j]] = tmp;
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
                });
            });
        });

        // daum
        fs.readdir(dirname + daum, function(err, files) {
            if (err) {
                console.error("Could not list the directory.", err);
                throw err;
            }
            fs.exists(pre + "/data/crawl/komoran/daum/index.txt", function(fileok) {
                if (fileok) fs.readFile(pre + "/data/crawl/komoran/daum/index.txt", 'utf-8', function(err, content) {
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
                        for (var j = 0; j < allWords.length; j++) {
                            var tmp = obj[allWords[j]];
                            if (typeof tmp == 'undefined')
                                tmp = 0;
                            json[allWords[j]] = tmp;
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
            fs.readFile(pre + "/data/crawl/result/daumCumulative/index.txt", 'utf-8', function(err, content) {
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
                    for (var j = 0; j < allWords.length; j++) {
                        var tmp = obj[allWords[j]];
                        if (typeof tmp == 'undefined')
                            tmp = 0;
                        json[allWords[j]] = tmp;
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
                });
            });
        });

        console.log('file saved');
    }
});
///////////////////////////////////////////


app.get("/", function(req, res) {
    res.redirect('/search');
});

///////////////////////////////////////////
//// register words  '/create'
///////////////////////////////////////////
app.get("/create", function(req, res) {
    res.render("form", {
      allWords: allWords,
      englishWords: englishWords
    });
});

app.post("/create", function(req, res) {
    if (req.body.allWords.length === 0) {
      allWords = [];
      englishWords = [];
    } else {
      allWords = req.body.allWords.split(',');
      englishWords = req.body.englishWords.split(',');
    }

    res.redirect('/search');
});
///////////////////////////////////////////


///////////////////////////////////////////
//// search word  '/search'
///////////////////////////////////////////
app.get("/search", function(req, res) {
    if (allWords === null) {
        allWords = [];
        englishWords = [];
    }
    res.render("search", {
        name: allWords
    });
});

app.post("/search", function(req, res) {
    word = req.body.wordList; //arr.join('/');
    engine = req.body.engineList;

    if (word !== null && word !== undefined && typeof word !== undefined) {
        var data = fs.readFileSync(pre + "/data/crawl/article/title/daumTitles.txt");
        data += fs.readFileSync(pre + "/data/crawl/article/title/naverTitles.txt");
        data = data.toString().split('\n');

        url = [];
        title = [];
        var map = new HashMap();

        var k = 0;
        for (i = 0; i < data.length; i++) {
            if (/^\s*$/.test(data[i]))
                continue;
            var tmp = data[i].split(/,(.+)?/);
            if (tmp[1].indexOf(word) > -1) {
                map.set(tmp[1], tmp[0]);
            }
        }
        map.forEach(function(value, key) {
            url[k] = value;
            title[k] = key;
            k++;
        });
        res.redirect('/view');
    } else {
        res.redirect('/search');
    }
});
///////////////////////////////////////////


///////////////////////////////////////////
//// show charts  '/view'
///////////////////////////////////////////
app.use("/view", function(req, res) {
    if (word !== null && engine !== null) {
        var i = 0;
        for (i; i < allWords.length; i++)
            if (allWords[i] == word)
                break;
        res.render("index", {
            name: word,
            ename: englishWords[i],
            url: url,
            title: title,
            engine: engine
        });
    } else {
        res.redirect('/search');
    }
});
///////////////////////////////////////////


http.createServer(app).listen(8080, function() {
    console.log("server start");
});
