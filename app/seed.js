const { Immersive, Student } = require('./model');

const seedDb = async () => {
  try {
    const cohort1 = await Immersive.create({
      type: "Software Engineering",
      cohort: "Jeopardy"
    });

    const student1 = await Student.create({
      name: "Alex Trebek",
      email: "host@jeopardy.com"
    });

    await student1.setImmersive(cohort1);

    console.log('INSERT completed.');
  } catch (err) {
    console.log('INSERT failed: ' + err.message);
  } finally {
    console.log('Exiting process...');
    process.exit();
  }
}

seedDb();
