# Netflix Clone - Client

This is the frontend client for the Netflix Clone application. It provides a user interface for browsing movies and TV shows, managing profiles, writing reviews, and more.

## Deployment to Netlify

### Prerequisites
- A Netlify account
- GitHub repository with your code
- Backend server deployed (e.g., on Render)

### Steps to Deploy

1. Create a new site on Netlify
2. Connect to your GitHub repository
3. Configure the following build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`

4. Add the following environment variables:
   - `REACT_APP_API_URL`: Your backend server URL (e.g., https://netflix-clone-server.onrender.com)

5. Click "Deploy site"

6. Configure Netlify for client-side routing:
   - Create a `_redirects` file in the `public` folder with the content:
     ```
     /*    /index.html   200
     ```
   - This ensures that React Router works correctly

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the required environment variables:
   ```
   REACT_APP_API_URL=http://localhost:5001
   ```
4. Start the development server: `npm start`

## Features

- User authentication and profile management
- Browse movies and TV shows
- Search functionality
- Add reviews and ratings
- Add content to "My List"
- Admin dashboard for content management

## Technologies Used

- React
- React Router
- React Query for data fetching
- Tailwind CSS for styling
- Shadcn UI components
