//———————————————————————————————————————//
// SECTION Variables                     //
//———————————————————————————————————————//



//———————————————————————————————————————//
// SECTION Functions                     //
//———————————————————————————————————————//

function copyText() {
	/* Get the text field */
	var password = document.getElementById("password").innerText;

	/* Select the text field */
	//password.select();
	//password.setSelectionRange(0, 99999); /* For mobile devices */

	/* Copy the text inside the text field */
	navigator.clipboard.writeText(password);

	/* Alert the copied text */
	alert("Password copied: " + password);
}

// TODO: Read and fix anything wrong.
const characterAmountRange    = document.getElementById('character-range');
const characterAmountNumber   = document.getElementById('character-number');
const includeUppercaseElement = document.getElementById('includeUppercase');
const includeNumbersElement   = document.getElementById('includeNumbers');
const includeSymbolsElement   = document.getElementById('includeSymbols');
const form 				      = document.getElementById('password-form');
const passwordDisplay         = document.getElementById('password');
const previousPasswordDisplay = document.getElementById('previous-passwords');

const UPPERCASE_CHAR_CODES  = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES  = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES     = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES     = arrayFromLowToHigh(33, 47)
							.concat(arrayFromLowToHigh(58, 64))
							.concat(arrayFromLowToHigh(91, 96))
							.concat(arrayFromLowToHigh(123, 126));


characterAmountNumber.addEventListener('input', syncCharacterAmount);
characterAmountRange.addEventListener('input', syncCharacterAmount);

form.addEventListener('submit', e =>{
	e.preventDefault();
	const characterAmount = characterAmountNumber.value;
	const includeUppercase = includeUppercaseElement.checked;
	const includeNumbers = includeNumbersElement.checked;
	const includeSymbols = includeSymbolsElement.checked;
	const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols);
	passwordDisplay.innerText = password;

	// TODO: Previous Passwords
	// NOTE: You'll probably need a JSON file to save previous passwords.
	const previousPasswords = new Array();
	//const previousPasswords = localStorage.getItem('previous-passwords');

	for (let i = 0; i < previousPasswords.length; i++) {
		if (password != previousPasswords[i]) {
			previousPasswords.push(password);
		}
	}
	console.log(previousPasswords);
});

function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols){
	let charCodes = LOWERCASE_CHAR_CODES;

	if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
	if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
	if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);

	const passwordCharacters = [];
	for (let i = 0; i < characterAmount; i++){
		const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
		passwordCharacters.push(String.fromCharCode(characterCode));
	}
	return passwordCharacters.join('');
}

function arrayFromLowToHigh(low, high){
	const array = [];
	for (let i = low; i <= high; i++){
		array.push(i);
	}
	return array;
}

function syncCharacterAmount(e){
	const value = e.target.value;
	characterAmountNumber.value = value;
	characterAmountRange.value = value;
}

//———————————————————————————————————————//
// SECTION Sockets                       //
//———————————————————————————————————————//

