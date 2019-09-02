# Code Canary

<p align="center">
    <img src="https://i.imgur.com/L8gxQk0.png" alt="logo" height=200/>
</p>

Interactive learning for youths and children who do not have laptop and limited or costly internet access
- F8 Hackathon Submission

## Run

1. Create an `.env` file and fill in the values.

    - Run `cp .env.example .env` to create a `.env` file.
    - Go to [https://developers.facebook.com/](), login and copy the messenger credentials.
    - Take `mongodb://localhost:27017/codeCanary` as the default value for `MONGODB_URI`.

2. Start the development server - this will start a mongodb server

    ```bash
    yarn start
    ```

## Code

`DAO`: `Data Access Object`

## About the project

### Inspiration
Code Canary provides early access to technological empowerment for youths who do not have access to formal training, computers and internet. By lowering the barrier of entry for acquiring crucial technological skills such as programming we can ensure that they have a greater chance at making it in an increasingly technological society. This is in response to high youth unemployment in spite of availability of tech jobs requiring programming skills and in pursuit of fulfilling the SGD 4: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all".

### What it does
Code Canary achieves the goal by providing interactive learning through a friendly and conversational medium known as chat bots, leapfrogging the requirement for laptops and reaching mobile phones in even remote areas. Limits such as costly data plans are also alleviated by leveraging data plans that include free or discounted social media data plans bundles and delivering content through Facebook.

Code Canary presents content (text, graphics), activities (tasks, discussions) and assessment on basic programming skills.

### How we built it
We came up with a topic aiming to teach basic coding skills to youth interested in app development. After brainstorming ideas on possible instructional formats, we agreed on adopting a messenger bot for instruction, as it presented the best opportunity for providing interactive, flexible yet affordable state of the art programming content. Building on messenger takes advantage of the facebook free basic data-light service which provides internet access to low income countries thus providing access for unemployed youth to learn from social media using smart phones. Moreover, mobile service providers in Africa offer cheap bundles to support access to social media platforms. To execute the project, we divided tasks among team members. Tasks included drafting the diagram flow which we did as a group, then we divided duties into two: setting up the messenger bot and cloning a sample code. The bot was divided into services such as the database, assignment service, messaging services, NLP which were assigned to different team members to develop and bring together. A demo version/prototype was hosted for review and redesigned before publishing the final version.

### Challenges we ran into
Learning how to use the messenger bot was a challenge as none of the team members was conversant with it.
Given the contextual variations, adapting the NLP to user responses was a challenge
Designing the interactive flow for meaningful user experience was a challenge
Accomplishments that we're proud of
Developing an application that can provides skills to solve unemployment
Building a messenger bot

### What we learned
The potential of the messenger platform for providing individualised instruction
Using a tech platform to solve a pressing issue in society
Insight into the 4 SDGs and the implications for tech solutions
Insight into content development for coding instruction

### What's next for Code Canary
- Make the bot more engaging and interactive
- Advancing the content level from basic programming
- Enabling the learners to publish the homepage they develop so as to market themselves

### Built With

- Node.js
- JavaScript
- Facebook Messenger API
- Heroku
- GitHub
- Facebook Graph API

### Try it out

- [Web page](https://codecanary.now.sh/)
- [F8 Hackathon submission page](https://devpost.com/software/icode)
