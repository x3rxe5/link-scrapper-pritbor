const cheerio = require("cheerio");
const axios = require("axios");
const puppeteer = require("puppeteer");


const scrapper = async (url,tag) => {
    try{        
        console.log(url);
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const resp = $(tag);
        let arr = new Array();
        resp.each((id,elem) => {
            if(id <= 9){
                arr.push(elem.attribs.href)                
            }
        });

        return arr;
    }catch(err){
        console.log(err);
    }
}


module.exports = scrapper;