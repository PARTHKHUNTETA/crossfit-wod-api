
const Workout = require('../Database/workout')
const { v4: uuid } = require('uuid')

const getAllWorkouts = (filterParams) => {

    try {
        const allWorkouts = Workout.getAllWorkouts(filterParams);
        return allWorkouts;
    } catch (error) {
        throw error;
    }
}
const getOneWorkout = (workoutId) => {

    try {
        const workout = Workout.getOneWorkout(workoutId);
        return workout;
    } catch (error) {
        throw error;
    }
}
const createWorkout = (newWorkout) => {

    const workoutToInsert = {
        ...newWorkout,
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })

    }

    try {
        const createdWorkout = Workout.createNewWorkout(workoutToInsert)
        return createdWorkout;
    }
    catch (error) {
        throw error;
    }

}
const updateWorkout = (workoutId, changes) => {

    try {
        const updatedWorkout = Workout.updateWorkout(workoutId, changes);
        return updatedWorkout;
    }
    catch (error) {
        throw error;
    }
}
const deleteWorkout = (workoutId) => {

    try {
        Workout.deleteWorkout(workoutId);
    }
    catch (error) {
        throw error;
    }
}


module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}