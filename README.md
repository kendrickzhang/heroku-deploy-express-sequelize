# Heroku Deployment Tutorial For `express(sequelize)` apps

## Package.json
### A. dependencies
Your express app's `package.json` should have both `dependencies` and `devDependencies` sections:

<img width="200" alt="dependencies section" src="https://user-images.githubusercontent.com/40147976/58120614-98992500-7bd3-11e9-8246-7e46df3579f7.png">

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

<img width="700" alt="Screen Shot 2019-05-21 at 10 35 58 AM" src="https://user-images.githubusercontent.com/40147976/58120631-a2228d00-7bd3-11e9-8bd6-c1255129358c.png">
