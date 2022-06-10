const URL = "http://localhost:8000/api/today"

const getTodaysWorkout = async () => {
  try {
    let response = await fetch(URL)
    let data = await response.json()
    return data
  }
  catch(err) {
    console.error(err)
  }
}

export {
  getTodaysWorkout
}
