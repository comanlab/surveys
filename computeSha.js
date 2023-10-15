// Computes sha1 hash for each survey file and score file, saving them to sha.json.
// These let us store a fingerprint of the survey with the data, so we know exactly which
// version of the specific survey generated the data.

const crypto = require("crypto");
const { globSync } = require("glob");
const fs = require("fs");

const winston = require("winston");

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

function checksumSurvey(surveyName) {
  const surveyFilePath = `surveys/${surveyName}/${surveyName}.json`;
  const scoreFilePath = `surveys/${surveyName}/${surveyName}.score.js`;
  const shaFilePath = `surveys/${surveyName}/sha.json`;

  const surveyContents = fs.readFileSync(surveyFilePath);
  const scoreContents = fs.readFileSync(scoreFilePath);

  const sha = {
    survey: crypto.createHash("sha1").update(surveyContents).digest("hex"),
    score: crypto.createHash("sha1").update(scoreContents).digest("hex"),
  };

  fs.writeFile(shaFilePath, JSON.stringify(sha), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

const dirs = globSync("surveys/*/");
const surveyNames = dirs.map((dir) => dir.split("/")[1]);
surveyNames.forEach(checksumSurvey)
