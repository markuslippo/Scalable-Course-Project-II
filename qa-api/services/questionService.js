import { sql } from "../database/database.js";

const submitQuestion = async (course_id, user_uuid, title, body) => {
    try {
        const result = await sql`
            INSERT INTO questions (course_id, user_uuid, title, body)
            VALUES (${course_id}, ${user_uuid}, ${title}, ${body})
            RETURNING id, title, user_uuid, last_activity, 0 AS upvotes, false AS has_upvoted;`;

        if (result.length > 0) {
            return result[0];
        } else {
            throw new Error("Failed to insert new question");
        }
    } catch (error) {
        console.error("Error submitting question:", error);
        throw new Error("Failed to submit question");
    }
};

const fetchQuestions = async (course_id, user_uuid) => {
    try {
        const course = await sql`
            SELECT id, title
            FROM courses
            WHERE id = ${course_id}
            LIMIT 1;`;

        const questions = await sql`
            SELECT q.id, q.title, q.user_uuid, q.last_activity, COUNT(qu.id) AS upvotes,
            EXISTS (SELECT 1 FROM question_upvotes qu WHERE qu.question_id = q.id AND qu.user_uuid = ${user_uuid}) AS has_upvoted
            FROM questions q
            LEFT JOIN question_upvotes qu ON q.id = qu.question_id
            WHERE q.course_id = ${course_id}
            GROUP BY q.id
            ORDER BY q.last_activity DESC
            LIMIT 20;`;

        return { course_id: course[0].id, course_title: course[0].title, questions };
    } catch (error) {
        console.error("Error: ", error);
        throw new Error("Database: Failed to fetch questions");
    }
};

const fetchQuestionUpdates = async (course_id, latest_date) => {
    try {
        return await sql`
            SELECT q.id, q.title, q.user_uuid, q.last_activity, COUNT(u.id) AS upvotes, false AS has_upvoted
            FROM questions q
            LEFT JOIN question_upvotes u ON q.id = u.question_id
            WHERE q.course_id = ${course_id} AND DATE_TRUNC('second', q.created_at) > DATE_TRUNC('second', ${latest_date}::timestamp)
            GROUP BY q.id
            ORDER BY q.created_at DESC
            LIMIT 20;`;
    } catch (error) {
        console.error("Failed to fetch new questions:", error);
        throw new Error("Failed to fetch new questions");
    } 
}

const fetchQuestionsPage = async (course_id, page_number, user_uuid) => {
    try {
        const offset = (page_number - 1) * 20;
        return await sql`
            SELECT q.id, q.title, q.user_uuid, q.last_activity, COUNT(u.id) AS upvotes,
            EXISTS (SELECT 1 FROM question_upvotes qu WHERE qu.question_id = q.id AND qu.user_uuid = ${user_uuid}) AS has_upvoted
            FROM questions q
            LEFT JOIN question_upvotes u ON q.id = u.question_id
            WHERE q.course_id = ${course_id}
            GROUP BY q.id
            ORDER BY q.last_activity DESC
            LIMIT 20
            OFFSET ${offset}`;
    } catch (error) {
        console.error("Failed to fetch new questions:", error);
        throw new Error("Failed to fetch new questions");
    } 
}

const upvoteQuestion = async (question_id, user_uuid) => {
    try {
        const upvote_result = await sql`
            INSERT INTO question_upvotes (question_id, user_uuid)
            VALUES (${question_id}, ${user_uuid})
            ON CONFLICT DO NOTHING
            RETURNING id;`;

        if(upvote_result.length > 0 &&  upvote_result[0].id !== undefined) {
            const count_result = await sql`SELECT COUNT(*) AS upvote_count FROM question_upvotes WHERE question_id = ${question_id};`;
            await sql` UPDATE questions SET last_activity = NOW() WHERE id = ${question_id};`;
            const upvote_count = parseInt(count_result[0].upvote_count, 10);   
            return upvote_count;
        }
    } catch (error) {
        console.error("Error upvoting question:", error);
        throw new Error("Failed to upvote question");
    }
};

export { fetchQuestions, submitQuestion, upvoteQuestion, fetchQuestionUpdates, fetchQuestionsPage }