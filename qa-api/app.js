import { serve } from "./deps.js";
import { fetchCourses } from "./controllers/courseController.js";
import { fetchQuestions, submitQuestion, upvoteQuestion, fetchQuestionUpdates, fetchQuestionsPage  } from "./controllers/questionController.js";
import { fetchQuestionAndAnswers, submitAnswer, upvoteAnswer, fetchAnswerUpdates, fetchAnswersPage } from "./controllers/answerController.js";

const urlMapping = [
  {


    //COURSES 


    // GET to fetch a list of courses
    method: "GET",
    pattern: new URLPattern({ pathname: "/courses" }),
    fn: fetchCourses,
  },


    // QUESTIONS 


  {
    // GET to fetch a list of questions
    method: "GET",
    pattern: new URLPattern({ pathname: "/courses/:course_id/questions" }),
    fn: fetchQuestions,
  },
  {
    // POST to submit a new question
    method: "POST",
    pattern: new URLPattern({ pathname: "/courses/:course_id/questions" }),
    fn: submitQuestion  
  },
  {
    // GET to fetch new questions (short polling)
    method: "GET",
    pattern: new URLPattern({ pathname: "/courses/:course_id/questions/updates" }),
    fn: fetchQuestionUpdates,
  },
  {
    // GET to fetch the next page of questions (infinite scrolling)
    method: "GET",
    pattern: new URLPattern({ pathname: "/courses/:course_id/questions/page/:page_number" }),
    fn: fetchQuestionsPage,
  },
  {
    // POST to upvote a question
    method: "POST",
    pattern: new URLPattern({ pathname: "/upvote/questions/:question_id" }),
    fn: upvoteQuestion  
  },


    //ANSWERS 


  {
    // GET to fetch question specifics and answers
    method: "GET",
    pattern: new URLPattern({ pathname: "/courses/:course_id/questions/:question_id/answers" }),
    fn: fetchQuestionAndAnswers  
  },
  {
    // POST to submit a new answer
    method: "POST",
    pattern: new URLPattern({ pathname: "/courses/:course_id/questions/:question_id/answers" }),
    fn: submitAnswer  
  },
  {
    // POST to upvote an answer
    method: "POST",
    pattern: new URLPattern({ pathname: "/upvote/answers/:answer_id" }),
    fn: upvoteAnswer  
  },
  {
    // GET to fetch new answers (short polling)
    method: "GET",
    pattern: new URLPattern({ pathname: "/courses/:course_id/questions/:question_id/answers/updates" }),
    fn: fetchAnswerUpdates,
  },
  {
    // GET to fetch the next page of answers (infinite scrolling)
    method: "GET",
    pattern: new URLPattern({ pathname: "/courses/:course_id/questions/:question_id/answers/page/:page_number" }),
    fn: fetchAnswersPage,
  },
];

const handleRequest = async (request) => {
  const mapping = urlMapping.find((um) => um.method === request.method && um.pattern.test(request.url));

  if (!mapping) {
    return new Response("Not found", {
      status: 404,
      headers: new Headers({ 'Access-Control-Allow-Origin': '*' })
    });
  }

  try {
    const urlPatternResult = mapping.pattern.exec(request.url);
    const result = await mapping.fn(request, urlPatternResult);

    if (result instanceof Response) {
      return result;
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    });
  } catch (e) {
    console.error(e);
    return new Response(e.stack, { 
      status: 500, 
      headers: new Headers({ 'Access-Control-Allow-Origin': '*' }) 
    });
  }
};

const portConfig = { port: 7777, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
