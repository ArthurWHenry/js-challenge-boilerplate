# KinOcr

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Using the Sample CSV](#using-the-sample-csv)
- [Future Improvements](#future-improvements)

## Project Overview

This project is designed to read a [CSV](#using-the-sample-csv) file with policy numbers. When reading numbers from a file, a table will show with the row number, policy number, and the validity of the respective policy number.

## Prerequisites

Before you begin, ensure you installed the following requirements:

- Node.js (16.14.0^)
- npm (8^)

Once you have Node.js and npm installed, install the Angular CLI tool globally using the terminal:

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

The project includes a comprehensive test suite making sure that the individual components are working and the overall functionality of the application is working.

### Prerequisites for Running Tests

Ensure all project dependencies are installed by following the [Installation](#installation) section.

### How to Run Tests

To run all tests, execute the following command in the terminal:

```bash
  npm run test
```

### Interpreting Test Results

After running the tests, you will see an output in the terminal indicating which tests passed and which failed. For failed tests, a detailed error message will be provided to help diagnose the issue.

## Using the Sample CSV

To use the `sample.csv` file with the application, after setting up the [local environment](#installation), you can either drag and drop the file into the dropzone or click the dropzone to select the file.

## Future Improvements

- A tool that allows the user to check a single policy number for checksum validity
- Sorting each column so we can sort the table based on row number, policy number, or result
- We can add a section to manually add policy numbers to an existing or new list
- Adding edit and delete features to the end of the table so that users can make a policy number valid or remove invalid ones
- In addition to the previous point, we can add an export button to download the updated policy numbers for the user to keep
- Selectable rows so that we can export specific policy numbers or delete them
- A search bar at the top of the table where we can look for a specific policy number, or policy numbers with the same prefix
- Pagination for the table so we can focus on a specific set of numbers so the user doesn't feel overwhelmed with a scrollable list
