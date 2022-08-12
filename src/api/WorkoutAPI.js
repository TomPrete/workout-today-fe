const WORKOUT_URL = process.env.NODE_ENV === 'development' ? "http://localhost:8000/api" : "https://workout-today-backend.herokuapp.com/api"

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
  submitWorkoutStatus
}
