const getPercentage = (currentIdx, total) => {
  return Math.round((currentIdx / total) * 100, 0)
}

export {
  getPercentage
}
