/** Command-line tool to generate Markov text. */


const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");



function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}



function makeText(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });

}



async function makeURLText(url) {
  try {
    resp = await axios.get(url);
  } catch (e) {
    console.e(`Cannot read URL: ${url}: ${e}`);
    process.exit(1);
  }
  generateText(resp.data)
}



let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
}

else if (method === "url") {
  makeURLText(path);
}

else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}