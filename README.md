# KinOcr

## Project Overview

This project is designed to read a CSV file (please refer to the [Using the Sample CSV](#using-the-sample-csv) section) with policy numbers. After reading the policy numbers from the file, the no data message will now show a table with the policy numbers and an additional column that shows a result column that shows the validity of that policy number.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (16.14.0^)
- npm (8^)

Once you have Node.js and npm installed, install the Angular CLI tool globally on your system:

```bash
npm install -g @angular/cli
```

## Installation

Clone the project:

```bash
  # via SSH
  git@github.com:ArthurWHenry/js-challenge-boilerplate.git

  # via HTTPS
  https://github.com/ArthurWHenry/js-challenge-boilerplate.git
```

Go to project directory:

```bash
  cd js-challenge-boilerplate
```

Install dependencies:

```bash
  npm install
```

## Running the Application

If you haven't installed the dependencies yet, please refer to the [Installation](#installation) section for instructions on how to do so.

To start the server, run:

```bash
  npm run start
```

## Running Tests

The project includes various tests making sure that the individual components are working and the over functionality of the application is working. To run these tests, execute:

```bash
  npm run test
```

## Using the Sample CSV

To use the `sample.csv` file with the application, after you've set up your local environment, you can either drag and drop the file into the dropzone or click the dropzone to select the file.
