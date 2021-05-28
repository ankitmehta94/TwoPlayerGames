console.log("nothing rand");
function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function convertVttToJson(data) {
  const dialougeArray = [];
  let stringArray = data.split("\n");
  console.log(stringArray);
  stringArray.forEach((line, index) => {
    if (line.indexOf("-->") > -1) {
      let dialouge = stringArray[index + 1].replace("\r", "");
      // console.log(dialouge)
      if (dialouge.indexOf(":") > -1) {
        let dialougeSplit = dialouge.split(":");
        let dialougeText = dialougeSplit[1].trim();
        let dialougePerson = dialougeSplit[0];
        let len = dialougeArray.length;
        let lastPush = dialougeArray[len - 1];
        if ((len > 0 && lastPush.dialougePerson === dialougePerson)) {
          dialougeArray[len - 1].dialougeText += dialougeText;
        }else if(!dialougeText){
            dialougeArray[len - 1].dialougeText += dialougePerson;
        }else {
          dialougeArray.push({ dialougeText, dialougePerson });
        }
      }
    }
  });

  const dialougeJson = convertToJSON(dialougeArray);
  return dialougeJson;
}
function convertToJSON(array) {
  const maxValue = document.getElementById("maxValue");
  const allInOne = document.getElementById("allInOne");
  let batchValue = 0;
  const jsonArray = [];
  const len = array.length;
  if (!maxValue.checked) {
    const batchElement = document.getElementById("batchValue");
    batchValue = Number(batchElement.value) || 5;
  } else {
    batchValue = len;
  }
  let count = 0;
  let batchCount = 0;
  let dialougeString = "";
  if (!allInOne.checked) {
    while (count < len) {
      dialougeString += `${array[count].dialougePerson}: ${array[count].dialougeText}\n`;
      if (batchCount === batchValue || len - count < batchValue) {
        jsonArray.push({ id: count, dialogue: dialougeString });
        dialougeString = "";
        batchCount = 0;
      }
      count++;
      batchCount++;
    }
  }else{
    array.forEach((d,index) => {
        dialougeString += `${d.dialougePerson}: ${d.dialougeText}\n`;
    })
    jsonArray.push({ id: 1, dialogue: dialougeString });
  }

  return jsonArray
}
async function getFile  (event) {
  console.log(event);
  const input = document.getElementById("input-file");
  console.log(input.value);
  let fakePath = input.value;
  let pathArray = fakePath.split("\\");
  console.log(pathArray);
  if ("files" in input && input.files.length > 0) {
    const content = await readFileContent(input.files[0])
    console.log(content,'<-----------------content')
    return (convertVttToJson(content));
  }
}

function placeFileContent(target, file) {
  readFileContent(file)
    .then((content) => {
      target.value = content;
    })
    .catch((error) => console.log(error));
}

async function readFileContent(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

const PreprocessingUtils = {
    getJSON : getFile
}
export default PreprocessingUtils