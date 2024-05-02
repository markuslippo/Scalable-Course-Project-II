<script>
    // Loading text and the next_page fetch function
    export let next_page;
    export let loading;

    // This is the infinite scroll functionality.
    // Placed at the bottom of QuestionList and AnswerList components.
    function infiniteScroll(node) {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loading) {
                next_page();
            }
        }, {
            rootMargin: '100px',
        });

        observer.observe(node);
        return {
            destroy() {
                observer.disconnect();
            }
        };
    }
</script>

<!-- This is invisible except when loading -->
<div use:infiniteScroll class="loading-sentinel">
    {#if loading}
        <p>Loading more...</p>
    {/if}
</div>
