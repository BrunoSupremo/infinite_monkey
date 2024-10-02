const typed = document.getElementById("typewriter_page");
let letters = Array.from("abcdefghijklmnopqrstuvwxyz");
const urlParams = new URLSearchParams(window.location.search);
switch (urlParams.get("monkey")){
case "2":
	letters = Array.from("0123456789");
	break;
case "3":
	letters = Array.from("─━│┃┄┅┆┇┈┉┊┋┌┍┎┏┐┑┒┓└┕┖┗┘┙┚┛├┝┞┟┠┡┢┣┤┥┦┧┨┩┪┫┬┭┮┯┰┱┲┳┴┵┶┷┸┹┺┻┼┽┾┿╀╁╂╃╄╅╆╇╈╉╊╋╌╍╎╏═║╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬╭╮╯╰╱╲╳╴╵╶╷╸╹╺╻╼╽╾╿");
	break;
case "4":
	letters = Array.from("⬛⬜🟥🟧🟨🟩🟦🟪🟫");
	break;
case "custom":
	letters = Array.from(prompt("What characters will this monkey have on his custom typewriter?"))
	break;
}
let starting_date = false
if(urlParams.get("date")){
	starting_date = new Date(urlParams.get("date").split("-"))
}

const monkey_input = document.getElementById("monkey_input");
if(urlParams.get("monkey")){
	monkey_input.value = urlParams.get("monkey")
}
const date_input = document.getElementById("date_input");
if(urlParams.get("date")){
	date_input.value = urlParams.get("date")
}
const search_button = document.getElementById("search_button");

function date_to_YYYY_MM_DD(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}
date_input.max = date_to_YYYY_MM_DD(new Date());

search_button.addEventListener('click', function(e) {
	const new_url = []
	if (date_input.value) {
		new_url.push("date="+date_input.value)
	}
	if (monkey_input.value) {
		new_url.push("monkey="+monkey_input.value)
	}
	if(new_url.length>0){
		window.location.href = "?"+new_url.join("&")
	}
}, false);
document.getElementById('header').addEventListener('keypress', function(event) {
	if (event.key === 'Enter') {
		// event.preventDefault();
		search_button.click()
	}
});

function random_at(index) {
	const x = Math.sin(index)*100000000;
	return x - Math.floor(x);
}

const characters_per_second = 4
const time_between_strokes = 1000/characters_per_second
const characters_per_hour = characters_per_second * 60 * 60
const characters_per_day = characters_per_second * 60 * 60 * 24

function load_full_day(date){
	let content = [];
	const current_time_fraction = Math.floor(date / time_between_strokes)
	let counter = 0
	for (let i = current_time_fraction; i < current_time_fraction + characters_per_day; i++) {
		counter++
		content.push(letters[Math.floor(random_at(i) * letters.length)]);
		if (counter >= characters_per_hour) {
			const current_container = document.createElement("div")
			current_container.innerText = content.join("");
			const date_attribute = new Date((i - (characters_per_hour - 1)) * time_between_strokes);
			current_container.setAttribute("data-date", date_attribute);
			typed.appendChild(current_container)
			content = []
			counter = 0
		}

	}
}
function load_fraction_current_hour(date){
	const date_round_hour = new Date()
	date_round_hour.setMilliseconds(0)
	date_round_hour.setSeconds(0)
	date_round_hour.setMinutes(0)
	let content = [];
	const current_time_fraction = Math.floor(date_round_hour / time_between_strokes)
	const ending_time_fraction = Math.floor(date / time_between_strokes)
	for (let i = current_time_fraction; i <= ending_time_fraction; i++) {
		content.push(letters[Math.floor(random_at(i) * letters.length)]);
	}
	const current_container = document.createElement("div")
	current_container.innerText = content.join("");
	current_container.setAttribute("data-date", date_round_hour);
	typed.appendChild(current_container)
	return {
		characters_used: ending_time_fraction - current_time_fraction,
		container: current_container
	}
}

if(starting_date){
	load_full_day(starting_date)
}else{
	const hour_data = load_fraction_current_hour(new Date())
	add_new_letter(hour_data)
}

function add_new_letter(hour_data) {
	const current_time_fraction = Math.floor(Date.now()/time_between_strokes)
	const new_typed = document.createElement("span")
	new_typed.innerText = letters[Math.floor(random_at(current_time_fraction)*letters.length)]
	hour_data.container.appendChild(new_typed)

	hour_data.characters_used = hour_data.characters_used +1
	if(hour_data.characters_used >= characters_per_hour){
		hour_data.characters_used = 0
		hour_data.container = document.createElement("div")
		hour_data.container.setAttribute("data-date", new Date());
		typed.appendChild(hour_data.container)
	}
	setTimeout(add_new_letter, time_between_strokes, hour_data);
}