## **Flex Mills**

Flex Mills is a personalised Les Mills workout discovery platform designed to help users find suitable sessions based on their movement needs, symptoms and preferences. Users can browse workouts, filter by type and suitability, read community reviews, and contribute their own experience to support others.

The platform is built with Next.js (App Router), Tailwind CSS and Clerk for authentication and user management. Data is stored in a a Postgres database, and the UI is enhanced with accessible components using Radix UI, React Icons and Tailwind animations.

## **Features**

Workout Discovery

- Browse all Les Mills workouts available in the app
- Filter workouts by exercise type (e.g. cardio, strength, flexibility)
- Filter workouts by suitability (e.g. hip-friendly, low-impact, knee-friendly)
- View detailed workout information including duration, type, suitability, and heavily featured movements
- Access the full workout via a direct link to the corresponding Les Mills video

Community Insights

- Read reviews from users with different capabilities
- View user profiles to understand their workout journey
- Leave your own review for any workout

User Profiles

- Create a Flex Mills profile with username and bio
- View other users' profiles and their posted reviews
- Edit your profile at any time
- Manage authentication and security through Clerk

## **Setup Instructions**

1. Fork the repository (check "copy the main branch only") and clone your fork to your local machine
2. Run npm install
3. Create a .env file in the root directory and add the following environment variables:
   - DB_CONN = the URL of your Postgres database
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = the API public key provided by Clerk
   - CLERK_SECRET_KEY = the API secret key provided by Clerk
   - NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL = /workouts
   - NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL = /users/new
4. Run npm run dev to start the development server
5. Open http://localhost:3000 with your browser to see the site

## **Potential future features**

- Favouriting workouts so user can save sessions they love
- User-created playlists e.g. "Bad Hip Day" or "Low-Impact Favourites"
- Upvoting and downvoting of community reviews to surface the most helpful insights
- Light / dark mode for improved accessibility and user preference
- Toast notifications for actions such as saving a workout, submitting a review, or deleting content
