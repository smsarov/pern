const express = require('express');
const app = express();
const Arr = [1, 2, 3];
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json())


// app.get('/spectacle', async (req, res) => {
//     try{
//         const allSpectacles = await pool.query("SELECT * FROM spectacles");
//         res.json(allSpectacles.rows);
//     } catch (err){
//         console.error(err.message);
//     }
// })
//
// app.get('/theatre', async (req, res) => {
//     try{
//         const allTheatres = await pool.query("SELECT * FROM theatres");
//         res.json(allTheatres.rows);
//     } catch (err){
//         console.error(err.message);
//     }
// })
//
// app.get('/Theatre_Seat', async (req, res) => {
//     try{
//         const allCategories = await pool.query("select * from theatre_seat", []);
//         res.json(allCategories.rows);
//     } catch (err){
//         console.error(err.message);
//     }
// })
//
// app.get('/theatre_spectacle', async (req, res) => {
//     try{
//         const allTheatres = await pool.query("SELECT * FROM theatre_spectacle");
//         res.json(allTheatres.rows);
//     } catch (err){
//         console.error(err.message);
//     }
// })
//
// app.get('/theatre/:id', async (req, res) => {
//     try{
//         const {id} = req.params;
//         const allTheatres = await pool.query("select * from theatres where theatre_id in (select theatre_id from theatre_spectacle where spectacle_id = $1)", [id]);
//         res.json(allTheatres.rows);
//     } catch (err){
//         console.error(err.message);
//     }
// })
//
// app.get('/seats/:id', async (req, res) => {
//     try{
//         const {id} = req.params;
//         const allCategories = await pool.query("select * from seats where seat_id in (select seat_id from theatre_seat where theatre_id = $1)", [id]);
//         res.json(allCategories.rows);
//     } catch (err){
//         console.error(err.message);
//     }
// })
//
// app.get('/ticket', async (req, res) => {
//     try{
//         const {theatre, spectacle, seat, date} = req.query;
//
//         const TSp_id = (await pool.query("select theatre_spectacle_id from theatre_spectacle where theatre_id=($1) and spectacle_id=($2)", [theatre, spectacle])).rows[0].theatre_spectacle_id;
//         const TSt_id = (await pool.query("select ts_id from theatre_seat where theatre_id = ($1) and seat_id = ($2)", [theatre, seat])).rows[0].ts_id;
//
//         const ticket = await pool.query("select * from tickets where tsp_id = ($1) and tst_id = ($2) and spectacle_date = ($3)", [TSp_id, TSt_id, date]);
//
//         res.json(ticket.rows);
//
//     } catch (err){
//         console.error(err.message);
//     }
// })
//
// app.get('/tickets', async (req, res) => {
//     try{
//         const tickets = await pool.query("select * from tickets", []);
//         res.json(tickets.rows);
//
//     } catch (err){
//         console.error(err.message);
//     }
// })
//
// app.get('/theatresBySpectacleAndDate', async (req, res) => {
//     try{
//         const {spectacle, date} = await req.query;
//         console.log(spectacle);
//         const allTheatres = await pool.query(
//             "select theatre_id from theatre_spectacle where theatre_spectacle_id in ( select tsp_id from tickets where (tsp_id in (select theatre_spectacle_id from theatre_spectacle where spectacle_id = $1)) and (spectacle_date = $2))"
//             ,
//             [spectacle, date]);
//         res.json(allTheatres.rows);
//     } catch (err){
//         console.error(err.message);
//     }
// })
//


// app.get('/date/:id', async (req, res) => {
//     try{
//         const {id} = req.params;
//         const allDates = await pool.query("select spectacle_date from tickets where tsp_id in(select theatre_spectacle_id from theatre_spectacle where spectacle_id = $1)", [id])
//         res.json(allDates.rows);
//     } catch (e){
//         console.log(e.message)
//     }
// })
//
// app.put('/ticket', async (req, res) => {
//     try{


