var jsondb = require("../db/db.json");
var fs = require("fs");
var counter = jsondb.length

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        console.log(jsondb);
        res.json(jsondb);
    });

    app.post("/api/notes", function (req, res) {
        var newNote = req.body;
        // newNote.id=Math.floor(Math.random()*10000000000)
        counter++
        newNote.id = String(counter)
        jsondb.push(newNote);
        console.log(jsondb);
        fs.writeFile("./db/db.json", JSON.stringify(jsondb), function (err) {
            if (err) {
                console.log(err);
            }
            res.json(newNote);
        });

    });

    app.delete("/api/notes/:id", function (req, res) {
        const index = req.params.id;
        var newArray = []
        for (let i = 0; i < jsondb.length; i++) {
            if (jsondb[i].id !== index) {
                newArray.push(jsondb[i])
            }
        }
        jsondb=newArray
        fs.writeFile("./db/db.json", JSON.stringify(newArray), function (err) {
            if (err) {
                console.log(err);
            }
            res.json(newArray)
        });
    });
}