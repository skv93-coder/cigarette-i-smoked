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
      "https://api.waqi.info/feed/geo:31.64;74.87/?token=40862c856cd1e5b206f1634c8d66f18edeb15900"
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
