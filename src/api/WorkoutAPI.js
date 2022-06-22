const development = false
const URL = development ? "http://localhost:8000/api/today" : "https://workout-today-backend.herokuapp.com/api/today"

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
