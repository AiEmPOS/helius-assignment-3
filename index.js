const express = require("express");
const app = express();
const router = express.Router();

app.use(express.json());
app.use("/", router);

function inputValidation(input){
    if(isNaN(input) || input < 0){
        return false;
    }
    return true;
}

function calculateTax(income){
    if(!inputValidation(income)){
        return "An input is not a positive number";
    }
    if(income <= 150000){
        return 0;
    }else if (income <= 300000) {
        return income * 0.05;
    }else if (income <= 500000) {
        return income * 0.1;
    }else if (income <= 750000) {
        return income * 0.15;
    }else if (income <= 1000000) {
        return income * 0.2;
    }else if (income <= 2000000) {
        return income * 0.25;
    }else if (income <= 5000000) {
        return income * 0.30;
    }else{
        return income * 0.35
    }
}

router.get("/calculate-tax/:income", function (req, res) {
    const income = req.params.income;
    const output = Math.round(calculateTax(income) * 100) / 100;
    res.json({output : output});
    res.end();
});

app.listen(8080, function () {
    console.log("Listening at Port " + 8080);
});