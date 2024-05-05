import pg from 'pg';
import 'dotenv/config';

const {Pool} = pg;

export const pool = new Pool({
    allowExitOnIdle: true,
    connectionString: process.env.CONNECTION_STRING
})

const testConnection = async () => {
    try {
        const response = await pool.query('SELECT NOW()')
        console.log('connection ok...')
    } catch (error){
        console.log(error)
    }
}
testConnection();