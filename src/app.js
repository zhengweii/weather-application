const path = require("path");
const express = require("express");
const hbs = require("hbs");

// Local imports
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Serving static files
app.use(express.static(path.join(__dirname, "../public")));

// For dynamic templates
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help"
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({ err: "Please enter an address" });
    }

    geocode(req.query.address, (err, response) => {
        if (err) {
            return res.send({ err });
        }

        let latLng = response.locations[0].latLng;

        forecast(latLng.lng, latLng.lat, (err, response) => {
            if (err) {
                return res.send({ err });
            }

            res.send({
                address: req.query.address,
                summary: response.summary,
                temperature: response.temperature
            });
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Error",
        errorMsg: "Help article does not exist"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "Error",
        errorMsg: "Page not found"
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
