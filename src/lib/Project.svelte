<script>
    export let data = {};
    export let hLevel = 2;
</script>

<article>
    <svelte:element this={"h" + hLevel}>{data.title}</svelte:element>
    <img src={data.image} alt="" />
    <p>{data.description}</p>
</article>

<style>
    .projects {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
    gap: 1em;
    padding: 1em;
    }

    .projects article {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 3; /* Each article spans 3 rows */
    align-items: start; /* Ensures proper alignment */
    }

    .projects h2 {
    margin: 0; /* Removes extra spacing around headings */
    }

    .projects img {
    width: 100%;
    height: auto;
    }
</style>