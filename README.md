# Wix Quiz System #

## Introduction ##
This is a very simple quizzing system for Wix websites that can be used to run quizzes as [seen here](https://saifurmohsin.wixsite.com/mysite/myquiz).

## Installation ##

#### Database setup ####
Create the necessary database collections. All the collections should have public read access, with the exception of the QuizUser collection which needs write access as well:

##### Quizzes #####

| Field Key | Description | Type
------------- | ------------- | ------------
id  | Primary key | Text
name | A name for the quiz | Text
description | A description about this quiz | Text
Ages | Age groups the quiz is intended for | Tags
Created Date | Date of quiz creation | Date and Time

##### Questions #####

| Field Key | Description | Type
------------- | ------------- | ------------
id  | Primary key | Text
question | The question | Text
quiz | Quiz this question belongs to | Reference
option1 | The first option | Text
option2 | The second option | Text
option3 | The third option | Text
answer | The answer option | Text

##### Users #####

| Field Key | Description | Type
------------- | ------------- | ------------
id  | Primary key | Text
name | A name of the user | Text
age | The age of the user | Number
Created Date | Date of user creation | Date and Time

##### QuizUser #####

| Field Key | Description | Type
------------- | ------------- | ------------
id  | Primary key | Text
quiz | The quiz taken by the user | Reference
user | The user who took the quiz | Reference
Created Date | The time the quiz was taken | Date and Time

#### Page setup ####

Create a page with 2 Texts: 1 heading and a description textbox, and 5 buttons and it should look something like:

![Screenshot](https://i.imgur.com/2s5quth.png)

#### Page setup ####
Put the javascript files in their respective folders and paste the page.js code into your page containing the quiz layout. Make sure to change the variable names with the correct selectors for the page elements created by you.
