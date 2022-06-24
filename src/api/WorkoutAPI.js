const development = true
const URL = development ? "http://localhost:8000/api" : "https://workout-today-backend.herokuapp.com/api"

const getTodaysWorkout = async () => {
  try {
    let response = await fetch(`${URL}/today`)
    let data = await response.json()
    return data
  }
  catch(err) {
    console.error(err)
  }
}

const startWorkout = async () => {
  try {
    let response = await fetch(`${URL}/start-workout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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
  startWorkout
}
