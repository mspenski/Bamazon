var mysql = require("mysql");
var inquirer = require("inquirer");
// connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
}); connection.connect(function (err) {
  if (err) throw err;
  console.log("You are logged in as id " + connection.threadId + "\n");
  // run the showMenu function after the connection is made to prompt the user
  showMenu();
});

// initial menu
function showMenu() {

  inquirer
    .prompt([
      {
        name: "supervisorMenu",
        type: "list",
        message: "Welcome to the Main Menu!",
        choices: ["View Product Sales by Department", "Create New Department", "Exit"]
      }
    ])
    .then(function (answer) {
      if (answer.supervisorMenu === "View Product Sales by Department") {
        viewSales();
      } else if (answer.supervisorMenu === "Create New Department") {
        addDepartment();
      } else if (answer.supervisorMenu === "Exit") {
        exit();
      }
    })
}

// the app should display a summarized table in the terminal window with department_id, department_name, over_head_costs, product_sales, total_profit
//the total_profit column should not be stroed in any database, it should be created using a custom alias
function viewSales() {
  connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales FROM departments INNER JOIN products ON departments.department_name=products.department_name",
    function (err, res) {
      if (err) throw err;
      console.log(res);
      showMenu();
    }
  )
}

function addDepartment() {

}

function exit() {
  connection.end();
}