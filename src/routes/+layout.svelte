
<script>
import { page } from "$app/stores";
import "../style.css";
let pages = [
  { url: "./", title: "Home" },
  { url: "./projects", title: "Projects" },
  { url: "./contact", title: "Contact" },
  {url: "./resume", title: "Resume"},
  {url: "https://github.com/ShreyaSharma2023", title: "Github"},
];
</script>

<nav>
{#each pages as p}
<a
  href={p.url}
  class:current={$page.route.id === p.url}
  target={p.url.startsWith("http") ? "_blank" : null}
>
  {p.title}
</a>
{/each}
</nav>

<style>
  /* Make the navigation a flex container */
nav {
  --border-color: oklch(50% 10% 200 / 40%);
  display: flex;
  justify-content: space-evenly; /* Evenly distribute links */
  /* background-color: #f8f9fa; Light gray background */
  background-color: color-mix(in oklch, var(--color-accent), canvas 85%);
  padding: 0.5em;
  margin-bottom: 1em; /* Separate from content below */
  border-bottom: 1px solid oklch(80% 3% 200); /* Subtle gray bottom border */
}

/* Style the navigation links */
nav a {
  flex: 1; /* Each link takes equal space */
  text-align: center; /* Center text */
  text-decoration: none; /* Remove underline */
  color: CanvasText; /* Use parent’s text color */
  padding: 0.5em; /* Add spacing */
  border-bottom-color: var(--border-color);
}

/* Style the current page link */
nav a.current {
  color: CanvasText;
  border-bottom: 4px solid var(--color-accent); /* Thicker underline */
  padding-bottom: 0.1em; /* Reduce padding to counter border height */
  border-bottom-color: var(--border-color);
}

/* Hover effect for navigation links */
nav a:hover {
  border-bottom: 0.4em solid var(--color-accent); /* Accent color border on hover */
  padding-bottom: 0.1em; /* Reduce padding to match the border height */
  background-color: oklch(var(--color-accent) 95% 5%); /* Light version of accent color */
  text-decoration: none; /* Remove underline */
}
</style>
<slot />