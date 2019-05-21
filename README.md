# Heroku Deployment For `express(sequelize)` Apps

You've worked tirelessly to conceptualize, organize, and build your `express.js` app, so it's only right that you complete its development cycle by taking it to production! We will go through the steps of properly deploying your postgres/sequelize/express app. Please carefully read through this tutorial before you start hacking away.

## Pre-Deployment

We will make some changes to our express app files in three locations: 
1. `package.json`
1. `models.js`
1. `server.js` (only if you're using a `.env` file)

---

## **package.json**

If you use `yarn` instead of `npm` as a package manager, please remember to delete the `yarn.lock` file from your express app directory before proceeding. Heroku deployment requires `npm` commands.

#### A. Proper installation of Dependencies

Your express app's `package.json` should have both `dependencies` and `devDependencies` sections:

<img width="350" alt="dependencies section" src="https://user-images.githubusercontent.com/40147976/58120614-98992500-7bd3-11e9-8246-7e46df3579f7.png">

#### B. dependencies vs. devDependencies

|`dependencies` | `devDependencies`|
|-------------- | --------------|
| Should contain **only** packages that are crucial to the core functionalities of your app. | Should contain **only** helper packages that makes your life easier as you're coding up your app. |
| `npm install` | `npm install --save-dev` |
| `express`, `morgan`, `body-parser`, `cors`, `dotenv`, `sequelize`, `pg` | `nodemon`, `eslint` |
| `bcrypt`, `jsonwebtoken`, `passport`, `passport-jwt`, `passport-local` |  |

Sectioning your dependencies is not specific to just express apps. You should differentiate necessary dependencies and dev dependencies for each of your `Node.js` apps (hint: `node_modules`).
 
#### C. Scripts

1. Modify your `start` command to `node server.js`.
1. Add `heorku-postbuild` command with `npm run build`.

<img width="900" alt="scripts section" src="https://user-images.githubusercontent.com/40147976/58120631-a2228d00-7bd3-11e9-8bd6-c1255129358c.png">

---

## **models.js**

#### A. Add Database URL To Sequelize DB Instance

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

## **server.js** 
(If Necessary)

**If you're not using .env variables for your express app, move on to the Create Heroku App section.**

- <details>
  <summary>If you're using `.env` variables to hide keys, tokens, and/or auth secrets, you need to make three additional changes to your express app files.</summary>

  #### A. Install `dotenv`

  The `dotenv` package allows you to use .env variables in your express app. Install this normally (not as a devDependency).

  - `npm install dotenv`

  #### B. Require `dotenv`

  <img width="350" alt="dotenv config" src="https://user-images.githubusercontent.com/40147976/58135052-ed01cc00-7bf6-11e9-8c0e-0f3d68c85b21.png">

  #### C. Add `.env` to your express app's `.gitignore`

  Make sure your express app's `.gitignore` has entries for `.env`.

  <img width="350" alt="git ignore env file" src="https://user-images.githubusercontent.com/40147976/58135713-7b774d00-7bf9-11e9-857d-b6ed39778542.png">

  #### D. Don't Commit `.env` Files

  You can double check if it's properly ignored with a `git status` check. 

  | Correct | Incorrect |
  | ------- | ------- |
  | <img width="350" alt="ignoring env file" src="https://user-images.githubusercontent.com/40147976/58135518-d8263800-7bf8-11e9-97f4-7fd25bd9f860.png"> | <img width="350" alt="not ignoring env file" src="https://user-images.githubusercontent.com/40147976/58135517-d8263800-7bf8-11e9-9b7e-07e5a217b540.png"> |
  | `.env` not tracked | `.env` is tracked |
  </details>

---

## **Heroku**

#### A. Create Heroku App

Navigate to your app's directory in your terminal shell, and run this command:

- `heroku create my-app-name`

#### B. Set Buildpack

We're deploying a `node` app, so we should tell Heroku which buildpack to use with this command:

- `heroku buildpacks:set heroku/nodejs`

#### C. Set Heroku Database To PostgreSQL

Create a new database on Heroku with the following command. **Add your app's name for the `--app=` flag!**

- `heroku addons:create heroku-postgresql:hobby-dev --app=my-app-name`

#### D. Set Environmental Variables (If Necessary)

- <details>
  <summary>Follow this step only if you're using a `.env` file for your express app. Otherwise, move on to next step.</summary>

  1. Navigate to your `.env` file in your code editor. We need to copy and paste each `.env` variable for our heroku config commands.

  <img width="350" alt="Screen Shot 2019-05-21 at 1 45 26 PM" src="https://user-images.githubusercontent.com/40147976/58136131-ff7e0480-7bfa-11e9-9782-a51682f5a12c.png">

  2. Set your `.env` variables for Heroku with the following command. Run this command for every environmental variable in your `.env` file!

  - `heroku config:set EXPRESS_APP_MESSAGE='keep this to yourself'`

  3. Go through your express files and make sure you're called the correct `.env` variable wherever you need to use them.

  <img width="350" alt="string interpolating env variables" src="https://user-images.githubusercontent.com/40147976/58136140-04db4f00-7bfb-11e9-8a40-b651489aaf97.png">
  </details>

#### E. Git Status, Add, Commit, and Push To Heroku

We're getting ready to push our code up to Heroku. When you ran `heroku create my-app` earlier, it automatically added a new remote named `heroku`. You can check this with `git remote -v`.

1. `git status`
1. `git add`
1. `git commit -m 'prepping for heroku deployment'` 
1. `git push heroku master`

#### F. Sync and Seed Your Heroku Database

We told Heroku that our database is using postgresql. We now need to connect to Heroku's own terminal shell to `reset` and `seed` our deployed database.

- `heroku run bash`

Once we're connected to Heroku's bash shell, we're going to run two commands. Make sure you're specifying the correct filepath for your `resetDb.js` and `seed.js` files.

1. `node resetDb.js`
1. `node seed.js`

There should be no errors in this step if your app's code has been debugged properly when you started building up your app.

---

## Post Deployment

Your express app should be up and running on Heroku now. Navigate to your deployed app's link and check if it's responding with json data from your RESTful endpoints.

#### A. Pushing Changes to Heroku

- If you make additional changes to your app's code, you just need to `add, commit, push` to your repo's heroku `remote`. 

- If you're using additional environmental variables in your `.env` file, make sure you use the `heroku config:set` command. Otherwise, Heroku won't recognize `process.env.SOME_VARIABLE` in your express files.
