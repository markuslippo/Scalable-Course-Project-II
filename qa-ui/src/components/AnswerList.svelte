<script>
    import { onMount } from 'svelte';
    import { userUuid } from "../stores/stores.js";

    import UpvoteCard from "./UpvoteCard.svelte";
    import UserCard from "./UserCard.svelte";
    import Backbutton from "./Backbutton.svelte";
    import DateCard from "./DateCard.svelte";
    import InfiniteScroll from './InfiniteScroll.svelte';

    export let question_id;
    export let course_id;

    let answer_body = '';

    let question = {
        title: '',
        body: '',
        user_uuid: '',
        last_activity: '',
        has_upvoted: false,
        upvotes: 0
    };
    
    let answers = [];

    let page = 1;
    let loading = false;

    onMount(() => {
        page = 1;
        fetchAnswers();
        setInterval(fetchAnswerUpdates, 30000);
    });

    const fetchAnswers = async () => {
        try {
            const response = await fetch(`/api/courses/${course_id}/questions/${question_id}/answers`, {
                headers: {
                    "user": $userUuid, 
                },
            });
            if (response.ok) {
                const data = await response.json();
                question = {
                    title: data.title,
                    body: data.body,
                    user_uuid: data.user_uuid,
                    last_activity: data.last_activity,
                    has_upvoted: data.has_upvoted,
                    upvotes: data.upvotes
                };
                answers = data.answers.slice(0, 20 * page);
            } else {
                answers = [];
            }
        } catch (error) {
            console.error(error);
            answers = [];
        }
    };


    const fetchAnswerUpdates = async () => {
        try {
            let latest_date = (answers.length > 0) ? answers[0].last_activity : '1900-01-01T00:00:00Z';
            const response = await fetch(`/api/courses/${course_id}/questions/${question_id}/answers/updates`, {
                headers: {
                    "latest-date": latest_date, 
                },
            });
            const new_answers = await response.json();
            answers = [...new_answers, ...answers];
            answers = answers.slice(0, 20 * page);
        } catch (error) {
            console.error('An error occured when trying to check for updates')
        }
    }

    const fetchNextPageAnswers = async () => {
        try {
            if(!loading && answers.length === (20 * page)) {
                loading = true;
                const response = await fetch(`/api/courses/${course_id}/questions/${question_id}/answers/page/${page + 1}`, {
                headers: {
                    "user": $userUuid, 
                },
            });
                const new_answers = await response.json();
                if(new_answers.length > 0) {
                    page++;
                    answers = [...new_answers, ...answers];
                    answers = answers.slice(0, 20 * page);
                    loading = false;
                }
            }
        } catch (error) {
            console.error('An error occured when trying to check for updates')
        }
    }

    const submitAnswer = async () => {
        try {
            if (answer_body.trim() !== '') {
                const payload = {
                    question_id,
                    user_uuid: $userUuid,
                    body: answer_body,
                };

                const response = await fetch(`/api/courses/${course_id}/questions/${question_id}/answers`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload)
                });

                if(response.status === 409) {
                    const data = await response.json();
                    alert(data.message);
                }
                else if (response.ok) {
                    const new_answer = await response.json();
                    answers = [new_answer, ...answers]; 
                    answer_body = '';
                } 
            }
        } catch (error) {
            console.error(error);
        }
    };
</script>

<!-- AnswerList contain the question body and a list of answers -->
<div class="flex items-center m-4 mb-4">
    <Backbutton path={`/courses/${course_id}`}/>
    <span class="mx-2 text-lg">{question.title}</span>
</div>

<div class="m-8 mx-8">
    <UserCard user_uuid={question.user_uuid}/>
    <p class="m-4">{question.body}</p>
    <UpvoteCard upvotes={question.upvotes} has_upvoted={question.has_upvoted} is_question={true} id={question_id}/>
    <DateCard date={new Date(question.last_activity).toLocaleString()}/>

    <hr class="border-t border-gray-700" />
    
    
        <div class="flex flex-col items-center">
            <textarea bind:value={answer_body}
            style="background-color: #23262f"
                class="w-full h-40 text-white mx-4 my-4 p-4 resize-y rounded"
                placeholder="Type your answer here..."></textarea>
            <button on:click={submitAnswer}
                style="background-color: #b3c7ff" 
                class="px-4 py-2 mb-4 text-black rounded-full hover:bg-green-700 transition-colors">
                Submit Answer
            </button>
        </div>
    
    <hr class="border-t border-gray-700" />
    
    {#if answers.length > 0}
    <div class="mt-8">
        {#each answers as {user_uuid, body, upvotes, has_upvoted, id, last_activity}}
            <div class="mt-8">
            <UserCard user_uuid={user_uuid}/>
            <p class="m-4">{body}</p>
            <UpvoteCard upvotes={upvotes} has_upvoted={has_upvoted} is_question={false} id={id}/>
            <DateCard date={new Date(last_activity).toLocaleString()}/>
            <hr class="border-t border-gray-700" />
            </div>
        {/each}
        <InfiniteScroll next_page={fetchNextPageAnswers} loading={loading} />
    </div>
    {:else}
        <p class="text-center mt-10">No answers here yet!</p>
    {/if}
</div>
