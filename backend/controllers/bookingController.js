const { bookingSlot, currentBookingData } = require("../models/bookingQuery");

const queues = new Map();

function timeoutAfter(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error("Check your Internet Connection.")), ms));
}

function createTimeoutSignal(ms) {
  const controller = { aborted: false };
  setTimeout(() => {
    controller.aborted = true;
  }, ms);
  return controller;
}


async function processRequest(job) {
  const { req, res, userId } = job;
  const start = Date.now();
  const { av_id, userSlots } = req.body;

  try {
    const timeoutSignal = createTimeoutSignal(4000);
    const result = await Promise.race([
      bookingSlot(av_id, userSlots, userId, timeoutSignal),
      timeoutAfter(4000),
    ]);
    const duration = Date.now() - start;
    return res.status(200).send(result);
  } catch (err) {
    const duration = Date.now() - start;
    console.log(err)
    return res.status(408).json({ error: err.message });
  } finally {
    const queueObj = queues.get(av_id);
    queueObj.isProcessing = false;
    processNext(av_id);
  }
}

function processNext(av_id) {
  const queueObj = queues.get(av_id);
  if (!queueObj || queueObj.queue.length === 0 || queueObj.isProcessing) return;

  const nextJob = queueObj.queue.shift();
  queueObj.isProcessing = true;
  processRequest(nextJob, av_id);
}

function handleQueuedProcess(req, res) {
  const { userId, av_id, userSlots } = req.body;

  if (!queues.has(av_id)) {
    queues.set(av_id, { queue: [], isProcessing: false });
  }

  const queueObj = queues.get(av_id);
  queueObj.queue.push({ req, res, userId });

  console.log(`📥 Queued for object ${av_id} by user ${userId}`);

  processNext(av_id); // Trigger only for this object
}


const getCurrentBookingData = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await currentBookingData(id);
    res.status(200).json({ bookingData: data });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleQueuedProcess,
  getCurrentBookingData
};
