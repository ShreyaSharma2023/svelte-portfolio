<script>
import { base } from '$app/paths';
import Bar from '$lib/Bar.svelte';
import * as d3 from "d3";
import { onMount } from "svelte";
import {
	computePosition,
	autoPlacement,
	offset,
} from '@floating-ui/dom';
let width = 1000, height = 600;
let margin = {top: 10, right: 10, bottom: 30, left: 20};
let usableArea = {
	top: margin.top,
	right: width - margin.right,
	bottom: height - margin.bottom,
	left: margin.left
};
let commitTooltip;
let tooltipPosition = {x: 0, y: 0};
usableArea.width = usableArea.right - usableArea.left;
usableArea.height = usableArea.bottom - usableArea.top;
let xAxis, yAxis, yAxisGridlines;
$: {
	d3.select(xAxis).call(d3.axisBottom(xScale));
  d3.select(yAxis).call(d3.axisLeft(yScale).tickFormat(d => String(d % 24).padStart(2, "0") + ":00"));
  d3.select(yAxisGridlines).call(
		d3.axisLeft(yScale)
		  .tickFormat("")
		  .tickSize(-usableArea.width)
	);
}
let data = [];
let commits = [];
let totalFiles = 0; // Variable to store total file count
onMount(async () => {
	data = await d3.csv(`${base}/loc.csv`, row => ({
	...row,
	line: Number(row.line), // or just +row.line
	depth: Number(row.depth),
	length: Number(row.length),
	date: new Date(row.date + "T00:00" + row.timezone),
	datetime: new Date(row.datetime),
}));
// Count unique files
const fileSet = new Set(data.map(d => d.file)); // Assuming there's a 'file' column
totalFiles = fileSet.size;
commits = d3.groups(data, d => d.commit).map(([commit, lines]) => {
	let first = lines[0];
	let {author, date, time, timezone, datetime} = first;
	let ret = {
		id: commit,
		url: "https://github.com/vis-society/lab-7/commit/" + commit,
		author, date, time, timezone, datetime,
		hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
		totalLines: lines.length
	};
	// Like ret.lines = lines
	// but non-enumerable so it doesn’t show up in JSON.stringify
	Object.defineProperty(ret, "lines", {
		value: lines,
		configurable: true,
		writable: true,
		enumerable: false,
	});
	return ret;
});
console.log(commits)
});
$: minDate = d3.min(commits.map(d => d.date));
$: maxDate = d3.max(commits.map(d => d.date));
$: maxDatePlusOne = new Date(maxDate);
$: maxDatePlusOne.setDate(maxDatePlusOne.getDate() + 1);
$: xScale = d3.scaleTime()
              .domain([minDate, maxDatePlusOne])
              .range([usableArea.left, usableArea.right])
              .nice();
$: yScale = d3.scaleLinear()
              .domain([24, 0])
              .range([usableArea.bottom, usableArea.top]);
let hoveredIndex = -1;
$: hoveredCommit = commits[hoveredIndex] ?? hoveredCommit ?? {};
async function dotInteraction (index, evt) {
	let hoveredDot = evt.target;
	if (evt.type === "mouseenter") {
		hoveredIndex = index;
		tooltipPosition = await computePosition(hoveredDot, commitTooltip, {
			strategy: "fixed", // because we use position: fixed
			middleware: [
				offset(5), // spacing from tooltip to dot
				autoPlacement() // see https://floating-ui.com/docs/autoplacement
			],
		});        }
	else if (evt.type === "mouseleave") {
		hoveredIndex = -1
	}
  else if (evt.type === "click") {
    console.log(clickedCommits);
	let commit = commits[index]
	if (!clickedCommits.includes(commit)) {
		// Add the commit to the clickedCommits array
		clickedCommits = [...clickedCommits, commit];
	}
	else {
			// Remove the commit from the array
			clickedCommits = clickedCommits.filter(c => c !== commit);
	}
}
}
let clickedCommits = [];
$: allTypes = Array.from(new Set(data.map(d => d.type)));
$: selectedLines = (clickedCommits.length > 0 ? clickedCommits : commits).flatMap(d => d.lines);
$: selectedCounts = d3.rollup(
    selectedLines,
    v => v.length,
    d => d.type
);
$: languageBreakdown = allTypes.map(type => [type, selectedCounts.get(type) || 0]);

let commitProgress = 100;
// Time scale mapping datetime to percentage (0–100)
$: timeScale = d3.scaleTime()
	.domain([minDate, maxDatePlusOne])
	.range([0, 100]);
$: commitMaxTime = timeScale.invert(commitProgress);

</script>

<svelte:head>
  <title>Meta</title>
</svelte:head>

<h1>Meta</h1>
<h2>Summary</h2>
<dl class="stats">
	<dt>Total <abbr title="Lines of code">LOC</abbr></dt>
	<dd>{data.length}</dd>
  <dt>Total <abbr title="Commits">Commits</abbr></dt>
  <dd>{commits.length}</dd>
  <dt>Total <abbr title="Files">Files</abbr></dt>
	<dd>{totalFiles}</dd>
</dl>
<div class="slider-container">
	<div class="slider-controls">
		<label for="commit-slider">Show commits until:</label>
		<input
			id="commit-slider"
			class="slider"
			type="range"
			min="0"
			max="100"
			bind:value={commitProgress}
		/>
	</div>
	<time>
		{commitMaxTime.toLocaleString(undefined, {
			dateStyle: "long",
			timeStyle: "short"
		})}
	</time>
</div>

<svg viewBox="0 0 {width} {height}">
<g class="dots">
  {#each commits as commit, index }
	  <circle
    	class:selected={ clickedCommits.includes(commit) }
    	on:click={ evt => dotInteraction(index, evt) }
    	on:mouseenter={evt => dotInteraction(index, evt)}
	    on:mouseleave={evt => dotInteraction(index, evt)}
		  cx={ xScale(commit.datetime) }
		  cy={ yScale(commit.hourFrac) }
		  r="5"
		  fill="steelblue"
	  />
  {/each}
</g>
<g class="gridlines" transform="translate({usableArea.left}, 0)" bind:this={yAxisGridlines} />
<g transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
<g transform="translate({usableArea.left}, 0)" bind:this={yAxis} />
</svg>

<Bar data={languageBreakdown} width={width} />

<dl class="info_tooltip" bind:this={commitTooltip} hidden={hoveredIndex === -1} style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px">
	<dt>Commit</dt>
	<dd><a href="{ hoveredCommit.url }" target="_blank">{ hoveredCommit.id }</a></dd>
	<dt>Date</dt>
	<dd>{ hoveredCommit.datetime?.toLocaleString("en", { dateStyle: "full" }) }</dd>
	<dt>Time</dt>
	<dd>{ hoveredCommit.datetime?.toLocaleTimeString("en", { timeStyle: "short" }) }</dd>
	<dt>Author</dt>
	<dd>{ hoveredCommit.author }</dd>
	<dt>Lines Edited</dt>
	<dd>{ hoveredCommit.totalLines }</dd>
</dl>

<style>
	svg {
		overflow: visible;
	}
</style>





