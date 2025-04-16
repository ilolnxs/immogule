# immogule

## Project Description

Immogule is a real estate management application designed to help real estate investors manage their portfolio efficiently. The application provides a centralized database schema for storing data, a GUI for entering new values, and automated data collection. The application is containerized and can be deployed to GCP Cloud Run.

## Setting Up the Database Schema

1. Create a new PostgreSQL database.
2. Run the SQL script located at `database/schema.sql` to set up the database schema.

## Running the GUI

1. Open the `gui/index.html` file in a web browser.
2. Use the form to enter new values and the table to view existing values.

## Automating Data Collection

1. Run the `automation/data_collection.py` script to fetch data from external sources and update the database.

## Containerizing the Application and Deploying to GCP Cloud Run

1. Build the Docker image using the provided `Dockerfile`.
2. Use the `cloudbuild.yaml` file to configure Google Cloud Build and deploy the container to GCP Cloud Run.
