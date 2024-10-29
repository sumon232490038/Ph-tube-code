const isverify = false;
// if(isverify === true){
//     console.log("he is verifaied")

// }
// else {
//     console.log('not veifaied')
// }

// console.log(isverify == true ? "yes":"not")

function maketime(number) {
  const step1 = parseInt(number / 3600);
  const step2 = parseInt(number % 3600);
  return `${step1}hrs ${step2} min ago`;
}

console.log(maketime(16278));
