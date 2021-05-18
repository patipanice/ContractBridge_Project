//********************************************* คำนวนไพ่ และ ชนะรอบ ***************************************//

const resultRound = (arrData, trump) => { //H02,A02,H04,S01
  console.log(".................... Resulting round state ....................");
  let firstChar = arrData[0].charAt(0);
  let maxValue = 0;
  let winRound = "null";
  let indexWin = 0;
  //กรณีเป็น NT
  if(trump.charAt(0) === 'N'){
    let MaxTrump = arrData[0].charAt(0); //H
    console.log(MaxTrump);
    const arrNum0 = arrData.filter((data)=> data.charAt(0).toString() == MaxTrump.toString());
    if(arrNum0.length === 1){
       indexWin = changeDirection(0);
       return [arrNum0.toString(), indexWin];
    }else{ 
      const arrNum = arrNum0.map((data) => parseInt(data.substring(1, 3)));
       maxValue = Math.max(...arrNum);
       winRound = arrNum0.filter((arr) => arr.substring(1, 3) == maxValue).toString();
       indexWin = arrData.indexOf(winRound);
       indexWin = changeDirection(indexWin);
       return [winRound, indexWin];
    }
  }  
 
  //กรณีหน้าเดียวกันทั้งหมด parseInt => str>int , substring(from,to);
  if (
    firstChar == arrData[1].charAt(0) &&
    firstChar == arrData[2].charAt(0) &&
    firstChar == arrData[3].charAt(0)
  ) {
    const arrNum = arrData.map((data) => parseInt(data.substring(1, 3)));
    maxValue = Math.max(...arrNum);
    winRound = arrData
      .filter((arr) => arr.substring(1, 3) == maxValue)
      .toString();
    indexWin = arrData.indexOf(winRound); //หาว่าอยู่ตัวที่เท่าไหร่ใน arrData
    indexWin = changeDirection(indexWin);
    return [winRound, indexWin];
  } else {
    //กรณีไม่ใช่หน้าเดียวกัน ให้คิดจากทรัมป์
    return ([winRound, indexWin] = findMax(arrData, trump)); //destructure return 2 value form function
  }
};

//ฟังก์ชั่นหาค่ามากสุดกรณีมีทรัมป์ ทุกรูปแบบ
const findMax = (arrData, trump) => {
  let winRound;
  let indexWin = 0;
  let maxValue = 0;
  const _find = arrData.filter((arr) => arr.charAt(0) == trump.charAt(0));
  if (_find.length == 1) {
    winRound = _find.toString();
    indexWin = arrData.indexOf(winRound);
  } else {
    const arrNum = _find.map((data) => parseInt(data.substring(1, 3)));
    maxValue = Math.max(...arrNum);
    winRound = _find
      .filter((arr) => arr.substring(1, 3) == maxValue)
      .toString();
    indexWin = arrData.indexOf(winRound);
  }
  indexWin = changeDirection(indexWin);
  return [winRound, indexWin];
};

const changeDirection = (num) => {
  if (num == 0) {
    return "South";
  } else if (num == 1) {
    return "West";
  } else if (num == 2) {
    return "North";
  } else if (num == 3) {
    return "East";
  }
};

module.exports = { resultRound };
