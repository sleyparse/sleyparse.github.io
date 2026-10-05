// ---- DATA: edit these lists, nothing else needs to change ----
var SKILLS = [
  ["HTML","This page: semantic tags, skip link, labelled form","#"],
  ["CSS","Responsive layout and dark mode with CSS variables","#"],
  ["JavaScript","Project filter and theme toggle on this page","#"],
  ["JSON","projects.json feeds this page; Flask API returns JSON","#"],
  ["XML","skills.xml parsed in the browser, plus sitemap.xml","#"],
  ["PHP","Court booking CRUD app, live demo","#"],
  ["Python","Flask app that summarizes load test results","#"],
  ["C#","ASP.NET API with Swagger page","#"],
  ["MariaDB","EXPLAIN before and after adding an index","#"],
  ["DB administration","Backups, restore test, least-privilege users","#"],
  ["Docker","Compose file: nginx, php-fpm, mariadb","#"],
  ["Networking","Firewall, DNS and reverse proxy diagram","#"],
  ["Linux","Server hardening guide and deploy script","#"]
];
var PROJECTS = [
  {t:"Court booking app",d:"[Book, edit and cancel court slots. Login, sessions and prepared statements.]",tags:["PHP","Database","Docker"],repo:"#",demo:"#"},
  {t:"Load test results API",d:"[Upload a CSV and get average, p95 and p99 back as JSON.]",tags:["Python"],repo:"#",demo:"#"},
  {t:"Results service",d:"[Same data served by an ASP.NET minimal API with Swagger.]",tags:["C#"],repo:"#",demo:"#"},
  {t:"Booking database",d:"[Schema, indexes, nightly backups and a tested restore.]",tags:["Database"],repo:"#",demo:""},
  {t:"Server setup",d:"[Hardened Linux host with firewall, SSH keys, cron backups and a reverse proxy.]",tags:["Linux"],repo:"#",demo:""}
];

// ---- skills ----
var list = document.getElementById("skill-list");
SKILLS.forEach(function(s){
  var li = document.createElement("li");
  li.innerHTML = "<h3>" + s[0] + "</h3><small>" + s[1] + "</small>";
  list.appendChild(li);
});

// ---- project filter ----
var tagSet = ["All"];
PROJECTS.forEach(function(p){ p.tags.forEach(function(t){ if(tagSet.indexOf(t) < 0) tagSet.push(t); }); });
var fBox = document.getElementById("filters"), cards = document.getElementById("cards");

function show(tag){
  cards.innerHTML = "";
  PROJECTS.filter(function(p){ return tag === "All" || p.tags.indexOf(tag) > -1; }).forEach(function(p){
    var li = document.createElement("li");
    li.className = "card";
    li.innerHTML = "<h3>" + p.t + "</h3><p>" + p.d + "</p><span class='tags'>" + p.tags.join(", ") + "</span>" +
      "<div class='actions'><a href='" + p.repo + "'>Code on GitHub</a>" + (p.demo ? "<a href='" + p.demo + "'>Live demo</a>" : "") + "</div>";
    cards.appendChild(li);
  });
  Array.prototype.forEach.call(fBox.children, function(b){ b.setAttribute("aria-pressed", String(b.textContent === tag)); });
}
tagSet.forEach(function(t){
  var b = document.createElement("button");
  b.type = "button"; b.textContent = t;
  b.addEventListener("click", function(){ show(t); });
  fBox.appendChild(b);
});
show("All");

// ---- theme toggle (remembers choice when storage is available) ----
var root = document.documentElement, btn = document.getElementById("theme");
function dark(){ return root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; }
function sync(){ btn.setAttribute("aria-pressed", String(dark())); btn.textContent = dark() ? "Light mode" : "Dark mode"; }
try { var saved = localStorage.getItem("theme"); if(saved) root.dataset.theme = saved; } catch(e) {}
sync();
btn.addEventListener("click", function(){
  root.dataset.theme = dark() ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch(e) {}
  sync();
});

document.getElementById("year").textContent = new Date().getFullYear();