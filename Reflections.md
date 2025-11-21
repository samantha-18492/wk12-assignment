## **Problem Domain**

Les Mills users struggle to find workouts that suit their needs (e.g. low-impact, hip-friendly) and often rely on social media channels for advice and recommendations.

## **End goal**

A supportive platform where individuals can confidently discover and share safe workout options, empowering users to stay active, informed and connected through an inclusive and personalised fitness experience.

## **User stories - MVP**

As a user, I want:

- to create a profile, so I can share my movement needs and connect with others.
- to browse available Les Mills workouts so I can explore new options.
- to filter workouts by type, such as cardio or strength, so I can choose based on what my body needs that day.
- to filter by suitability, like low-impact, hip-friendly or back-friendly, so I can avoid exercises that might aggravate pain or instability.
- to see a list of key moves (e.g. high knees) included in each workout, so I can avoid workouts that won’t be suitable.
- to read reviews from other users with similar conditions, so I can the suitability of a workout.
- to leave my own review to support others in the community.
- secure, reliable authentication, so my profile, reviews and preferences are protected.

## **User stories - Stretch goals**

As a user, I want to:

- save workouts so that I can quickly access workouts that work well for me.
- create my own personal lists which I can save workouts to e.g. save a workout to a bad knee day / bad hip day playlist
- search for workouts by name or keyword so I can quickly locate a specific session.
- filter reviews by condition e.g. search for reviews from a user who has declared hypermobility.
- upvote reviews that were helpful so that the best safety advice surfaces first.
- track which workouts I’ve completed and how they felt so I can see patterns and adjust routines.
  As an admin, I want to:
- add new workouts with metadata so that users have up-to-date options.
- edit or remove workouts so that the database remains accurate.

## **Wireframes**

<img width="1078" height="711" alt="Image" src="https://github.com/user-attachments/assets/7ed39edf-c564-4668-a57e-79a982a6e4fd" />

## **User journey - Logging in**

<img width="620" height="441" alt="Image" src="https://github.com/user-attachments/assets/18b68441-19f1-40cb-9508-81334e455761" />

## **Design & Accessibility**

<img width="744" height="767" alt="Image" src="https://github.com/user-attachments/assets/b61f151e-7886-4705-8039-89a945afe031" />

<img width="755" height="298" alt="Image" src="https://github.com/user-attachments/assets/26c91b33-19e4-4e30-b7f3-aff08bb06c56" />

## **Database**

<img width="1027" height="659" alt="Image" src="https://github.com/user-attachments/assets/12228447-8cd0-44b3-8e4b-77233a6572d3" />

## **Project Management**

<img width="1001" height="679" alt="Image" src="https://github.com/user-attachments/assets/5832b8ee-22f7-4ded-a1e9-4f571c3b133e" />

## **Reflections**

Building Flex Mills was both a technically challenging and personally meaningful project. The concept was inspired by my own experience of navigating exercise with hypermobility, so I felt a responsibility to ensure the app genuinely solved the problems users face. Translating this lived experience into clear problem domains and user stories gave the project strong direction from the start, and these remained central throughout development.

One of the achievements I’m most proud of is implementing workout filtering. Filtering has been a stretch goal in previous projects, but this time I prioritised it and built a system that allows users to narrow down workouts by exercise type and suitability. Given that this is one of the core problems the app aims to solve, seeing it come together felt particularly rewarding. The dynamic user route was another important milestone. Handling different states required careful logic and testing. Implementing conditional rendering for edit and delete permissions based on the current user ID was a challenge I’m proud to have overcome.

Working solo came with its own difficulties. Time management was the biggest challenge, especially with a feature-rich project and limited development time. As a result, several stretch goals couldn’t be included in the final build. However, documenting these future improvements in advance has given the project a clear roadmap for continued development.

I’m glad I invested time into wireframing, user journey planning and accessibility, but this area also came with an unexpected challenge. Initially, I was worried about the visual design because I wanted Flex Mills to feel cohesive with the established Les Mills brand and existing app (even though their style isn’t one I personally gravitate toward). Working with a design aesthetic I didn’t naturally connect with pushed me out of my comfort zone, but I’m ultimately really glad I committed to it. It gave me valuable experience in adapting to an existing brand identity, something I know will be essential in real-world projects where I won’t always get to choose the visual direction. The process also strengthened my understanding of accessibility as I dedicated time to navigating the app with Windows Narrator. This helped inform ARIA label placement and ARIA-live regions. Achieving a Lighthouse accessibility score of 100 was a rewarding outcome of these efforts.

Overall, Flex Mills pushed me technically and creatively. It strengthened my understanding of full-stack development, improved my confidence in structuring more complex logic, and reinforced the importance of thoughtful planning and accessibility. Most of all, it reminded me how impactful software can be when it’s built with empathy and shaped by real user needs.
