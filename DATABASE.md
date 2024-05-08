# Database

The database has the following tables: courses, questions, answers, question_upvotes and answer_upvotes. The first three contains rows representing courses, questions and answers, respectively.
The question_upvotes and answer_upvote tables contain id tuples, the other being the object and the other being the user_uuid. A question has X amount of upvotes, if it's id is in X number of rows in these
tables. 

The database has indexing in place to speed up searches. The indexes aim to speed up retrieval of questions based on course_id, answers based on the question_id, user activity related indexing in upvotes as well as
faster retrieval of answers and questions based on the last_activity value.

There is no major caching in place, except for the courses data. The answers and courses are changing very rapidly, whether by upvoting or by creating new questions/answers.