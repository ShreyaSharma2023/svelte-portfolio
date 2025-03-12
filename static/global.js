console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}

// let navLinks = $$("nav a");

// let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname);

// currentLink?.classList.add("current");

// Step 1: Define the pages with URLs and titles
let pages = [
    {url: ".", title: "Home"},
/* 	{url: "6.C85/A2_report.html", title: "6.C85-A2"},
    {url: "6.C85/A3_report.html", title: "6.C85-A3"},
    {url: "6.C85/A4_report.html", title: "6.C85-A4"}, */
    {url: "projects", title: "Projects"},
    {url: "contact", title: "Contact"},
	{url: "resume", title: "Resume"},
	{url: "https://github.com/ShreyaSharma2023", title: "Github"},
];

// Step 2: Check if we are on the home page
// const ARE_WE_HOME = document.documentElement.classList.contains("home");
/* 
// Step 3: Create the <nav> element and add it to the page
let nav = document.createElement("nav");
document.body.prepend(nav);

// Step 4: Loop through the pages and generate navigation links
for (let p of pages) {
    let url = p.url;
    let title = p.title;

    // Adjust URLs for non-home pages
 //   url = !ARE_WE_HOME && !url.startsWith("http") ? ".." + url : url;

   // Create the <a> element
   let a = document.createElement("a");
   a.href = url;
   a.textContent = title;
   nav.append(a);

   // Add the "current" class if this link is for the current page
   a.classList.toggle("current", a.host === location.host && a.pathname === location.pathname);

    // Open external links (like GitHub) in a new tab
    if (a.host !== location.host) {
        a.target = "_blank"; // Open in new tab
        a.rel = "noopener noreferrer"; // Security best practice
    }

   // Append the link to the <nav>
   nav.append(a);
}
 */
// document.body.insertAdjacentHTML("afterbegin", `
//     <label class="color-scheme">
//         Theme:
//         <select id="theme-switcher">
//             <option value="light dark">Automatic</option>
//             <option value="light">Light</option>
//             <option value="dark">Dark</option>
//         </select>
//     </label>
// `);

const themeSwitcher = document.getElementById("theme-switcher");

themeSwitcher.addEventListener("change", function () {
    document.documentElement.style.colorScheme = this.value;
});

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Set initial dropdown value based on system preference
themeSwitcher.value = prefersDark ? "light dark" : "light";

const savedTheme = localStorage.getItem("theme") || "light dark";
document.documentElement.style.colorScheme = savedTheme;
themeSwitcher.value = savedTheme;

themeSwitcher.addEventListener("change", function () {
    document.documentElement.style.colorScheme = this.value;
    localStorage.setItem("theme", this.value);
});

// Get the <select> element
let select = document.querySelector("select");

/* // Function to set the color scheme and store it in localStorage
function setColorScheme(colorScheme) {
    document.documentElement.style.setProperty("color-scheme", colorScheme);
    localStorage.colorScheme = colorScheme;
    select.value = colorScheme; // Update dropdown to match stored value
}

// Apply saved theme on page load
if (localStorage.colorScheme) {
    setColorScheme(localStorage.colorScheme);
}

// Listen for changes in the dropdown
select.addEventListener("input", function (event) {
    setColorScheme(event.target.value);
});
 */
