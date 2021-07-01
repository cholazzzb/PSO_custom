import fs from "fs";

function DataRecorder(keyArray) {
  this.data = {};
  keyArray.forEach((key) => {
    this.data[key] = [];
  });
}

DataRecorder.prototype.addData = function (newDatas) {
  for (let key in newDatas) {
    this.data[key].push(newDatas[key]);
  }
};

DataRecorder.prototype.saveData = function (type, folderName, fileName) {
  let extension;
  let content;
  switch (type) {
    case "js":
      extension = "js";
      content = `const ${fileName} = ${JSON.stringify(
        this.data
      )}; export default ${fileName}`;
      break;
    case "py":
      extension = "py";
      content = `${fileName} = ${JSON.stringify(this.data)}`;
      break;

    default:
      break;
  }
  fs.writeFileSync(`${folderName}/${fileName}.${extension}`, content, "utf-8");
};
export default DataRecorder;
