var mysql = require("mysql");
var inquirer = require("inquirer");
// connection
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
}); connection.connect(function (err) {
  if (err) throw err;
  console.log("You are logged in as id " + connection.threadId + "\n");
  // run the chooseProduct function after the connection is made to prompt the user
  showMenu();
});

// initial menu
function showMenu() {

  inquirer
    .prompt([
      {
        name: "managerMenu",
        type: "list",
        message: "Welcome to the Main Menu!",
        choices: ["View Products", "Low Inventory", "Add To Inventory", "Add New Product", "Exit"]
      }
    ])
    .then(function (answer) {
      if (answer.managerMenu === "View Products") {
        viewProducts();
      } else if (answer.managerMenu === "Low Inventory") {
        lowInventory();
      } else if (answer.managerMenu === "Add To Inventory") {
        addInventory();
      } else if (answer.managerMenu === "Add New Product") {
        addProduct();
      } else if (answer.managerMenu === "Exit") {
        exit();
      }
    })
}

// the app should list every available item: the item IDs, names, prices, and quantities
function viewProducts() {
  console.log("view products");
  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
    if (err) throw err;
    console.log(res)
    showMenu()
  })
};

// function for showing items with a count of <5
function lowInventory() {

  connection.query("SELECT product_name, stock_quantity FROM products WHERE stock_quantity < 6", function (err, res) {
    if (err) throw err;

    if (!res.length) {
      console.log("\nNO PRODUCTS CURRENTLY LOW ON INVENTORY\n");
      showMenu();
    } else {
      console.log("products with low inventory:\n");
      console.log(res);
      console.log("\n")
      showMenu();
    }
  })

};

// your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory() {
  console.log("add inventory");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "chooseProduct",
          type: "input",
          message: "What is the ID of the product that you want to add inventory to?",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          name: "howMany",
          type: "input",
          message: "How many would you like to add?",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])

      .then(function (answer) {
        // console.log(answer)
        // console.log(res)
        var chosenItem;
        var newInventory;
        for (var i = 0; i < res.length; i++) {
          if (parseInt(res[i].item_id) === parseInt(answer.chooseProduct)) {
            chosenItem = res[i].item_id;
            var newInventory = parseInt(answer.howMany) + parseInt(res[i].stock_quantity);
            connection.query("UPDATE products SET ? WHERE ?",
              [{
                stock_quantity: newInventory
              },
              {
                item_id: chosenItem
              }]);
            console.log("Item added successfully!")
            showMenu();
          }
        }
      });
  });
}

// allow the manager to add a completely new product to the store.
function addProduct() {
  console.log("add product");
  inquirer
    .prompt([
      {
        name: "itemName",
        type: "input",
        message: "What is the name of the item you would like to add?"
      },
      {
        name: "deptName",
        type: "input",
        message: "What department would you like to add the item to?"
      },
      {
        name: "price",
        type: "input",
        message: "What is the price of the item you would like to add?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many of the item do we have in stock?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ]).then(function (answer) {
      connection.query("INSERT INTO products SET ?",
        {
          product_name: answer.itemName,
          department_name: answer.deptName,
          price: answer.price,
          stock_quantity: answer.quantity
        }, function (err) {
          if (err) throw err;
          console.log("item added succesfully");
          showMenu();
        }
      )
    })
};

function exit() {
  connection.end();
}