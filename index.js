const core = require("@actions/core");
const github = require("@actions/github");
const { fetch } = require("undici");
const fs = require("fs/promises");
const data = require("./data.json");
(async function () {
  try {
    // `who-to-greet` input defined in action metadata file
    // const nameToGreet = core.getInput('who-to-greet');
    // console.log(`Hello ${nameToGreet}!`);
    const time = new Date().toTimeString();
    core.setOutput("time", time);
    const res = await fetch(
      "https://api.openweathermap.org/data/2.5/air_pollution?lat=28&lon=77&appid=41bef1d1ddc74b3a74a8bc031d21e70d"
    );
    const jsonRes = await res.json();
    console.log(
      "jsonRes.list[0].components.pm2_5",
      jsonRes.list[0].components.pm2_5
    );
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2);
    // console.log(`The event payload: ${payload}`);
    console.log(
      '("noOfcigarette", jsonRes.list[0].components.pm2_5)',
      "noOfcigarette",
      jsonRes.list[0].components.pm2_5
    );
    const newData = { ...data, newField: jsonRes.list[0].components.pm2_5 };
    console.log("newData", newData);
    core.setOutput("noOfcigarette", jsonRes.list[0].components.pm2_5);
  } catch (error) {
    core.setFailed(error.message);
  }
})();
