<script>
let root = globalThis?.document?.documentElement;
let localStorage = globalThis.localStorage ?? {};
let colorScheme = localStorage.colorScheme 
$: root?.style.setProperty("color-scheme", colorScheme);
$: localStorage.colorScheme = colorScheme;
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

<label class="color-scheme">
        Theme:
        <select bind:value={ colorScheme }>
            <option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
</label>

<slot />

{#await fetch("https://api.github.com/users/zhengsophia")}
  <p>Loading...</p>
{:then response}
  {#await response.json()}
    <p>Decoding...</p>
  {:then data}
    <section>
      <h2>My GitHub Stats</h2>
      <dl>
        <dt>Followers:</dt>
        <dd>{data.followers}</dd>
        <dt>Following:</dt>
        <dd>{data.following}</dd>
        <dt>Public Repositories:</dt>
        <dd>{data.public_repos}</dd>
      </dl>
    </section>
  {:catch error}
    <p class="error">Something went wrong: {error.message}</p>
  {/await}
{:catch error}
  <p class="error">Something went wrong: {error.message}</p>
{/await}

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

html {
  color-scheme: light dark;
  accent-color: var(--color-accent); /* Apply the accent color to all elements */
} 

.color-scheme {
  position: absolute; /* Take it out of the normal flow */
  top: 1rem; /* Offset from the top */
  right: 1rem; /* Offset from the right */
  display: inline-flex; /* Keep the label and select dropdown on the same line */
  align-items: center; /* Align text and dropdown vertically */
  gap: 4px; /* Space between the label text and the dropdown */
  font-size: 80%; /* Reduce font size slightly */
  font-family: inherit; /* Ensure it matches the rest of the page */
}

dl {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Four equal-sized columns */
  gap: 1rem; /* Space between items */
  text-align: center;
}

dt {
  grid-row: 1; /* Place all <dt> elements in the first row */
  font-weight: bold;
}

dd {
  grid-row: 2; /* Place all <dd> elements in the second row */
  margin: 0; /* Remove default margin for better alignment */
}

</style>