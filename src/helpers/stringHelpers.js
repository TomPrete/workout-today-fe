
const capitalizeWorkoutTarget = (targetString) => {
  let targetArr = targetString.split("-")
  if (targetArr.length === 1) {
    return capitalizeFirstLetter(targetArr[0])
  }
  else if (targetArr.length === 2) {
    return `${capitalizeFirstLetter(targetArr[0])} & ${capitalizeFirstLetter(targetArr[1])}`
  }
  else {
    return `${capitalizeFirstLetter(targetArr[0])}, ${capitalizeFirstLetter(targetArr[1])} & ${capitalizeFirstLetter(targetArr[2])}`
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export {
  capitalizeWorkoutTarget
}
