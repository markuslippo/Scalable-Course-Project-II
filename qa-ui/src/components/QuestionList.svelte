<script>
    import { onMount } from 'svelte';
    import { userUuid } from "../stores/stores.js";
    import Backbutton from './Backbutton.svelte';
    import InfiniteScroll from './InfiniteScroll.svelte';
    import UpvoteCard from "./UpvoteCard.svelte";

    export let course_id;
    let questions = [];
    let course = {};

    let title = '';
    let body = '';

    let page = 1;
    let loading = false;

    onMount(() => {
        page = 1;
        fetchCourseQuestions();
        setInterval(fetchQuestionUpdates, 30000);
    });


    const fetchQuestionUpdates = async () => {
        try {
            let latest_date = (questions.length > 0) ? questions[0].last_activity : '1900-01-01T00:00:00Z';
            const response = await fetch(`/api/courses/${course_id}/questions/updates`, {
                headers: {
                    "latest-date": latest_date, 
                },
            });
            const new_questions = await response.json();
            questions = [...new_questions, ...questions];
            questions = questions.slice(0, 20 * page);
        } catch (error) {
            console.error('An error occured when trying to check for updates')
        }
    }

    const fetchCourseQuestions = async () => {
        try {
            const response = await fetch(`/api/courses/${course_id}/questions`, { 
                headers: {
                    "user": $userUuid, 
                }
            });
            if (response.ok) {
                const data = await response.json();
                course = { course_title: data.course_title, course_id: course_id };
                questions = data.questions.slice(0, 20 * page);
            }
        } catch (error) {
            console.error(error);
            questions = [];
        }
    };

    const fetchNextPageQuestions = async () => {
        try {
            if(!loading && questions.length === (20 * page)) {
                loading = true;
                const response = await fetch(`/api/courses/${course_id}/questions/page/${page + 1}`, {
                headers: {
                    "user": $userUuid, 
                },
            });
                const new_questions = await response.json();
                if(new_questions.length > 0) {
                    page++;
                    questions = [...new_questions, ...questions];
                    questions = questions.slice(0, 20 * page);
                    loading = false;
                }
            }
        } catch (error) {
            console.error('An error occured when trying to check for updates')
        }
    }

    const submitCourseQuestion = async () => {
        if (body.trim() !== '' && title.trim() !== '') {
            const payload = {
                course_id,
                user_uuid: $userUuid,
                title,
                body
            };
            try {
                const response = await fetch(`/api/courses/${course_id}/questions`, {
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
                    const new_question = await response.json();
                    questions = [new_question, ...questions];
                    questions = questions.slice(0, 20 * page);
                    body = '';
                    title = '';
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
</script>

<!-- QuestionList contains a table with the question title, answers and upvotes -->
<div class="flex items-center m-4 mb-4">
    <Backbutton path={`/`}/>
    <span class="mx-2 text-lg">{course.course_title}</span>
</div>

<div class="flex flex-col items-center px-8">
    <textarea bind:value={title}
    style="background-color: #23262f"
        class="w-full h-13 text-white mx-4 my-4 p-4 resize-y"
        placeholder="Type your title here..."></textarea>
    <textarea bind:value={body}
    style="background-color: #23262f"
        class="w-full h-40 text-white mx-4 p-4 resize-y"
        placeholder="Type your question here..."></textarea>
    <button on:click={submitCourseQuestion}
        style="background-color: #b3c7ff" 
        class="px-4 py-2 mb-4 mt-4 text-black rounded-full">
        Ask a question
    </button>
</div>

{#if questions.length > 0}
    <div class="overflow-x-auto  px-8">
        <div class="mb-2 flex justify-between">
            <h3 class="text-sm font-bold flex-grow">Question</h3>
            <h3 class="text-sm font-bold w-24 text-center">Upvotes</h3>
        </div>
        {#each questions as {id, user_uuid, title, last_activity, upvotes, has_upvoted }}
        <div class="mb-2">
            <hr class="border-t border-gray-700" />
            <div class="flex items-center py-2">
                <div class="flex-grow">
                    <a href={`/courses/${course_id}/questions/${id}`}>
                    <p class="text-xs text-gray-500">{user_uuid}</p>
                    <p>{title}</p>
                    <p class="text-xs text-gray-500">{new Date(last_activity).toLocaleString()}</p>
                    </a>
                </div>
                <div class="w-24 text-center">
                    <UpvoteCard upvotes={upvotes} has_upvoted={has_upvoted} is_question={true} id={id}/>
                </div>
            </div>
        </div>
        {/each}
        <InfiniteScroll next_page={fetchNextPageQuestions} loading={loading} />
    </div>
{:else}
    <p class="text-center mt-10">No questions here yet!</p>
{/if}
