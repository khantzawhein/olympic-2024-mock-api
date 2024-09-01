// Node Read JSON File

const { log } = require("console");
const fs = require("fs");
console.log("Reading JSON File");

const data = fs.readFileSync("./db.json", "utf-8");

// console.log(data);

const obj = JSON.parse(data);

const medals = obj.medals;

const index = 1;

for (let index = 0; index < medals.length; index++) {
  const element = medals[index];
  element.id = (index + 1).toString();
}

const output = JSON.stringify(obj);
fs.writeFileSync("./medals-id.json", output);
