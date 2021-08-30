const config = require("../../knexfile.js").development;
const knex = require("knex");
const db = knex(config);

const knexToSQL = require("knex")({ client: "pg" })

async function run() {
  // insert
  await db("customers").insert({ 
    accountId: 1,
    name: 'Localização Teste - Knex (Query Builder)',
    latitude: 1.000,
    longitude: 2.000,
    archived: false
  });

  // select
  const rows = await db.from("customers")
    .select()
    .where({ name: 'Localização Teste - Knex (Query Builder)' });

  console.log('Linha do BD inserida:', rows);

  await db.destroy();

  const sql = knexToSQL('customers').insert({ 
    accountId: 1,
    name: 'Localização Teste - Knex (Query Builder)',
    latitude: 1.000,
    longitude: 2.000,
    archived: false
  }).returning('*').toString()

  console.log('Query montada sem execução no BD', sql)
}

run();
