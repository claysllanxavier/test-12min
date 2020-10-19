<div align="center">
      <img src="https://12min.com/assets/images/logo.svg" width="300px"/>
</div>

<br />

<h2 align="center">
   Test 12min
</h2>

<p align="center">
  <img alt="Project programing languages count" src="https://img.shields.io/github/languages/count/claysllanxavier/test-12min?color=34cb79">
   <img alt="Repository size" src="https://img.shields.io/github/repo-size/claysllanxavier/test-12min?color=34cb79">
  <img alt="Last commit on GitHub" src="https://img.shields.io/github/last-commit/claysllanxavier/test-12min?color=34cb79">
  <img alt="Made by Claysllan" src="https://img.shields.io/badge/made%20by-clayslanxavier-%20?color=34cb79">
  <img alt="Project top programing language" src="https://img.shields.io/github/languages/top/claysllanxavier/test-12min?color=34cb79">
  <img alt="GitHub license" src="https://img.shields.io/github/license/claysllanxavier/test-12min?color=34cb79">
</p> 

<p align="center">
  <a href="#computer-project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-built-with">Built with</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-run">How to run</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#mailbox_with_mail-get-in-touch">Get in touch</a>
  </p>

<p align="center">
  <a href="https://insomnia.rest/run/?label=Run%20in%20Insomnia&uri=https://raw.githubusercontent.com/claysllanxavier/test-12min/main/Insomnia_2020-10-19.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia">
  </a>
</p>

## :computer: Project 

This test is an application that aims to save audiobooks and servers in HLS for clients.

## :rocket: Built with

This project was developed with the following technologies:

-   [Node.js](https://nodejs.org/)
-   [PostgresSQL](https://www.postgresql.org/)
-   [Express](https://expressjs.com/)
-   [TypeORM](https://typeorm.io/)
-   [Typescript](https://www.typescriptlang.org/)
-   [TS-Node-Dev](https://www.npmjs.com/package/ts-node-dev)
-   [uuidv4](https://www.npmjs.com/package/uuidv4)
-   [Cors](https://www.npmjs.com/package/cors)
-   [ESLint](https://eslint.org/)
-   [Prettier](https://prettier.io/)
-   [VS Code](https://code.visualstudio.com/)

## :information_source: How to run

### Requirements

To run the application you will need:
* [Git](https://git-scm.com)
* [Node](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/) 

```
Now clone the repository and install the dependencies.

```bash
# to clone the repository
$ git clone https://github.com/claysllanxavier/test-12min.git

# go into the folder
$ cd test-12min

#install the backend dependencies
$ yarn

```
To connect to the database, you will need to enter the access information into a .env file. Duplicate the .env.example and insert your data. Postgres was used as a database.

```bash
# run migrations
$ yarn typeorm migration:run

# run api
$ yarn dev

# run tests
$ yarn test
```

## :memo: License

This project is under the MIT license. See the [LICENSE](https://github.com/claysllanxavier/test-12min/blob/master/LICENSE) for more information

## :mailbox_with_mail: Get in touch!

<a href="https://www.linkedin.com/in/claysllanxavier/" target="_blank" >
  <img alt="Linkedin - Claysllan Xavier" src="https://img.shields.io/badge/Linkedin--%23F8952D?style=social&logo=linkedin">
</a>&nbsp;&nbsp;&nbsp;
<a href="mailto:claysllan@gmail.com" target="_blank" >
  <img alt="Email - Claysllan Xavier" src="https://img.shields.io/badge/Email--%23F8952D?style=social&logo=gmail">
</a> 

---

Made with :coffee: and ❤️ by Claysllan Xavier.