# Reflection

# Description
This project is a course QnA platform. Unregistered users can post questions, create answers to questions and upvote questions and answers. A simple llm-api is used to generate 3 sample answers to each newly created question.


# QA-api
The QA-api has all the essential methods for users to fetch, create and upvote questions and answers. In addition to this, the QA-api has specific endpoints for fetching new questions/answers, as well as fetching a certain page of questions/answers from the database. Upon creating a new question, the QA-api automatically handles the communication with LLM-api, which returns the generated answers to the question. Users send their user_uuid via headers for fetching data, as we also send the has_upvoted status for each element. I chose this because the api only sends 20 elements at a time, reducing the number of overall calls to the backend. The other option could have been lazy loading the upvoting status when needed, but I thought the benefits would be very minimal as we only send 20 elements at a time. 


# QA-ui
The QA-ui consists of Astro pages with Svelte components for the Course page, Questions list and the answers page. The application is styled with TailwindCSS. The UI aims for a smooth and responsive design that has all the necessary 
elements for viewing, creating and upvoting questions and answers. Posts by users have the necessary data, such as upvotes, date and the user uuid visible. Each page of the application fetches the data that is necessary for that specific page. Questions and answers are fetched in batches of 20, and they are always shown in order of recency. The UI has infinite scrolling implemented, so the user can load new questions by scrolling to the bottom of the screen. The UI uses short polling for fetching newly created questions and answers. In practice, the UI sends a GET request every 30 seconds with the date of the newest question/answers. The UI fetches data every time the components are mounted. This is because the data needs to be very recent, as a single upvote can make a question pop to the top.

# LLM-api
The LLM-api was provided in the template and returns a very simple answer to a created question.


# Improvements:

    - Session storage for the UI. This could be improved to remove unnecessary fetching of data from the backend, but I decided to not include it in the project because keeping the state in sync with the database requires a lot of   consideration.
    - The logic for fetching has_upvoted status could be further improved, actually measuring which is faster: implementing some kind of lazy loading for the upvote status or sending the data with regular fetches.
    - Infinite scrolling improvements: currently, the infinite scrolling does not (possibly) fetch accurate data. This is an issue with fetching the data by the last_activity date, which the upvoting can affect. Fetching accurate data with the infinite scrolling was not a requirement for the project, however.
    - Production configuration for UI. I was not able to get the production configuration working for the UI, and astro still runs in development mode. This would require the installation of a node adapter, for example.
    - Have the LLM-api send all three responses via a single HTTP request, instead of sending a request three times.
