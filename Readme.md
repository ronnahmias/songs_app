# Songs App

## Main Stack:

- Frontend: React with TypeScript, Mui Material Components, React Query, Yup Validations, React Router, Formik.
- Backend: Nestjs, class-validator, TypeORM.
- DB: PostgreSQL.

## Main Features:

- Uploading CSV to add new songs including adding youtube link for watching.
- Multi options for filtering songs: Search Bar, Slider Range for years and MultiChoice filter by Band Name.
- Add New Song Page.
- Option for deleting.
- Server side pagination.

## Installations

- Docker
- clone this app
- add .env file

## Running the App

- run in terminal: `docker-compose up`
- wait to all apps to start successfully
- open browser: `http://localhost:5173`

- Or you can run each app separately by install dependencies `npm install` and then run the apps `npm run dev` / `npm run start:dev`

## Example ENV:

DB_DATABASE=postgres <br />
DB_HOST=host.docker.internal <br />
DB_PORT=5432 <br />
DB_USERNAME=postgres <br />
PORT=3333 <br />
VITE_API_BASE_URL=http://localhost:3333/ <br />
NODE_ENV=development
