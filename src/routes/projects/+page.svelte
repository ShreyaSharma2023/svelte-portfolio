<script>
  import * as d3 from 'd3';
  import projects from "$lib/projects.json";
  import Project from "$lib/Project.svelte";
  import Pie from '$lib/Pie.svelte';
  $: filteredProjects = projects.filter(project => {
  let values = Object.values(project).join("\n").toLowerCase();
  return values.includes(query.toLowerCase());
});
  let rolledData = d3.rollups(projects, v => v.length, d => d.year);

// Make sure the variable definition is *outside* the block
let pieData;

    $: {
		// Initialize to an empty object every time this runs
        pieData = {};
        
		// Calculate rolledData and pieData based on filteredProjects here
        let rolledData = d3.rollups(filteredProjects, v => v.length, d => d.year);

		// We don't need 'let' anymore since we already defined pieData
        pieData = rolledData.map(([year, count]) => {
            return { value: count, label: year };
        });
    }

let query = "";
let selectedYearIndex = -1;
let selectedYear;
$: selectedYear = selectedYearIndex > -1 ? pieData[selectedYearIndex].label : null;
$: filteredByYear = filteredProjects.filter(project => {
        if (selectedYear) {
            return project.year === selectedYear;
        }

        return true;
    });




</script>

<svelte:head>
  <title>My Projects</title>
</svelte:head>

<h1> {projects.length} Projects</h1>

<Pie data={pieData} bind:selectedIndex={selectedYearIndex} />

<input type="search" bind:value={query}
       aria-label="Search projects" placeholder="🔍 Search projects…" />
<div class="projects">
    {#each filteredByYear as p}
        <Project data={p} />
    {/each}
</div>

<style>
  input[type="search"] {
    width: 100%;

  }

  input[type="search"]:focus {
    border-color: #0077ff;
  }

  /* Centering the search bar */
  .search-container {
    display: flex;
    justify-content: center;
    padding: 1rem;
  }
</style>

  

