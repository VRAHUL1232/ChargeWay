const pool = require('../config/db');

const FormattedDate = (dateObj) => {
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    return formattedDate
}

function bookingSlot(av_id, userSlots, userId, timeoutSignal) {
    return new Promise(async (resolve, reject) => {
        const client = await pool.connect()
        try {
            await new Promise(r => setTimeout(r, 1000));
            await client.query('BEGIN');
            if (timeoutSignal.aborted) {
                await client.query('ROLLBACK');
                throw new Error("Booking timeout after partial update");
            }
            const result = await client.query(
                `SELECT * FROM available WHERE av_id = $1 FOR UPDATE`,
                [av_id]
            );
            const row = result.rows[0];
            if (!row) throw new Error("There is no available slots.");

            const currentDateTime = new Date().getTime();
            const newDate = FormattedDate(row.av_book_date) + 'T' + row.av_start_time;
            const availableDateTime = new Date(newDate).getTime();
            if (currentDateTime > availableDateTime) {
                throw new Error("Booking time has passed.");
            }
            if (row.av_slots < userSlots) {
                throw new Error("Not enough slots available.");
            }
            await client.query(
                `UPDATE available SET av_slots = $1 WHERE av_id = $2`,
                [row.av_slots - userSlots, av_id]
            );
            const dateObj = new Date(row.av_book_date).toISOString().slice(0, 10);
            console.log(dateObj, typeof (dateObj))
            await client.query(
                `INSERT INTO bookings(s_id, u_id, start_time, end_time, book_date, slots, amount, time_stamp) VALUES ($1,$2,$3,$4,$5,$6,$7, CURRENT_TIMESTAMP)`,
                [row.s_id, userId, row.av_start_time, row.av_end_time, dateObj, userSlots, userSlots * row.cost]
            );
            if (timeoutSignal.aborted) {
                await client.query('ROLLBACK');
                throw new Error("Booking timeout after partial update");
            }
            await client.query('COMMIT');
            return resolve("good response");

        } catch (err) {
            console.log(err)
            await client.query('ROLLBACK');
            return reject(new Error(err.message));
        } finally {
            client.release();
        }
    });
}

const currentBookingData = async (bookingId) => {
    try {
        const client = await pool.connect()
        const data = await client.query(`SELECT a.av_book_date, a.av_start_time, a.av_end_time, a.cost, a.av_slots, s.s_id, s.name, s.address FROM available a JOIN station s ON a.s_id = s.s_id WHERE a.av_id = $1`, [bookingId]);
        console.log(data.rows[0]);
        return data.rows[0];
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    bookingSlot,
    currentBookingData
};
