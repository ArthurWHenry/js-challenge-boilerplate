# KinOcr

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Using the Sample CSV](#using-the-sample-csv)

## Project Overview

This project is designed to read a CSV file (please refer to the [Using the Sample CSV](#using-the-sample-csv) section) with policy numbers. When reading numbers from a file, a table will show with the row number, policy number, and the validity of the respective policy number.

## Prerequisites

Before you begin, ensure you have met the following requirements:

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

The project includes a comprehensive test suite making sure that the individual components are working and the overall functionality of the application is working

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

To use the `sample.csv` file with the application, after setting up the local environment, you can either drag and drop the file into the dropzone or click the dropzone to select the file.
