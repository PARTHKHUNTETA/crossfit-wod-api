const express = require('express')
const router = express.Router()
const apicache = require("apicache");
const workoutController = require('../../Controllers/workoutController')
const recordController = require('../../Controllers/recordController')
const cache = apicache.middleware;

/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */
router.get('/',cache("2 minutes"), workoutController.getAllWorkouts)

router.get('/:workoutId', workoutController.getOneWorkout)

router.post('/',workoutController.createWorkout)

router.patch('/:workoutId',workoutController.updateWorkout)

router.delete('/:workoutId',workoutController.deleteWorkout)

router.get("/:workoutId/records", recordController.getRecordForWorkout);



module.exports = router;