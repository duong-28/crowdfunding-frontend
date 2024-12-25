# Crowdfunding Front End for Atletico Saigon

by Lucy Nguyen

Deployed front end project link: <https://atleticosaigon.netlify.app/>

> A React-based crowdfunding platform designed to support youth soccer initiatives. The platform enables users to create and manage fundraising projects, make pledges, and track funding progress in real-time. Features include project creation, anonymous pledging, funding progress tracking, and a responsive modern UI.


## Project Requirements/Specs

- [x] Be separated in to two distinct projects: an API built using the Django Rest Framework and a website built using React.
- [x] Have a unique and creative project name (bonus points for puns and missing vowels!).
- [x] Define a clear target audience for the platform.
- [x] Implement user accounts with the following attributes:
    - [x] Username
    - [x] Email address
    - [x] Password
- [x] Enable users to create a "project" to be crowdfunded with at least these attributes:
    - [x] Title
    - [x] Owner (a user)
    - [x] Description
    - [x] Image
    - [x] Target amount to fundraise
    - [x] Status of accepting new supporters (open/closed)
    - [x] Creation date
- [x] Allow users to make "pledges" to a project, including at least these attributes:
    - [x] Amount
    - [x] The project the pledge is for
    - [x] The supporter/user (who created the pledge)
    - [x] Option for anonymous pledging
    - [x] Comment on the pledge
- [x] Implement suitable update/delete functionality, e.g., define if a project owner can update project details.
- [x] Define permissions, e.g., specify who can delete a pledge.
- [x] Return relevant status codes for both successful and unsuccessful API requests.
- [x] Handle failed requests gracefully (e.g., implement a custom 404 page instead of a default ev rror page).
- [x] Use Token Authentication, including an endpoint for obtaining a token along with the current user's details.
- [x] Ensure responsive design for mobile and desktop compatibility.

### Deployed Project Link

<https://atleticosaigon.netlify.app/>

### Homepage
![Homepage](public/photos/Homepage.gif)