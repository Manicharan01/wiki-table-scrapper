import fs from "fs";

const table = JSON.parse(fs.readFileSync("", "utf-8")); //In qutoes enter the file name of the tables scrapped from index.ts

const fileName = ""; //Here add file name according to season number, so that episodes are written according season

interface EpisodeList {
  [index: number]: string;
}

const seasonList: EpisodeList = {};

let idx = 1;
Object.keys(table).map((key) => {
  if (table[key]) {
    let line = "";
    Object.keys(table[key]).map((some) => {
      if (some === "0") {
        line += table[key][some];
      } else if (some === "1") {
        line += ", " + '"' + table[key][some].split('"')[1] + '"' + ", ";
      } else if (some === "2") {
        line += '"' + table[key][some] + '"' + ", ";
      } else if (some === "3") {
        line += '"' + table[key][some] + '"' + ", ";
      } else if (some === "5") {
        line += '"' + table[key][some].split("[")[0] + '"';
      }
    });
    if (line) {
      console.log(line);
      seasonList[idx] = line;
      idx += 1;
      fs.appendFileSync(`files/${fileName}.csv`, "\n" + line);
    }
  }
});

console.log(seasonList);
fs.writeFileSync(`files/${fileName}.json`, JSON.stringify(seasonList));
