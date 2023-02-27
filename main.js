
const msgInput = document.querySelector('#msgInput');
const morseInput = document.querySelector('#morseInput');
const toStringBtn = document.querySelector('#convertToString');
const toMorseBtn = document.querySelector('#convertToMorse');

class MorseDecoder {
    constructor(msg, morse, code) {
        this.msg = msg;
        this.code = code;
        this.morse = morse;
    }

    setMorse(morse) {
        this.morse = morse;
    }

    setMsg(msg) {
        this.msg = msg;
    }

    encode() {
        let result = '';
        this.msg.split('').forEach(n => {
            result += this.code.get(n.toUpperCase()) + ' ';
        });
        return result;
    }

    get_key_from_val(val) {
        return [...this.code].find(([key, value]) => val === value)[0];
    }

    decode() {
        let result = '';
        this.morse.split(' ').forEach(n => {
            result += this.get_key_from_val(n) + ' ';
        });
        return result;
    }
}

const code = new Map([
    ['A', '.-'], ['B', '-...'], ['C', '-.-.'], ['D', '-..'], ['E', '.'], ['F', '..-.'], ['G', '--.'], ['H', '....'],
    ['I', '..'], ['J', '.---'], ['K', '-.-'], ['L', '.-..'], ['M', '--'], ['N', '-.'], ['O', '---'], ['P', '.--.'], ['Q', '--.-'],
    ['R', '.-.'], ['S', '...'], ['T', '-'], ['U', '..-'], ['V', '...-'], ['W', '.--'], ['X', '-..-'],
    ['Y', '-.--'], ['Z', '..--'], ['Á', '.--.-'], ['É', '..-..'], ['Ñ', '--.--'], ['Ó', '---.'],
    [' ', '.......']
]);

const decoder = new MorseDecoder('', '', code);

toStringBtn.addEventListener('click', convertToString);
toMorseBtn.addEventListener('click', convertToMorse);

function convertToString() {
    if(morseInput.value != ' ') {
        decoder.setMorse(morseInput.value)
        msgInput.value = decoder.decode();
    }
}

function convertToMorse() {
    if(msgInput.value != ' ') {
        decoder.setMsg(msgInput.value)
        morseInput.value = decoder.encode();
    }
}