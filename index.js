const core = require("@actions/core");
const github = require("@actions/github");
const { fetch } = require("undici");
const fs = require("fs/promises");
const data = require("./data.json");

(async function () {
  try {
    const time = new Date().toTimeString();
    core.setOutput("time", time);
    const res = await fetch(
      `https://api.waqi.info/feed/amritsar/?token=${process.env.API_TOKEN}`
    );
    const jsonRes = await res.json();

    const newData = {
      ...data,
      [new Date().toLocaleDateString()]: jsonRes.data.iaqi.pm25.v,
    };
    await fs.writeFile("./data.json", JSON.stringify(newData));
    core.setOutput("noOfcigarette", jsonRes.data.iaqi.pm25.v);
  } catch (error) {
    core.setFailed(error.message);
  }
})();
