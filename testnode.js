const fs = require("fs");

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", function (error, data) {
      if (error) return reject(error);

      // console.log(fileName)
      // console.log(data)

      resolve(data);
    });
  });
}
readFile("Edward.txt").then((string) => {
  const stringArray = string.split("\n")
  const dialogueArray = stringArray.map((y, index) => {
    const dialogueObject = {};
    if (y.indexOf(":") > -1) {
      const personArray = y.split("  ").filter((d) => d);
      dialogueObject["time"] = personArray[1];
      dialogueObject["person"] = personArray[0];
      dialogueObject["dialogue"] = stringArray[index + 1];
      console.log(dialogueObject)
      return dialogueObject;
    }
  }).filter((d) => d);
  fs.writeFileSync("quotes.json", JSON.stringify(dialogueArray)); 
});
