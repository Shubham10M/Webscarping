let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard"
let request = require("request");
let fs = require("fs");
// npm i cheerio
let cheerio = require("cheerio");
function processinglematch(url) {

    request(url, cb);
}
request(url,cb);
function cb(error, response,html){
    if(error){
        console.log(error); // print the error if  occured

    }
    else if(response.statusCode == 404){
         console.log("Page Not found");
    }
    else{
        dataExtracter(html);
        //console.log(html)
    }
}
function dataExtracter(html){
    // search tool
    let searchTool = cheerio.load(html);
    let bothinningsArr = searchTool(".Collapsible");
    let scoreCard  = " ";
    for(let i = 0; i < bothinningsArr.length;i++){
        scoreCard = searchTool(bothinningsArr[i]).html();
        let teamNameElem = searchTool(bothinningsArr[i]).find("h5");
        let teamName = teamNameElem.text();
        teamName = teamName.split("INNINGS")[0];
         teamName = teamName.trim();
         console.log(teamName);

         let batsManTableBodyAllRows  = searchTool(bothinningsArr[i]).find(".table-batsman tbody tr");
         for(let j = 0; j < batsManTableBodyAllRows;j++){
             let numberofTds = searchTool(batsManTableBodyAllRows[j]).find("td");

             // console.log(numberofTds.length);
            if (numberofTds.length == 8) {
                // console.log("You are valid")
                let playerName = searchTool(numberofTds[0]).text();
                console.log(playerName);
            }
         }
         //console.log("...........................................");
          fs.writeFileSync(`innning${i+1}.html`,scoreCard);
    }
     // players name
}
module.exports = {
    processinglematch
}