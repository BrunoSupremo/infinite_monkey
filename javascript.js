let typed = document.getElementById("typewriter_page");
let letters = "abcdefghijklmnopqrstuvwxyz";

function random_at(index) {
	let x = Math.sin(index)*100000;
	return x - Math.floor(x);
}

const time_between_strokes = 500
let content = [];
let current_time_seconds = Math.floor(Date.now()/time_between_strokes)
let container = document.createElement("div")
let counter = 0
for (let i = current_time_seconds-172800; i < current_time_seconds; i++) {
	counter++
	content.push(letters[Math.floor(random_at(i)*26)]);
	if (counter>=7200) { // 7200 = 1 hour worth of 2 characters/sec
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
	new_typed.innerText = letters[Math.floor(random_at(current_time_seconds)*26)]
	typed.appendChild(new_typed)

	setTimeout(add_new_letter, time_between_strokes);
}
add_new_letter()