//         const {theatre, spectacle, seat, date, delta} = req.query;
//         //
//          const TSp_id = (await pool.query("select theatre_spectacle_id from theatre_spectacle where theatre_id=($1) and spectacle_id=($2)", [theatre, spectacle])).rows[0].theatre_spectacle_id;
//          const TSt_id = (await pool.query("select ts_id from theatre_seat where theatre_id = ($1) and seat_id = ($2)", [theatre, seat])).rows[0].ts_id;
//         //
//          const ticket= (await pool.query("select * from tickets where tsp_id = ($1) and tst_id = ($2) and spectacle_date = ($3)", [TSp_id, TSt_id, date])).rows[0];
//          const ticket_id = await ticket.ticket_id;
//          const ticket_available = await ticket.available;
//
//         const updateTicket = await pool.query("update tickets set available = ($1) where ticket_id = ($2)", [ticket_available + (+delta), ticket_id]);
//
//         res.json(
//             {
//                     updated: ticket_available+(+delta)
//                 }
//         );
//
//     } catch (err){
//         console.error(err.message);
//     }
// })
//
//
// app.post('/receipt_position', async (req, res) => {
//     try{
//         const {receipt_id, theatre_id, spectacle_id, spectacle_date, seat_id, price, amount, cut, receipt_position_id} = req.body;
//         const newReceiptPos = await pool.query("insert into receipt_positions (receipt_id, theatre_id, spectacle_id, spectacle_date, seat_id, price, amount, cut, receipt_position_id, amount_left) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *", [receipt_id, theatre_id, spectacle_id, spectacle_date, seat_id, price, amount, cut, receipt_position_id, amount]);
//         res.json(newReceiptPos.rows)
//     } catch (e) {
//         console.log(e.message)
//     }
// })
//
// app.put('/receipt_position', async (req, res) => {
//     try{
//         const {receipt_id, receipt_position_id, left} = req.body;
//
//         console.log(await req.body);
//         const newReceiptPos = await pool.query(
//             "update receipt_positions set amount_left = ($1) where receipt_id = ($2) and receipt_position_id = ($3) RETURNING *",
//             [left, receipt_id, receipt_position_id]);
//         res.json(await req.body);
//     } catch (e) {
//         console.log(e.message)
//     }
// })
//
// app.post('/receipt', async(req, res) => {
//     try{
//         const {receipt_id, total, date} = await req.body;
//         const newReceipt = await pool.query("insert into receipts (receipt_id, total, purchase_date) values ($1, $2, $3) RETURNING *", [receipt_id, total, date]);
//         res.json(newReceipt.rows);
//
//     } catch (e) {
//         console.log(e.message);
//     }
// })
//
// app.get('/receipt/:id', async (req, res) => {
//     try{
//         let {id} = await req.params;
//         const recs = await pool.query("select * from receipt_positions where receipt_id=($1)", [id]);
//         res.json(recs.rows);
//     } catch(e) {
//         console.log(e.message);
//     }
// })
//
// app.get('/AllReceiptPositions', async (req, res) => {
//     try{
//         const recs = await pool.query("select * from receipt_positions", []);
//         res.json(recs.rows);
//     } catch(e) {
//         console.log(e.message);
//     }
// })
//
// app.get('/AllReceipts', async (req, res) => {
//     try{
//         const recs = await pool.query("select * from receipts", []);
//         res.json(recs.rows);
//     } catch(e) {
//         console.log(e.message);
//     }
// })
//
// app.get('/AllRefunds', async (req, res) => {
//     try{
//         const recs = await pool.query("select * from refunds", []);
//         res.json(recs.rows);
//     } catch(e) {
//         console.log(e.message);
//     }
// })
//
// app.post('/refund', async (req, res) => {
//     try{
//         const {receipt_id, receipt_position, amount, total, refund_date} = await req.body;
//         console.log(await req.body);
//         const newRefund = await pool.query(
//             "insert into refunds (receipt_id, receipt_position, amount, total, refund_date) values ($1, $2, $3, $4, $5) returning *",
//             [receipt_id, receipt_position, amount, total, refund_date]
//         );
//         res.json(newRefund.rows);
//     } catch(e) {
//         console.log(e.message);
//     }
// })
async function clearTable(){
    await pool.query("delete from main", []);
}

async function addGroup(){
    let query = "INSERT INTO main (main_id, main_value) VALUES (-1, -1), (-2, -2), (-3, -3), (-4, -4), (-5, -5)";
    await pool.query(query, []);
}

async function fillTable(n){
    let query = "INSERT INTO main (main_id, main_value, main_text) VALUES ";

    const abc = 'abcdefgh';

    for(let i = 0; i < n - 1; i++){
        const a = abc[Math.floor(Math.random()*abc.length)];
        const b = abc[Math.floor(Math.random()*abc.length)];
        const c = abc[Math.floor(Math.random()*abc.length)];
        query += `(${i}, ${i}, '${a}${b}${c}100'), `
    }
    query += `(${n-1}, ${n-1}, 'a100')`

    await pool.query(query, []);
}

async function getTime(query, argument){
    const start = await new Date();
    await query(argument);
    const finish = await new Date();
    return finish - start;
}

