const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres://postgres:test@localhost:5432/eyeofsauron");
const Customers = require("./Customer")(sequelize);

async function run() {
  // insert
  await Customers.create({ 
    accountId: 1,
    name: 'Localização Teste - Sequelize (ORM)',
    latitude: 1.000,
    longitude: 2.000,
    archived: false
  });

  // select
  const user = await Customers.findOne({ where: { name: "Localização Teste - Sequelize (ORM)" }, limit: 100 });

  console.log(user.toJSON());

  await sequelize.close();
}

run();
