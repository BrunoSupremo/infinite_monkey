let typed = document.getElementById("typewriter_page");
let letters = [];
for(let i = 0; i < 26; i++) {
	letters[i] = String.fromCharCode(97 + i);
}

function random_at(index) {
	let x = Math.sin(index)*100000;
	return x - Math.floor(x);
}

// console.time("My code");
const time_between_strokes = 500
let content = [];
let current_time_seconds = Math.floor(Date.now()/time_between_strokes)
// let half_line_of_character = Math.floor(typed.offsetWidth / 2 / 11)
// for (let i = current_time_seconds-half_line_of_character*5; i < current_time_seconds; i++) {
for (let i = current_time_seconds-1000; i < current_time_seconds; i++) {
	content.push(letters[Math.floor(random_at(i)*26)]);
}
typed.innerText = content.join("");

// console.timeEnd("My code");


function add_new_letter() {
	let current_time_seconds = Math.floor(Date.now()/time_between_strokes)
	let new_typed = document.createElement("span")
	new_typed.innerText = letters[Math.floor(random_at(current_time_seconds)*26)]
	typed.appendChild(new_typed)

	setTimeout(add_new_letter, time_between_strokes);
}
add_new_letter()

function count_letters() {
	let letterCounts = {};
	for(let i = 0; i < content.length; i++) {
		let letter = content[i];
		if(letterCounts[letter]) {
			letterCounts[letter]++;
		} else {
			letterCounts[letter] = 1;
		}
	}
	console.log(letterCounts);
}
