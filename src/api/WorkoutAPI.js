const development = false
const WORKOUT_URL = development ? "http://localhost:8000/api" : "https://api.workouttoday.co/api"

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
    let response = await fetch(`${WORKOUT_URL}/more-workouts${date ? `?date=${date}` : ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    let data = await response.json()
    if (data.message) {
      return { message: 'Unable to retrieve workout' }
    }
    return data
  }
  catch(err) {
    console.error(err)
  }
}

const getWorkouts = async (workout_type) => {
  try {
    let response = await fetch(`${WORKOUT_URL}/workouts/${workout_type}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    let data = await response.json()
    if (data.message) {
      return { message: 'Unable to retrieve workout' }
    }
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
    if (data.message) {
      return { message: 'unable to submit status' }
    }
    return data
  }
  catch(err) {
    console.error(err)
  }
}

const submitUserExerciseInfo = async (exerciseInfo) => {
  try {
    let response = await fetch(`${WORKOUT_URL}/workout/${exerciseInfo.workoutId}/exercise/${exerciseInfo.exerciseId}/user/${exerciseInfo.userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(exerciseInfo)
    })
    let data = await response.json()
    return data
  }
  catch(err) {
    console.error(err)
  }
}

const getUserExerciseInfo = async (exerciseInfo) => {
  try {
    let response = await fetch(`${WORKOUT_URL}/workout/${exerciseInfo.workoutId}/exercise/${exerciseInfo.exerciseId}/user/${exerciseInfo.userId}`, {
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

const favoriteWorkout = async (workoutInfo = null) => {
  let query = `?query=${workoutInfo['action']}`
  try {
    let response = await fetch(`${WORKOUT_URL}/user/${workoutInfo.user}/workout/${workoutInfo.workout}${query ? `${query}` : ''}`, {
      method: 'POST',
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

const getFavoriteWorkout = async (workoutInfo) => {
  try {
    let response = await fetch(`${WORKOUT_URL}/user/${workoutInfo.user}/workout/${workoutInfo.workout}`, {
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

export {
  getTodaysWorkout,
  submitWorkoutStatus,
  getMoreWorkouts,
  submitUserExerciseInfo,
  getUserExerciseInfo,
  getWorkouts,
  favoriteWorkout,
  getFavoriteWorkout
}