async function search_key(ind){
    let query = `SELECT main_id FROM main WHERE main_id = $1`;
    await pool.query(query, [ind]);
}

async function search_value(n){
    let query = `SELECT main_value FROM main WHERE main_value = $1`;
    await pool.query(query, [n]);
}

async function search_mask(){
    let query = `SELECT main_text FROM main WHERE main_text like 'abc%'`;
    await pool.query(query, []);
}


async function add(){
    let query = "INSERT INTO main (main_id, main_value) VALUES (-1, -1)";
    await pool.query(query, []);
}

async function change_key(ind){
    let query = `UPDATE main SET main_value = -1 WHERE main_id = ${ind}`;
    await pool.query(query, []);
}

async function change_value(n){
    let query = `UPDATE main SET main_value = -1 WHERE main_value = $1`;
    await pool.query(query, [n]);
}

async function del_key(ind){
    let query = `DELETE FROM main WHERE main_id = ${ind}`;
    await pool.query(query, []);
}

async function del_value(n){
    let query = `DELETE FROM main WHERE main_value = $1`;
    await pool.query(query, [n]);
}

async function delGroup(){
    let query = `DELETE FROM main WHERE main_id IN (SELECT main_id FROM main LIMIT 500)`;
    await pool.query(query, []);
}

async function compress(){
    let query = "VACUUM FULL main;"

    await pool.query(query, []);

}


async function experiment(n){

    let result = [0, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 0, 0];
    let queries = [
        'search_key', 'search_value', 'search_mask', 'add', 'addGroup', 'change_key', 'change_value',
        'del_key', 'del_value', 'delGroup', 'compress200', 'compressTo200'
    ]

    const iter = 30;

    await clearTable();
    await fillTable(n);


    for(let i = 0; i < iter; i++){
        console.log(i);
        await clearTable();
        await fillTable(n);

        const ind = Math.floor(Math.random() * n + 1);
        console.log(n + " searched index = " + ind);
        result[0] += (await getTime(search_key, ind));
        result[1] += await getTime(search_value, n);
        result[2] += await getTime(search_mask); // mask search

        result[3] += await getTime(add); await clearTable(); await fillTable(n);
        result[4] += await getTime(addGroup); await clearTable(); await fillTable(n);

        result[5] += await getTime(change_key, ind); await clearTable(); await fillTable(n);
        result[6] += await getTime(change_value, n); await clearTable(); await fillTable(n);
        result[7] += await getTime(del_key, ind); await clearTable(); await fillTable(n);
        result[8] += await getTime(del_value, n); await clearTable(); await fillTable(n);
        result[9] += await getTime(delGroup); await clearTable(); await fillTable(n);

        await pool.query(`DELETE FROM main WHERE main_id IN (SELECT main_id FROM main LIMIT $1)`, [200]);
        result[10] += await getTime(compress); await clearTable(); await fillTable(n);

        await pool.query(`DELETE FROM main WHERE main_id IN (SELECT main_id FROM main LIMIT $1)`, [n - 200]);
        result[11] += await getTime(compress); await clearTable(); await fillTable(n)
    }

    let arr = [];


    for(let i = 0; i < queries.length; i++){
        arr.push({
            name : queries[i],
            n : (result[i] / iter).toFixed(2)
        })
    }

    return arr;
}


function solveLog(a1, b1, a2, b2){
    let y = 2**((b1*Math.log2(a2) - b2 * Math.log2(a1)) / (b2 - b1));
    let x = b1 / Math.log2(a1 * y);
    return `${x.toFixed(2)} * log(${y.toFixed(2)} * x)`
}



app.listen(3050, () =>{

    console.log("server is working!")

    const result = async () =>
    {
        let arr = [];
        const a1 = await experiment(1000);
        const a2 = await experiment(10000);
        const a3 = await experiment(100000);

        // console.log(solveLog(1000, a1[0].n, 10000, a2[0].n));
        // console.log(solveLog(10000, a2[0].n, 100000, a3[0].n));
        //
        // console.log(solveLog(1000, a1[5].n, 10000, a2[5].n));
        // console.log(solveLog(10000, a2[5].n, 100000, a3[5].n));
        //
        // console.log(solveLog(1000, a1[7].n, 10000, a2[7].n));
        // console.log(solveLog(10000, a2[7].n, 100000, a3[7].n));

        for(let i = 0; i < 12; i++){
            arr.push({
                name : a1[i].name,
                1000: a1[i].n,
                10000: a2[i].n,
                100000: a3[i].n
            })
        }

        console.table(arr);
    }

    //result();

    result();

})