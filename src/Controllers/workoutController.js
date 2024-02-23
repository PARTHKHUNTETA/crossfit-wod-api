
const workoutService = require('../Services/workoutService')

const getAllWorkouts = (req, res) => {
    const {mode}=req.query;
    try {
        const workouts = workoutService.getAllWorkouts({mode});
        res.status(200).json(workouts);
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

const getOneWorkout = (req, res) => {
    const { workoutId } = req.params;
    if (!workoutId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':workoutId' can not be empty" },
            });
    }


    try {
        const workout = workoutService.getOneWorkout(workoutId);
        res.status(200).json(workout);
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

const createWorkout = (req, res) => {
    const { body } = req;
    if (!body.name || !body.mode || !body.equipment || !body.exercises || !body.trainerTips) {
        res.status(400).send({ message: "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'", })
    }
    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips,
    }
    try {
        const workouts = workoutService.createWorkout(newWorkout);
        res.status(201).json(workouts)
    }
    catch (error) {
        res
            .status(error?.status || 500)
            .send({ data: { error: error?.message || error } });
    }

}

const updateWorkout = (req, res) => {
    const { workoutId } = req.params;
    const { body } = req;
    if (!body.name || !body.mode || !body.equipment || !body.exercises || !body.trainerTips) {
        res.status(400).send({ message: "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'", })
    }
    if (!workoutId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':workoutId' can not be empty" },
            });
    }

    try {
        const updatedWorkout = workoutService.updateWorkout(workoutId, body);
        res.status(200).json(updatedWorkout);
    }
    catch (error) {
        res
            .status(error?.status || 500)
            .send({ data: { error: error?.message || error } });
    }
}

const deleteWorkout = (req, res) => {
    const { workoutId } = req.params;
    if (!workoutId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':workoutId' can not be empty" },
            });
    }

    try {
        workoutService.deleteWorkout(workoutId);
        res.status(204).send(`Deleted ${workoutId}`)
    }
    catch (error) {
        res
            .status(error?.status || 500)
            .send({ data: { error: error?.message || error } });
    }
}


module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}