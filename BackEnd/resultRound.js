//********************************************* คำนวนไพ่ และ ชนะรอบ ***************************************//
//CASE 1 ---> CHECK 'NT' TRUMP ---> DEFINE ARRDATA[0].CHARAT(0)? == TRUMP ---> CHECK IN ARRDATA ? HAVE TRUMP ---> IF(1) => GET RESULT AND INDEX RESULT
//CASE 2 ---> IF TRUMP !== NT ---> FIND IN ARRDATA.CHARAT(0)? == TRUMP ---> IF(1) ---> GET RESULT AND INDEX ---> IF(>1) ---> 
// -->  FIND MAX(...NEWARRDATA(INT)) ---> FIND IN NEW ARRDATA AND GET WINROUND AND INDEX


var arrData = ['H02','S03','H04','S06'];
var trump = 'N';

const resultRound = (arrData, trump) => { //arrData = [H02,A02,S04,S01]  trump=[H,C,S,A,NT]
  console.log(".................... Resulting round state ....................");
 

  let checkArr = arrData.find(arr=> arr.charAt(0) === trump);
  
  //CASE 1 
  if(trump === 'N' || checkArr === undefined){
    trump = arrData[0].charAt(0); //Define
    console.log(`trump : ${trump}`)
    let checkarrTrump = arrData.filter(data => data.charAt(0) === trump); //CHECK HAVE MORE 1 ? 
    //console.log(`checkarrTrump : ${checkarrTrump}`);
    //CASE 1 --> IF(1)
    if(checkarrTrump.length === 1) {
      //console.log("checkarrTrump.length == 1");
      let winDirection = 0
      return [checkarrTrump[0], winDirection];
    }else{ //CASE 1 --> IF(>1)
      let [winRound,winDirection] = findMax(checkarrTrump,trump,arrData);
      console.log(winRound,winDirection)
      return [winRound, winDirection];
    }
  }else {
    //CASE 2
    let checkarrTrump = arrData.filter(data => data.charAt(0) === trump);
    //console.log(`checkarrTrump : ${checkarrTrump}`);
    if(checkarrTrump.length === 1) {
      //console.log("checkarrTrump.length == 1");
      let winDirection = 0
      return [checkarrTrump[0], winDirection];
    }else{ //CASE 2 --> IF(>1)
      let [winRound,winDirection] = findMax(checkarrTrump,trump,arrData);
      return [winRound, winDirection];
    }
  }
} 

//ฟังก์ชั่นหาค่ามากสุดกรณีมีทรัมป์ ทุกรูปแบบ
const findMax = (newarrData, trump, arrData) => {
  let valueArr = newarrData.map(newdata => parseInt(newdata.substring(1, 3)));
  //console.log(valueArr)
  let maxValue = Math.max(...valueArr);
  //console.log(`maxValue : ${maxValue}`);
  let winRound = newarrData.find((arr) => parseInt(arr.substring(1,3)) === maxValue);
  //console.log(`winRound : ${winRound}`);
  let winIndex = findDirection(winRound,arrData);
  //console.log(`winIndex : ${winIndex}`);
  let winDirection = changeDirection(winIndex);
  //console.log(`winDirection : ${winDirection}`);
  return [winRound,winDirection]
}


const findDirection = (winRound ,arrData) => {
  return arrData.indexOf(winRound);
}
 
const changeDirection = (num) => {
  if (num == 0) {
    return "South";
  } 
  else if (num == 1) {
    return "West";
  } 
  else if (num == 2) {
    return "North";
  } 
  else if (num == 3) {
    return "East";
  }
};


resultRound(arrData,trump);


module.exports = { resultRound };
