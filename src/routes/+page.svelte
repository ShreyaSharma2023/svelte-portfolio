<script>
  import Project from "$lib/Project.svelte";
</script>

<svelte:head>
  <title>Home Page</title>
</svelte:head>

<h1>Shreya Sharma</h1>
<p>3rd year graduate student in Aeronautics and Astronautics. 
    I work in the Lab for Aviation and the Environment, and I am
    looking at all the ways we can reduce the environmental impacts
    of the aviation sector</p>
<img src = "images/Shreya S. MIT AeroAstro_100224_07.jpg" alt = "Here's a picture of me">
<link rel = "stylesheet" href = "style.css">

<h2>Latest Projects</h2>
<div class="projects">
{#each projects.slice(0, 3) as p}
<Project data={p} hLevel="3" />
{/each}
</div>