const needle = require("needle")
const fs = require("fs")


async function getRequest(url){
    const resultt = await needle("get",url);
    return resultt.body;
}
module.exports = getRequest