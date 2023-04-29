# Quiz App

This is a web application for creating and taking quizzes.

## Table of Contents
Features\
Installation\
Usage\
Contributing\
Credits

### Features

Create and save multiple quizzes with titles and descriptions.
Add multiple-choice questions to a quiz with multiple options.
Allow users to take quizzes and view their scores.

### Installation

To get started with the quiz app, you need to have Node.js and Python 3 installed on your system.

Follow these steps to install the app:

 Clone this repository:

Run git clone django_quiz in your terminal. 

### Install the required packages:

Navigate to the frontend directory using cd client and run npm install to install the required packages for the React frontend.\
Navigate to the backend directory using cd ../quizapp and run pip install -r requirements.txt to install the required packages for the Django backend.
Start the development server:

In the frontend directory, run npm start to start the development server for the React app on http://localhost:3000.
In the backend directory, run python manage.py runserver to start the Django development server on http://localhost:8000.
Open the app in your browser:

Go to http://localhost:3000 in your web browser to access the React frontend.
To access the Django API endpoints, go to http://localhost:8000/ in your web browser. You can also use tools like Postman to test the API endpoints.

### Usage 

Creating a quiz:

Login as a Teacher
Go to the homepage.
Click on the "Create Quiz" button.
Enter the quiz title and description.
Click on the "Add Question" button.
Enter the question and its options.
Click on the "Save" button.

Taking a quiz:
Login as a student
Go to the homepage.
Click on the quiz you want to take.
Select your answer for each question.
Click on the "Submit" button.
View your score.

Viewing the leaderboard:

Login as a Teacher
Go to the homepage.
Scroll down to the "Leaderboard" section.
View the scores of all the users who have taken the quiz.

### Contributing

We welcome contributions from anyone. If you'd like to contribute, please follow these steps:

Fork this repository.
Create a new branch.
Make your changes.
Submit a pull request.

### Credits
This project is created by [Keshav002](https://github.com/Keshav002). Special thanks to the following resources:

[Django documentation](https://docs.djangoproject.com/en/3.2/)\
[React documentation](https://legacy.reactjs.org/docs/getting-started.html)