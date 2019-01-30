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
  // run the chooseProduct function after the connection is made to prompt the user
  chooseProduct();
});


function chooseProduct() {

  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log("Ready to order.......... ")
    console.log(res + "\n")


    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].product_name);
            }
            return choiceArray;
          },
          message: "what is the ID of the product that you would like to buy?\n"
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
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < res.length; i++) {
          if (res[i].product_name === answer.choice) {
            chosenItem = res[i];
          }
        }

        if (chosenItem.stock_quantity >= parseInt(answer.numUnits)) {

          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: (chosenItem.stock_quantity - answer.numUnits)
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function (err, res) {
              if (err) throw err;
              console.log("\nOrder placed successfully!")
              console.log("your total cost was $" + (chosenItem.price * answer.numUnits) + "\n")
              connection.end();
            }
          );
        } else {
          console.log("not enough in stock, try again")
          chooseProduct();
        }
      })
  });
}

