// Require Sequelize
const Sequelize = require('sequelize');

// Instantiate Database
const db = new Sequelize(
  (process.env.DATABASE_URL || 'postgres://localhost:5432/sequelizexpress-app-db'),
  {
    dialect: 'postgres',
    database: 'sequelizexpress-app-db',
    define: {
      underscored: true,
      returning: true
    }
  }
);

// Define Models
const Immersive = db.define('immersive', {
  type: Sequelize.STRING,
  cohort: Sequelize.STRING
});

const Student = db.define('contestant', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
});

// Model Associations
Immersive.hasMany(Student);
Student.belongsTo(Immersive);

// Exports
module.exports = {
  db,
  Immersive,
  Student
}
