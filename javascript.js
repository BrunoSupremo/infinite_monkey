const typed = document.getElementById("typewriter_page");
let letters = "abcdefghijklmnopqrstuvwxyz";
let urlParams = new URLSearchParams(window.location.search);
switch (urlParams.get("monkey")){
case "2":
	letters = "0123456789";
	break;
case "3":
	letters = "─━│┃┄┅┆┇┈┉┊┋┌┍┎┏┐┑┒┓└┕┖┗┘┙┚┛├┝┞┟┠┡┢┣┤┥┦┧┨┩┪┫┬┭┮┯┰┱┲┳┴┵┶┷┸┹┺┻┼┽┾┿╀╁╂╃╄╅╆╇╈╉╊╋╌╍╎╏═║╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬╭╮╯╰╱╲╳╴╵╶╷╸╹╺╻╼╽╾╿";
	break;
case "custom":
	letters = urlParams.get("characters")
	break;
}

const search_button = document.getElementById("search_button");
const search_input = document.getElementById("search_input");
search_button.addEventListener('click', function(e) {
	search();
}, false);
search_input.addEventListener('keypress', function(event) {
	if (event.keyCode === 13) {
		search();
	}
});
function search() {
	window.find(search_input.value,false,false,true)
}

function random_at(index) {
	let x = Math.sin(index)*10000000000;
	return x - Math.floor(x);
}

const characters_per_seconds = 4
const time_between_strokes = 1000/characters_per_seconds
const characters_per_hour = characters_per_seconds * 60 * 60
const characters_per_day = characters_per_seconds * 60 * 60 * 24
let content = [];
let current_time_seconds = Math.floor(Date.now()/time_between_strokes)
let container = document.createElement("div")
let counter = 0
for (let i = current_time_seconds-characters_per_day; i < current_time_seconds; i++) {
	counter++
	content.push(letters[Math.floor(random_at(i)*letters.length)]);
	if (counter>=characters_per_hour) {
		container.innerText = content.join("");
		container.setAttribute("data-date", new Date(i*time_between_strokes));
		typed.appendChild(container)
		content = []
		counter = 0
		container = document.createElement("div")
	}

}
if(counter>0){
	container.innerText = content.join("");
	typed.appendChild(container)
}


function add_new_letter() {
	let current_time_seconds = Math.floor(Date.now()/time_between_strokes)
	let new_typed = document.createElement("span")
	new_typed.innerText = letters[Math.floor(random_at(current_time_seconds)*letters.length)]
	typed.appendChild(new_typed)

	setTimeout(add_new_letter, time_between_strokes);
}
add_new_letter()