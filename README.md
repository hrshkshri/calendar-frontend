# Calendar App - 📅 Frontend 📅

Calendar app is a web application for manage your life **private** events using a Calendar. Create an account and start organizing your days.

You are the only admin of your events, being able to:

- [x] Create events
  - Title, notes (optional), start date, end date
- [x] Update events
- [x] Delete events

**Update**

From march 2023 you can only see your events, that means all the events are now private.

## What is this repository ?

It's the source code for the frontend of the calendar app.

### Tech stack

This project was created using the **M.E.R.N.** stack that stands for MongoDB, Express.js, React.js and Node.js

#### Frontend

- **Frontend library -** [react.js](https://reactjs.org/)
- **State container -** [Redux.js](https://redux.js.org/) with [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routes -** [React Router](https://reactrouter.com/en/main)
- **Tests -** [React testing library](https://testing-library.com/) and [Jest](https://jestjs.io/)
- **Continuous Integration -** [GitHub Actions](https://github.com/features/actions), check [calendar.yml](.github/workflows/calendar.yml) file
- **Build tool -** [Vite.js](https://vitejs.dev/)
- **Main programming languaje -** [javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

##### Dependencies

Read other project dependencies and versions in the [package.json](package.json) file.

#### Backend

### Development

4. Install the project dependencies using [npm install](#npm-install)
5. Rename the [.env.development.template](.env.development.template) file to ***.env.development***
6. Start the project using [npm run dev](#npm-run-dev)

### Testing

4. Install the project dependencies including development dependencies using [npm install --include=dev](#npm-install-development)
5. Rename the [.env.test.template](.env.test.template) file to ***.env.test*** and complete the pending environment variables
6. Start the project using [npm run test](#npm-run-test)

### Production

4. Rename the [.env.production.template](.env.production.template) file to ***.env.production*** and set the env variable *VITE_API_URL* to your deployed backend api url, take in account it should finish with ***/api***
6. Create optimized production site using the command [npm run build](#npm-run-build)
7. Upload the dist folder to you preferred host
