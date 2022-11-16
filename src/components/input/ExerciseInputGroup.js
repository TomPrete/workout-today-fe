import React, { useEffect, useContext, useState } from 'react';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { getUserExerciseInfo } from '../../api/WorkoutAPI';

const ExerciseInputGroup = (props) => {
  const {updateReps, exercise, updateResistance, workoutId} = props;
  const [reps, setReps] = useState(undefined)
  const [resistance, setResistance] = useState(undefined)
  const { user } = useContext(UserAuthContext)
  console.log(exercise)
  useEffect(() => {
    const getExerciseInfo = async () => {
      let response = await getUserExerciseInfo({
        workoutId: workoutId,
        exerciseId: exercise.id,
        userId: user.user.id
      })
      let data = await response
      if (data.repetitions) {
        setReps(data.repetitions)
      }
      if (data.resistance.length > 0) {
        setResistance(data.resistance)
      }
    }
    if (user.user && user.user.is_premium) {
      getExerciseInfo()
    }
  }, [exercise])

  return (
    <div className='record-exercise-container'>
      <div className='reps'>
      <input className="input" type="number" placeholder='Reps' name='reps' onChange={updateReps} />
      {
        reps && <p>Previous: {reps} Reps</p>
      }

      </div>
      {
        exercise.equipment
        &&
        <div className='reps'>
          <input className="input" type="text" name='resistance' placeholder="Weight or band type" onChange={updateResistance} />
          {
            resistance && <p>Previous: {resistance} lbs</p>
          }
        </div>
      }
    </div>
  );
};

export default ExerciseInputGroup;
