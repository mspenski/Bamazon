var mysql = require("mysql");
var inquirer = require("inquirer")

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("You are logged in as id " + connection.threadId + "\n");
  // run the start function after the connection is made to prompt the user
  initialDisplay();
});



// initial start prompt
function initialDisplay() {

  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log("Available items.......... ")
    console.log(res)
  });
  // Run next function
  chooseProduct();
}

// product selection screen
function chooseProduct() {

  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log("Ready to order.......... ")


    inquirer
      .prompt([
        {
          name: "productID",
          type: "input",
          message: "what is the ID of the product that you would like to buy?",
        },
        {
          name: "numUnits",
          type: "input",
          message: "How many units would you like to buy?",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function (answer) {
        // if (answer.numUnits > res) { }
        console.log(answer[i]);
      })
  });
}

