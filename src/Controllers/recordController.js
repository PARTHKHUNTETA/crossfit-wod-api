
const recordService = require("../Services/recordService")
const getRecordForWorkout = (req, res) => {

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
        const record = recordService.getRecordForWorkout(workoutId);
        res.status(200).json(record);
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }


}

module.exports = { getRecordForWorkout }