var fs = require('fs');

// x has to be >= y else result = 0
pascalTriangle = (x, y) => {
  let coefficient = 1;

  if (y < 0 || y > x) return 0;

  for (let i = 0; i < y; i++) {
    coefficient *= (x - i) / (i + 1);
  }
  return coefficient;
};

generateData = x => {
  for (let i = 1; i <= x; i++) {
    let outputData = [];
    let inputData = [];
    for (let y = 1; y <= i; y++) {
      if (i === 1) {
        outputData.push(1);
        inputData.push([i, y]);
        break;
      }
      outputData.push(Math.ceil(pascalTriangle(i, y)));
      inputData.push([i, y]);
    }
    writeDataToFile(
      JSON.stringify(padOutputData(outputData, x + 1)),
      'outputData.txt'
    );
    writeDataToFile(
      JSON.stringify(padInputData(inputData, x + 1)),
      'inputData.txt'
    );
  }
};

// pads the array with 0's so that all of the arrays are of equal length
// This will help out in tesorflow later on
padOutputData = (array, maxLength) => {
  for (let i = array.length; i < maxLength; i++) {
    array.push(0);
  }
  return array;
};

padInputData = (array, maxLength) => {
  for (let i = array.length + 1; i < maxLength; i++) {
    array.push([array[0][0], i]);
  }
  return array;
};

writeDataToFile = (data, filename) => {
  fs.appendFileSync(filename, `${data},\n`, err => {
    if (err) console.log(err);
  });
};

//clear files to generate clean data;
fs.unlink('inputData.txt', _ => {});
fs.unlink('outputData.txt', _ => {});
generateData(100);
