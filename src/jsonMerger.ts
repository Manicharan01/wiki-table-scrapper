import fs from "fs";

let filename = "Season";

let fullEpisodeList: any = {};

let totalNumberOfSeasons = 0; //Here instead of 0 enter total number of seasons you scrapped

for (let i = 1; i <= totalNumberOfSeasons; i++) {
  const episodes = JSON.parse(
    fs.readFileSync(`files/Season${i}.json`, "utf-8"),
  );

  fullEpisodeList[filename + String(i)] = episodes;
}

fs.writeFileSync("files/FullEpisodeList.json", JSON.stringify(fullEpisodeList));
