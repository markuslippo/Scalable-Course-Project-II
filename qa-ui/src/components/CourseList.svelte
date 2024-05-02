<script>
    // Imports
    import { onMount } from 'svelte';
    
    // The course list
    let courses = [];

    // When mounted, fill the course list with data from backend
    onMount(async () => {
        courses = await fetchCourses();
    });

    // Fetch data from the backend.
    // Send a GET request to endpoint.
    const fetchCourses = async () => {
        try {
            const response = await fetch("/api/courses");
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
        return [];
    };
</script>

<!-- Course list contains boxes for each course, 2 boxes per row -->
{#if courses.length > 0}
    <h1 class="text-4xl text-left mt-10 mb-5 mx-8 font-bold text-white">Courses:</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-2">
        {#each courses as {id, title, description }}
            <a href={`/courses/${id}`} class="block p-4 m-2 border border-gray-700 min-h-[175px]">
                <h2 class="text-lg font-bold text-white">{title}</h2>
                <p class="text-slate-300">{description}</p>
            </a>
        {/each}
    </div>
{:else}
    <p>Loading courses...</p>
{/if}
