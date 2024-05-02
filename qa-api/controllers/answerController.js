import * as answerService from "../services/answerService.js"

const user_timestamp = new Map();

const fetchQuestionAndAnswers = async (request, urlPatternResult) => {
    try { 
    	const question_id = urlPatternResult.pathname.groups.question_id;
        const user_uuid = request.headers.get("user");
    	return await answerService.fetchQuestionAndAnswers(question_id, user_uuid);    
    } catch(error) {
    	console.error(error);
    }
  };

const submitAnswer = async (request) => {
    try {
        const { question_id, user_uuid, body } = await request.json();

        const now = new Date().getTime();
        const previous_answer_time = user_timestamp.get(user_uuid);

        if(previous_answer_time && now - previous_answer_time < 60000) {
            return new Response(JSON.stringify({ message: 'Only one answer per minute' }), {
                status: 409,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        user_timestamp.set(user_uuid, now);
        return await answerService.submitAnswer(question_id, user_uuid, body);
    } catch (error) {
        console.error("Failed to post answer:", error);
    }
};

const fetchAnswerUpdates = async(request, urlPatternResult) => {
    try {
        const question_id = urlPatternResult.pathname.groups.question_id;
        const latest_date = request.headers.get("latest-date");
        return await answerService.fetchAnswerUpdates(question_id, latest_date);
    } catch (error) {
        console.error("Failed to fetch updates ", error);
    }
}


const fetchAnswersPage = async(request, urlPatternResult) => {
    try {
        const question_id = urlPatternResult.pathname.groups.question_id;
        const page_number = urlPatternResult.pathname.groups.page_number;
        const user_uuid = request.headers.get("user");
        return await answerService.fetchAnswersPage(question_id, page_number, user_uuid);
    } catch (error) {
        console.error("Failed to fetch updates ", error);
    }
}

const upvoteAnswer = async (request, urlPatternResult) => {
    try {
        const answer_id = urlPatternResult.pathname.groups.answer_id;
        const { user_uuid } = await request.json();
        return await answerService.upvoteAnswer(answer_id, user_uuid);
    } catch (error) {
        console.error("Failed to upvote ", error);
    }
}

export { fetchQuestionAndAnswers, submitAnswer, upvoteAnswer, fetchAnswerUpdates, fetchAnswersPage }