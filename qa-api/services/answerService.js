import { sql } from "../database/database.js";

const submitAnswer = async (question_id, user_uuid, body) => {
    try {
        const result = await sql`INSERT INTO answers (question_id, user_uuid, body)
        VALUES (${question_id}, ${user_uuid}, ${body})
        RETURNING id, body, user_uuid, last_activity, 0 AS upvotes, false AS has_upvoted;`;

        if (result.length > 0) {
            return result[0];
        } else {
            throw new Error("Failed to insert new answer");
        }
    } catch (error) {
        console.error("Error submitting answer:", error);
        throw new Error("Failed to submit answer");
    }
};

const fetchQuestionAndAnswers = async (question_id, user_uuid) => {
    try {
        const question_details = await sql`
            SELECT q.id, q.user_uuid, q.title, q.body, q.last_activity, COUNT(qu.id) AS upvote_count,
            EXISTS ( SELECT 1 FROM question_upvotes qu WHERE qu.question_id = q.id AND qu.user_uuid = ${user_uuid} ) AS has_upvoted
            FROM questions q
            LEFT JOIN question_upvotes qu ON q.id = qu.question_id
            WHERE q.id = ${question_id}
            GROUP BY q.id, q.user_uuid, q.title, q.body, q.last_activity;`;

        const answers = await sql`
            SELECT a.id, a.body, a.user_uuid, a.last_activity, COUNT(au.id) AS upvote_count,
            EXISTS ( SELECT 1 FROM answer_upvotes au WHERE au.answer_id = a.id AND au.user_uuid = ${user_uuid} ) AS has_upvoted
            FROM answers a
            LEFT JOIN answer_upvotes au ON a.id = au.answer_id
            WHERE a.question_id = ${question_id}
            GROUP BY a.id, a.body, a.user_uuid, a.last_activity
            ORDER BY a.last_activity DESC
            LIMIT 20;`;

        return {
            question_id: question_id,
            user_uuid: question_details[0].user_uuid,
            title: question_details[0].title,
            body: question_details[0].body,
            has_upvoted: question_details[0].has_upvoted,
            last_activity: question_details[0].last_activity,
            upvotes: parseInt(question_details[0].upvote_count, 10),
            answers: answers.map(answer => ({
                id: answer.id,
                body: answer.body,
                user_uuid: answer.user_uuid,
                has_upvoted: answer.has_upvoted,
                last_activity: answer.last_activity,
                upvotes: parseInt(answer.upvote_count, 10)
            }))
        };
    } catch (error) {
        console.error("Error fetching answers:", error);
        throw new Error("Failed to fetch answers");
    }
};

const fetchAnswerUpdates = async (question_id, latest_date) => {
    try {
        return await sql`
            SELECT a.id, a.body, a.user_uuid, a.last_activity, COUNT(u.id) AS upvotes, false AS has_upvoted
            FROM answers a
            LEFT JOIN answer_upvotes u ON a.id = u.answer_id
            WHERE a.question_id = ${question_id} AND DATE_TRUNC('second', a.created_at) > DATE_TRUNC('second', ${latest_date}::timestamp)
            GROUP BY a.id
            ORDER BY a.created_at DESC
            LIMIT 20`;
    } catch (error) {
        console.error("Failed to fetch new answers:", error);
        throw new Error("Failed to fetch new answers");
    } 
}

const fetchAnswersPage = async (question_id, page_number, user_uuid) => {
    try {
        const offset = (page_number - 1) * 20;
        return await sql`
            SELECT a.id, a.body, a.user_uuid, a.last_activity, COUNT(u.id) AS upvotes,
            EXISTS ( SELECT 1 FROM answer_upvotes au WHERE au.answer_id = a.id AND au.user_uuid = ${user_uuid} ) AS has_upvoted
            FROM answers a
            LEFT JOIN answer_upvotes u ON a.id = u.answer_id
            WHERE a.question_id = ${question_id}
            GROUP BY a.id
            ORDER BY a.last_activity DESC
            LIMIT 20
            OFFSET ${offset}`;
    } catch (error) {
        console.error("Failed to fetch new answers:", error);
        throw new Error("Failed to fetch new answers");
    } 
}

const upvoteAnswer = async (answer_id, user_uuid) => {
    try {
        const upvote_result = await sql`
            INSERT INTO answer_upvotes (answer_id, user_uuid)
            VALUES (${answer_id}, ${user_uuid})
            ON CONFLICT DO NOTHING
            RETURNING id;`;

        if(upvote_result.length > 0 &&  upvote_result[0].id !== undefined) {
            const count_result = await sql`SELECT COUNT(*) AS upvote_count FROM answer_upvotes WHERE answer_id = ${answer_id};`;
            await sql` UPDATE answers SET last_activity = NOW() WHERE id = ${answer_id};`;
            return parseInt(count_result[0].upvote_count, 10);       
        }
    } catch (error) {
        console.error("Error upvoting answer:", error);
        throw new Error("Failed to upvote answer");
    }
};

export { fetchQuestionAndAnswers, upvoteAnswer, submitAnswer, fetchAnswerUpdates, fetchAnswersPage }