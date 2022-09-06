const fs = require("fs");

const input = process.argv.slice(2);
let [path, flag1, output1, flag2, output2] = input;
let convert = input.findIndex((flag) => flag == "-t");
let outputDir = input.findIndex((flag) => flag == "-o");

if (!path) {
  console.log("Please insert file path!");
} else if (flag1) {
  if (flag1 === "-h") {
    console.log("$ node app.js -h : help");
    console.log("$ node app.js path : will convert file on path");
    console.log(
      "$ node app.js path -t json : will convert file on path to json file"
    );
    console.log(
      "$ node app.js path -t text : will convert file on path to plain text file"
    );
    console.log(
      "$ node app.js path -o output : will convert file on path at output directory"
    );
    console.log(
      "$ node app.js path -t json -o output : will convert file on path to json file at output directory"
    );
    console.log(
      "$ node app.js path -t text -o output : will convert file on path to plain text file at output directory"
    );
  } else {
    let readFile = fs.readFileSync(path, "utf-8");
    if (outputDir != -1) {
      if (!input[outputDir + 1]) {
        console.log("Please input directory for output!");
      } else {
        path = input[outputDir + 1];
      }
    } else {
      if (path.includes(".txt")) {
        path = path.replace(".txt", ".json");
      } else if (path.includes(".json")) {
        path = path.replace(".json", ".txt");
      }
    }
    if (convert != -1) {
      if (!input[convert + 1]) {
        console.log("Please input format for output!");
      } else {
        if (input[convert + 1] === "json") {
          readFile = JSON.parse(readFile);
          fs.writeFileSync(path, readFile);
        } else if (input[convert + 1] === "text") {
          readFile = JSON.stringify(readFile, null, 2);
          fs.writeFileSync(path, readFile);
        }
      }
    }
  }
} else {
  let readFile = fs.readFileSync(path, "utf-8");
  readFile = JSON.stringify(readFile, null, 2);
  path = path.replace(".json", ".txt");
  fs.writeFileSync(path, readFile);
}
