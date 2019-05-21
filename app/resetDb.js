const { db } = require('./model');

const resetDb = async () => {
  try {
    await db.sync({ force: true });
    console.log('DB has been reset.')
  } catch (err) {
    console.log('DB reset error: ' + err.message);
  } finally {
    console.log('Exiting process.');
    process.exit();
  }
}

resetDb();
