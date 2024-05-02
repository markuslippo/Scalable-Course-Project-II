<script>
    export let next_page;
    export let loading;

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

<div use:infiniteScroll class="loading-sentinel">
    {#if loading}
        <p>Loading more...</p>
    {/if}
</div>
