var path = require('path');


async function getDocumentation(req,res){
   res.sendFile(path.resolve('documentation/index.html'));
}
  
module.exports = {
  getDocumentation
  }