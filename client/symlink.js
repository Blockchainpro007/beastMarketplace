const {symlink} = require('fs');
  
symlink("./node_modules/crypto-browserify/index.js",
        "./src/crypto-browserify/index.js", 'file', (err) => {
  if (err) console.log(err)
  else console.log("done");
);