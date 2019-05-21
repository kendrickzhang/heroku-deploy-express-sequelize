# Heroku Deployment Tutorial For `express(sequelize)` apps

## **package.json**

### A. dependencies

Your express app's `package.json` should have both `dependencies` and `devDependencies` sections:

<img width="350" alt="dependencies section" src="https://user-images.githubusercontent.com/40147976/58120614-98992500-7bd3-11e9-8246-7e46df3579f7.png">

### B. dependencies vs. devDependencies

|`dependencies` | `devDependencies`|
|-------------- | --------------|
| Should contain **only** packages that are crucial to the core functionalities of your app. | Should contain **only** helper packages that makes your life easier as you're coding up your app. |
| `express`, `morgan`, `body-parser`, `cors`, `dotenv`, `sequelize`, `pg` | `nodemon`, `eslint` |
| `bcrypt`, `jsonwebtoken`, `passport`, `passport-jwt`, `passport-local` |  |

Sectioning your dependencies is not specific to just express apps. You should differentiate necessary dependencies and dev dependencies for each of your `Node.js` apps (hint: `node_modules`).
 
### C. Scripts

1. Modify your `start` command to `node server.js`.
1. Add `heorku-postbuild` command with `npm run build`.

<img width="900" alt="scripts section" src="https://user-images.githubusercontent.com/40147976/58120631-a2228d00-7bd3-11e9-8bd6-c1255129358c.png">

## **models.js**

### A. Add Database URL To Sequelize DB Instance

Your current database object configuration is an argument passed into a new sequelize instance.

- <details>
  <summary>Current database instance configuration:</summary>

  ```javascript
    const db = new Sequelize(
      {
        dialect: 'postgres',
        database: 'my-app-db',
        define: {
          underscored: true,
          returning: true
        }
      }
    );
  ```
  </details>

Heroku generates a database url for your app when it's deployed. We need to add another argument into our sequelize database instance.

<img width="350" alt="db instance arguments" src="https://user-images.githubusercontent.com/40147976/58124808-17469000-7bdd-11e9-9810-26da80d45b38.png">

- <details>
  <summary>New database instance configuration</summary>

  ```javascript
    const db = new Sequelize(
      (process.env.DATABASE_URL || 'postgres://localhost:5432/my-app-db'),
      {
        dialect: 'postgres',
        database: 'my-app-db',
        define: {
          underscored: true,
          returning: true
        }
      }
    );
  ```
 </details>

You don't need to add a variable for `DATABASE_URL` in a `.env` file. This variable will be used and set up automatically by Heroku, so we only need to pass it into our database instance.

## **Heroku**

### A. Create Heroku App

Navigate to your app's directory in your terminal shell, and run this command:

- `heroku create my-app-name`

### B. Set Buildpack

We're deploying a `node` app, so we should tell Heroku which buildpack to use with this command:

- `heroku buildpacks:set heroku/nodejs`

### C. Set Heroku Database To PostgreSQL

Create a new database on Heroku with the following command. **Add your app's name for the `--app=` flag!**

- `heroku addons:create heroku-postgresql:hobby-dev --app=my-app-name`

### D. Git Status, Add, Commit, and Push To Heroku

We're getting ready to push our code up to Heroku. When you ran `heroku create my-app` earlier, it automatically added a new remote named `heroku`. You can check this with `git remote -v`.

1. `git status`
1. `git add`
1. `git commit -m 'prepping for heroku deployment'` 
1. `git push heroku master`

### E. Sync and Seed Your Heroku Database

We told Heroku that our database is using postgresql. We now need to connect to Heroku's own terminal shell to `reset` and `seed` our deployed database.

- `heroku run bash`

Once we're connected to Heroku's bash shell, we're going to run two commands. Make sure you're specifying the correct filepath for your `resetDb.js` and `seed.js` files.

1. `node resetDb.js`
1. `node seed.js`

There should be no errors in this step if your app's code has been debugged properly when you started building up your app.
