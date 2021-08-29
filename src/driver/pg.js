const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "eyeofsauron",
  password: "test",
  port: 5432,
});

async function run() {
  await client.connect();

  const insertQuery = 'INSERT INTO customers(\"accountId\", name, latitude, longitude, archived) VALUES($1, $2, $3, $4, $5)'
  const insertParams = [1, 'Localização Teste - SQL Raw', 1.000, 2.000, false]
  // insert
  await client.query(insertQuery, insertParams);

  // select

  const selectQuery = 'SELECT * FROM customers WHERE name = $1'
  const selectParams = ['Localização Teste - SQL Raw']
  const res = await client.query(selectQuery, selectParams);

  console.log(res.rows);

  await client.end();
  process.exit(0)
}

run();
