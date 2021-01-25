# Capstone: Restaurant Reservation System

Used by restaurant personnel when a customer calls to request a reservation.
No online access by the customer at this point.

There are no user stories for deployment, it is expected that you will deploy the application to production after you finish a user story.

## Existing files

As you work through the Node.js, Express & PostgreSQL module, you will be writing code that allows your frontend and backend code to talk to eachother. It will also allow your controllers and services to connect to and query your PostgreSQL database via [Knex](http://knexjs.org/). The table below describes the files and folders in the starter code:

| Folder/file path | Description                                                                      |
| ---------------- | -------------------------------------------------------------------------------- |
| `back-end`       | Directs requests to the appropriate routers.                                     |
| `front-end`      | Starts the server on `localhost:5000` by default.                                |
| `src/db/`        | A folder where you will add migration and seed files for your database later on. |
| `src/errors/`    | A folder where you will find several functions for handle various errors         |
| `.env.sample`    | A sample environment configuration file                                          |

This starter code closely follows the best practices and patterns established in the Robust Server Structure module.

## Database setup

1. Set up three new ElephantSQL database instance - development, test, and production - by following the instructions in the "PostgreSQL: Creating & Deleting Databases" checkpoint.
1. After setting up your database instances, connect DBeaver to your new database instances by following the instructions in the "PostgreSQL: Installing DBeaver" checkpoint.

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `.env` file with a connection URL to your ElephantSQL database instance.
1. Run `npm install` to install project dependencies.
1. Run `npm test` to run the tests.   
1. Run `npm run start:dev` to start your server in development mode.

If you have trouble getting the server to run, reach out for assistance.

## Product Backlog

The tests exist for each of these user stories. The tests are organized by user story so that you know exactly which tests
you need to make pass for the user story you are currently implementing. 

There are no user stories for deployment. You are encouraged to deploy early and often. You may even decide to deploy
before adding any features.  Since this is a monorepo, you can follow the instructions in [this vercel article on monorepos](https://vercel.com/blog/monorepos) to deploy this project.

### US-1 Create and list reservations

As a restaurant manager
I want to create a new reservation
so that I know how many customers will arrive at the restaurant on a given day.

#### Acceptance Criteria

1. The `/reservations/new` page will 
   - have the following required and not-nullable fields.
	   - First name
	   - Last name
	   - Mobile number
	   - Date of reservation
	   - Time of reservation
	   - Number of people in the party, which must be at least 1 person.
   - display a `Submit` button that, when clicked, saves the new reservation then displays the `/dasboard` page for the date of the new reservation
   - display a `Cancel` button that , when clicked, returns the user to the previous page.
1. The `/dasboard` page will
   - list all reservations for a one date, defaulted to today and sorted by time
   - Display next, previous, and today buttons that allow the user to see reservations on other dates

> **Hint** Dates and times are JavaScript and databases can be challenging. 
> The users have confirmed that they will be using Chrome to access the site. 
> 
> This means you can use `<input type="date" />` and `<input type="time" />`, which are supported by Chrome but may not work in some other browsers.
> 
> `<input type="date" />` will store the date in `YYYY-MM-DD` format, this is a format that works well with the PostgreSQL `date` data type.
> `<input type="time" />` will store the date in `HH:MM:SS` format, and this is a format that works well with the PostgreSQL `time` data type.
> 
> You do no need to worry about different or changing time zones for the dates or times.

### US-2 TBD


