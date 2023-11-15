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
      "https://api.waqi.info/feed/amritsar/?token=59001329754abfc9a23f07f4daf19a54f43f74d0"
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
