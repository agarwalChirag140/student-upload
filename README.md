# Angular Data Validation Project

This Angular project is designed to handle data validation for various types of inputs, including names, cities, addresses, GPAs, emails, and phone numbers. The validation logic ensures that data meets specific criteria before being processed.

## Project Overview

The application performs the following tasks:
- Validates and processes CSV files containing student data.
- Displays validation errors for incorrect data.
- Ensures that each data field adheres to predefined rules.

## Features

- **Name, City, Address Validation:** Ensures these fields are strings and not empty.
- **GPA Validation:** Checks if the GPA value is a number between 0 and 10.
- **Email Validation:** Verifies that the email follows a valid format.
- **Phone Number Validation:** Ensures the phone number is a 10-digit integer.

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- **Node.js** :- 22.6.0
- **npm** :- 10.8.2
- **Angular CLI** :- 18.2.1

### Installation Steps

- **Clone the repository** :- git clone  https://github.com/agarwalChirag140/student-upload.git
- **Installing the dependency** :- npm Install
- **Start The angular server** :- ng s
