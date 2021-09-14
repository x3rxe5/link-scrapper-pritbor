const rp = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const scrapper = require("./scrapper");
const express = require("express");
const app = express();
const cors = require("cors");
const scrap = require("./test");
const morgan = require("morgan");
const axios = require("axios");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


const main  = () => {
  let list;
  rp(url)
    .then(async function(html){
      
      const $ = cheerio.load(html);
      
      let wikiUrls = new Array();
      let len = $('td > b > a').length
  
      for(let i=0;i<len;i++){
        wikiUrls.push($('td > b > a')[i].attribs.href);
      }
  
  
      list = await returnPresidentData(wikiUrls,len);
        
    })
    .catch(function(err){
      console.log(err);      
    });
    
    return list;
}


const returnPresidentData = async (url,len) => {
  const presidentInfoList = new Array();

  for(let i=0;i<len;i++){
    let newUrl = 'https://en.wikipedia.org' + url[i];
    
    
    await rp(newUrl).then(function(html){
      const $ = cheerio.load(html);
      
      presidentInfoList.push(
        {
          name: $('.firstHeading', html).text(),
          birthday: $('.bday', html).text(),
        }
      )
    }).catch(function(err){
      console.log(`error occured ${err}`);
    })
  }

  
  return presidentInfoList;
}

const jsonData = main();

app.get("/",(req,res) => {
  res.status(200).json({
    status:"SUCCESS",
    message:"YOU SUCCESSFULLY HIT THE ROUTE"    
  })
})

app.get("/president",async (req,res) => {
  await jsonData;
  res.status(200).json({
    status:"SUCCESS",
    jsonData
  })
});

app.get("/reddit", async (req,res) => {
  try{
    const data = await JSON.stringify(scrap());
    res.status(200).json({
      status:"success",
      data
    })
  }catch(err){
    console.log(err);
  }
});

app.post("/randomWebsite", async (req,res) => {
  try{
    const { url,tag } = await req.body;
    
    const resp = await scrapper(url,tag);
    

    await res.status(200).json({
      status:"success",
      resp      
    })
  }catch(Err){
    console.log(Err);
    res.status(400).json({
      status:"FAILED",
      Err
    })
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`App is Listening on PORT ${PORT}`)
});