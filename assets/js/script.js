// Elementi del form
const myForm = document.getElementById('myForm');
const regName = document.getElementById('regName');
const regSurname = document.getElementById('regSurname');
const regEmail = document.getElementById('regEmail');
const regPassword = document.getElementById('regPassword');
const regPhone = document.getElementById('regPhone');
const regAge = document.getElementById('regAge');
const btnSubmit = document.getElementById('btnSubmit');
const formError = document.getElementById('error');
const formThanks = document.getElementById('thanks');

// Variabili per compilare l'oggetto
let formName;
let formSurname;
let formEmail;
let formPassword;
let formAge;
let formPhone;

// Oggetto che conterrà i dati del form
const regUser = {
	name: '',
	surname: '',
	email: '',
	password: '',
	phone: '',
	age: 0,
};

// Regex di verifica
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexPassword =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&?])[A-Za-z\d!@#$%&?]{8,20}$/;

// Variabili booleane per la validazione
let validEmail = false;
let valiPassword = false;
let validSurname = false;
let validAge = false;

window.addEventListener('load', init());

// Operazioni da eseguire al caricamento della pagina
function init() {
	formThanks.style.display = 'none';
	btnSubmit.setAttribute('disabled', 'true'); // Disabilito il button submit finché il form non è compilato correttamente
    let myName = prompt('Scrivi il tuo nome');
    document.getElementById('welcome').innerText = `Benvenuto ${myName}`;
}

// EVENTI
// Compilazione dei campi e conseguente verifica
regSurname.addEventListener('blur', function () {
	validSurname = false;
	verify();
	if (regSurname.value === '') {
		formError.innerText = 'Il campo cognome è obbligatorio';
		return;
	} else {
		formError.innerText = '';
		validSurname = true;
		verify();
	}
});

regEmail.addEventListener('blur', function () {
	validEmail = false;
	verify();
	if (regEmail.value === '') {
		formError.innerText = 'Il campo email è obbligatorio';
		return;
	} else if (!regexEmail.test(regEmail.value)) {
		formError.innerText = 'Inserire una email valida';
		return;
	} else {
		formError.innerText = '';
		validEmail = true;
		verify();
	}
});

regPassword.addEventListener('blur', function () {
	valiPassword = false;
	verify();
	if (regPassword.value === '') {
		formError.innerText = 'Il campo password è obbligatorio';
		return;
	} else if (!regexPassword.test(regPassword.value)) {
		formError.innerText =
			'Inserire una password tra 8 e 20 caratteri che contenga almeno una lettera minuscola, una lettera maiuscola, almeno un numero e almeno un carattere speciale tra ! @ # $ % ?';
		return;
	} else {
		formError.innerText = '';
		valiPassword = true;
		verify();
	}
});

regAge.addEventListener('blur', function () {
	validAge = false;
	verify();
	if (regAge.value < 18) {
		formError.innerText = 'Devi essere maggiorenne per registrarti';
		return;
	} else if (regAge.value === '') {
		formError.innerText = 'Il campo età è obbligatorio';
		return;
	} else {
		formError.innerText = '';
		validAge = true;
		verify();
	}
});

function verify() {
	if (valiPassword && validAge && validEmail && validSurname) {
		btnSubmit.removeAttribute('disabled');
	} else {
		btnSubmit.setAttribute('disabled', 'true');
	}
}

// Invio del form
btnSubmit.addEventListener('click', function (e) {
	e.preventDefault();
	compileObject();
    setTimeout(() => {
        printData();
    }, 3000);
	myForm.reset();
});

function compileObject() {
	formName = regName.value;
	formSurname = regSurname.value;
	formEmail = regEmail.value;
	formPassword = regPassword.value;
	formAge = regAge.value;
	formPhone = regPhone.value;

	regUser.name = formName;
	regUser.surname = formSurname;
	regUser.email = formEmail;
	regUser.password = formPassword;
	regUser.age = formAge;
	regUser.phone = formPhone;

	console.log(regUser);
}

function printData() {
	formThanks.style.display = 'block';

	if (regUser.name !== '') {
		document.getElementById('formName').innerText += formName;
	} else {
		document.getElementById('formName').innerText = '';
	}
	document.getElementById('formSurname').innerText += formSurname;
	document.getElementById('formEmail').innerText += formEmail;
	document.getElementById('formPassword').innerText += formPassword;
	document.getElementById('formAge').innerText += formAge;
	if (regUser.phone !== '') {
		document.getElementById('formPhone').innerText += formPhone;
	} else {
		document.getElementById('formPhone').innerText = '';
	}
}

// ------------------------------------------
// Lista dinamica
const myList = document.getElementById('myList');
const insertItem = document.getElementById('insertItem');
const btnInsert = document.getElementById('btnInsert');
const ulList = document.getElementById('list');
const listItems = [];

btnInsert.addEventListener('click', function (e) {
    let myConfirm = confirm('Sei sicuro?')
    if (!myConfirm) return;
	e.preventDefault();
	if (!checkInput()) return;
	popolateArray();
	printList();
	myList.reset();
});

function checkInput() {
	if (insertItem.value === '') {
		return false;
	} else {
		return true;
	}
}

function popolateArray() {
	listItems.push(insertItem.value);
	console.log(listItems);
}

function printList() {
	ulList.innerHTML = '';
	for (let i = 0; i < listItems.length; i++) {
		let newLi = document.createElement('li');
		newLi.innerText = listItems[i];
		let btnDelete = document.createElement('button');
		btnDelete.setAttribute('type', 'button');
		btnDelete.setAttribute('onclick', `deleteItem(${i});`);
		btnDelete.innerText = '❌';
		newLi.appendChild(btnDelete);
		ulList.appendChild(newLi);
	}
}

function deleteItem(index) {
	listItems.splice(index, 1); // Rimuove dall'array l'elemento con l'indice passato come parametro
	printList(); // Ristampa la lista con l'array modificato
}
