
const msgInput = document.querySelector('#msgInput');
const morseInput = document.querySelector('#morseInput');
const toStringBtn = document.querySelector('#convertToString');
const toMorseBtn = document.querySelector('#convertToMorse');
const audioMsgInput = document.querySelector('#audio-msgInput');
const toAudioMorseBtn = document.querySelector('#toAudioMorseBtn');

class MorseDecoder {
    constructor(msg, morse, code, codeAudio) {
        this.msg = msg;
        this.code = code;
        this.morse = morse;
        this.codeAudio = codeAudio;
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

    decodeAudio() {
        let delay = 0;
        this.msg.split('').forEach(n => {
            setTimeout(() => {
                this.codeAudio.get(n.toUpperCase()).play();
            }, delay);
            delay += 1600;
        });
    }
}

const codeAudioValues = []
const code = new Map([
    ['A', '.-'], ['B', '-...'], ['C', '-.-.'], ['D', '-..'], ['E', '.'], ['F', '..-.'], ['G', '--.'], ['H', '....'],
    ['I', '..'], ['J', '.---'], ['K', '-.-'], ['L', '.-..'], ['M', '--'], ['N', '-.'], ['O', '---'], ['P', '.--.'], ['Q', '--.-'],
    ['R', '.-.'], ['S', '...'], ['T', '-'], ['U', '..-'], ['V', '...-'], ['W', '.--'], ['X', '-..-'],
    ['Y', '-.--'], ['Z', '..--'], [' ', '.......']
    //, ['Á', '.--.-'], ['É', '..-..'], ['Ñ', '--.--'], ['Ó', '---.'],
    //[' ', '.......']
]);

const audioCode = new Map([]);

function fillAudioList() {
    a = [...code.keys()];
    a.forEach(letter => {
        if(letter != ' ') {
            codeAudioValues.push(new Audio(`assets/audio/${letter}_morse_code.ogg`));
        }
    });
}

function fillAudioMap() {
    letters = [...code.keys()];
    let i = 0
    letters.forEach(letter => {
        audioCode.set(letter, codeAudioValues[i]);
        i++;
    });
}

fillAudioList();
fillAudioMap();
const decoder = new MorseDecoder('', '', code, audioCode);

toStringBtn.addEventListener('click', convertToString);
toMorseBtn.addEventListener('click', convertToMorse);
toAudioMorseBtn.addEventListener('click', convertToAudio);


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

function convertToAudio() {
    if(audioMsgInput.value != ' ') {
        decoder.setMsg(audioMsgInput.value)
        decoder.decodeAudio();
    }
}

