# LeetCode Clone

Live Project Link : [https://leetcode-clone-zltt.onrender.com/](https://leetcode-clone-zltt.onrender.com/)

## Description
This project is a LeetCode clone, providing a platform for users to practice coding problems, submit their solutions, and view leaderboards. It is built using Next.js for frontend, Express.js for the backend and MongoDB for database storage.

## Features
- **Problem List**: Users can view a list of all available coding problems.
- **Individual Problem View**: Users can view details of each individual problem and submit their solutions.
- **Submission List**: Users can view a list of all submissions made for coding problems.
- **Leaderboard**: Users can view a leaderboard ranking based on points scored.

## Website Demo
![Demo](https://github.com/akshaydhayal/leetcode-clone/blob/main/leetcode.png)

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js,
- **Database**: MongoDB(for user data),   Cloudinary (for storing user files)

## Endpoints
- **See All Problems List**: `GET /problems`
- **See Each Individual Problem and Solve It**: `GET /problems/:id`
- **Submission List**: `GET /submissions`
- **Leaderboard**: `GET /leaderboard`

## MongoDB Collections
- **ProblemList**
  - Fields: `title`,`description` `topic tags`, `difficulty`, `points`, `hints`, `examples`, `constraints`
- **SubmissionList**
  - Fields: `problemSubmitted`, `solvedStatus`, `submitTime`, `user`
- **UserList**
  - Fields: `name`, `avatar`, `pointsScored`, `college`, `email`, `problems solved`

## Setup Instructions
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables in a `.env` file.
4. Start the server using `npm start`.


## License
This project is licensed under the MIT License.
