const fs = require("fs");

const rawData = fs.readFileSync("./raw.json", "utf-8");

const medalNOC = JSON.parse(rawData).medalNOC;

const dataByCountry = [];

for (let index = 0; index < medalNOC.length; index++) {
  const element = medalNOC[index];
  const sport = element.sport;
  const sportMedalsObj = {
    [sport]: {
      gold: element.gold,
      silver: element.silver,
      bronze: element.bronze,
      total: element.total,
    },
  };
  const fullObj = {
    id: element.organisation.code,
    country: {
      code: element.organisation.code,
      name: element.organisation.description,
    },
    medalsBySport: { ...sportMedalsObj },
  };

  const countryIndex = dataByCountry.findIndex((el) => el.country.code === element.organisation.code);
  if (countryIndex !== -1) {
    Object.assign(dataByCountry[countryIndex].medalsBySport, sportMedalsObj);
  } else {
    dataByCountry.push(fullObj);
  }
}

fs.writeFileSync("./country-medals.json", JSON.stringify(dataByCountry));
