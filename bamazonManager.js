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
        choices: ["View Products", "Low Inventory", "Add To Inventory", "Add New Product"]
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
      }
    })
}

// the app should list every available item: the item IDs, names, prices, and quantities
function viewProducts() {
  console.log("view products");
  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
    if (err) throw err;
    console.log(res)
  })
  connection.end();
};

// function for showing items with a count of <5
function lowInventory() {
  console.log("products with low inventory");
  connection.query("SELECT product_name, stock_quantity FROM products WHERE stock_quantity < 6", function (err, res) {
    // if (err) throw err;
    // console.log(res);
    if (res === []) {
      console.log("No products currently low on inventory")
    } else { console.log("deez nuts") }
  })
  connection.end();
};

// your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory() {
  console.log("add inventory");
};

// allow the manager to add a completely new product to the store.
function addProduct() {
  console.log("add product");
};