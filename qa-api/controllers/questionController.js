import * as questionService from "../services/questionService.js"
import * as answerService from "../services/answerService.js"

const LLM_API_PATH = "http://llm-api:7000/";
const user_timestamp = new Map();

const fetchQuestions = async (request, urlPatternResult) => {
    try { 
    	const course_id = urlPatternResult.pathname.groups.course_id;
        const user_uuid = request.headers.get("user");
    	return await questionService.fetchQuestions(course_id, user_uuid);
    } catch(error) {
    	console.log(error);
    }
  };


const submitQuestion = async (request) => {
    try {
        const { course_id, user_uuid, title, body } = await request.json();

        const now = new Date().getTime();
        const previous_answer_time = user_timestamp.get(user_uuid);

        if(previous_answer_time && now - previous_answer_time < 60000) {
            return new Response(JSON.stringify({ message: 'Only one question per minute' }), {
                status: 409,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        user_timestamp.set(user_uuid, now);
        const new_question =  await questionService.submitQuestion(course_id, user_uuid, title, body);
        const fetchLLMAPI = () => {
            fetch(LLM_API_PATH, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ question: body})
            }).then(response => response.json())
              .then(data => {
                if(data.length > 0) {
                    data.forEach(answer => {
                        answerService.submitAnswer(new_question.id, 'Large Language Model', answer.generated_text);
                    })
                }})
              .catch(error => console.error("Failed to call llm-api:", error));
        };

        fetchLLMAPI();
        fetchLLMAPI();
        fetchLLMAPI();
  
        return new_question;
    } catch (error) {
        console.error("Failed to process request:", error);
    }
};


const fetchQuestionUpdates = async(request, urlPatternResult) => {
    try {
        const course_id = urlPatternResult.pathname.groups.course_id;
        const latest_date = request.headers.get("latest-date");
        return await questionService.fetchQuestionUpdates(course_id, latest_date);
    } catch (error) {
        console.error("Failed to fetch updates ", error);
    }
}


const fetchQuestionsPage = async(request, urlPatternResult) => {
    try {
        const course_id = urlPatternResult.pathname.groups.course_id;
        const page_number = urlPatternResult.pathname.groups.page_number;
        const user_uuid = request.headers.get("user");
        return await questionService.fetchQuestionsPage(course_id, page_number, user_uuid);
    } catch (error) {
        console.error("Failed to fetch updates ", error);
    }
}


const upvoteQuestion = async (request, urlPatternResult) => {
    try {
        const question_id = urlPatternResult.pathname.groups.question_id;
        const { user_uuid } = await request.json();
        return await questionService.upvoteQuestion(question_id, user_uuid);
    } catch (error) {
        console.error("Failed to upvote ", error);
    }
}

export { fetchQuestions, submitQuestion, upvoteQuestion, fetchQuestionUpdates, fetchQuestionsPage }