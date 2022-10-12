const development = true
const WORKOUT_URL = development ? "http://localhost:8000/api" : "https://workout-today-backend.herokuapp.com/api"

const getTodaysWorkout = async () => {
  try {
  let response = await fetch(`${WORKOUT_URL}/today`)
    let data = await response.json()
    return data
  }
  catch(err) {
    console.error(err)
  }
}

const getMoreWorkouts = async (date = null) => {
  try {
    console.log("TOKEN: ", localStorage.getItem('access_token'))
    let response = await fetch(`${WORKOUT_URL}/more-workouts${date ? `?date=${date}` : ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    let data = await response.json()
    return data
  }
  catch(err) {
    console.error(err)
  }
}

const submitWorkoutStatus = async (status) => {
  try {
    let response = await fetch(`${WORKOUT_URL}/start-workout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(status)
    })
    let data = await response.json()
    return data
  }
  catch(err) {
    console.error(err)
  }
}

export {
  getTodaysWorkout,
  submitWorkoutStatus,
  getMoreWorkouts
}
