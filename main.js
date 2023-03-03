/**
 * Const of html elements that going to be used for the process
 */
const msgInput = document.querySelector("#msgInput");
const morseInput = document.querySelector("#morseInput");
const toStringBtn = document.querySelector("#convertToString");
const toMorseBtn = document.querySelector("#convertToMorse");
const audioMsgInput = document.querySelector("#audio-msgInput");
const toAudioMorseBtn = document.querySelector("#toAudioMorseBtn");

class MorseDecoder {
  /**
   * This class contain the necesary methods for decode and encode
   * morse code with text, and decode with audio
   * @param {*} msg - The message text that is going to be encoded
   * @param {*} morse - The morse code text that is going to be decoded
   * @param {*} code - The morse code dictionary used to translate
   * @param {*} codeAudio - Dictionary that asociate each alphabet letter with the equivalent in morse audio
   */
  constructor(msg, morse, code, codeAudio) {
    this.msg = msg;
    this.code = code;
    this.morse = morse;
    this.codeAudio = codeAudio;
  }
  /**
   * This method allows to make an assignment to morse
   * @param {*} morse
   */
  setMorse(morse) {
    this.morse = morse;
  }

  /**
   * This method allows to make an assignment msg
   * @param {*} msg
   */
  setMsg(msg) {
    this.msg = msg;
  }

  /**

Transforms a plain text message into its equivalent in Morse code.
@return {string} The message encoded in Morse code.
*/
  encode() {
    let result = "";
    this.msg.split("").forEach((n) => {
      result += this.code.get(n.toUpperCase()) + " ";
    });
    return result;
  }

  /**

Returns the key in the code Map that corresponds to the given value.
@param {string} val - The value to look up in the code Map.
@returns {string} - The key in the code Map that corresponds to the given value.
*/
  get_key_from_val(val) {
    return [...this.code].find(([key, value]) => val === value)[0];
  }

  /**

Decodes a message in Morse code to its equivalent in plain text.
@return {string} The decoded message in plain text.
*/
  decode() {
    let result = "";
    this.morse.split(" ").forEach((n) => {
      result += this.get_key_from_val(n) + " ";
    });
    return result;
  }

  /**
Decodes the message into Morse code audio.
*/
  decodeAudio() {
    let delay = 0;
    this.msg.split("").forEach((n) => {
      setTimeout(() => {
        this.codeAudio.get(n.toUpperCase()).play();
      }, delay);
      delay += 1600;
    });
  }
}

const codeAudioValues = [];
const code = new Map([
  ["A", ".-"],
  ["B", "-..."],
  ["C", "-.-."],
  ["D", "-.."],
  ["E", "."],
  ["F", "..-."],
  ["G", "--."],
  ["H", "...."],
  ["I", ".."],
  ["J", ".---"],
  ["K", "-.-"],
  ["L", ".-.."],
  ["M", "--"],
  ["N", "-."],
  ["O", "---"],
  ["P", ".--."],
  ["Q", "--.-"],
  ["R", ".-."],
  ["S", "..."],
  ["T", "-"],
  ["U", "..-"],
  ["V", "...-"],
  ["W", ".--"],
  ["X", "-..-"],
  ["Y", "-.--"],
  ["Z", "..--"],
  [" ", "......."],
  ["1", ".----"],
  ["2", "..---"],
  ["3", "...--"],
  ["4", "....-"],
  ["5", "....."],
  ["6", "-...."],
  ["7", "--..."],
  ["8", "---.."],
  ["9", "----."],
  ["0", "-----"],
  [".", ".-.-.-"],
  [",", "--..--"],
  ["?", "..--.."],
  ["'", ".----."],
  ["!", "-.-.--"],
  ["/", "-..-."],
  ["(", "-.--."],
  [")", "-.--.-"],
  ["&", ".-..."],
  [":", "---..."],
  [";", "-.-.-."],
  ["=", "-...-"],
  ["+", ".-.-."],
  ["-", "-....-"],
  ["_", "..--.-"],
  ['"', ".-..-."],
  ["$", "...-..-"],
  ["@", ".--.-."],
]);

const audioCode = new Map([]);

/**
Fills an array with the corresponding morse code audio values for each letter of the code.
*/
function fillAudioList() {
  a = [...code.keys()];
  a.forEach((letter) => {
    if (letter != " ") {
      codeAudioValues.push(new Audio(`assets/audio/${letter}_morse_code.ogg`));
    }
  });
}

/**
Fills the audioCode map with the corresponding Audio objects for each letter in the code map.
The letter and its corresponding Audio object are set as key-value pairs in the audioCode map.
*/
function fillAudioMap() {
  letters = [...code.keys()];
  let i = 0;
  letters.forEach((letter) => {
    audioCode.set(letter, codeAudioValues[i]);
    i++;
  });
}

fillAudioList();
fillAudioMap();
const decoder = new MorseDecoder("", "", code, audioCode);

/**
 * Adds event listeners to the three button elements and assigns them their respective conversion functions.
 *
 * @listens click
 */
toStringBtn.addEventListener("click", convertToString);
toMorseBtn.addEventListener("click", convertToMorse);
toAudioMorseBtn.addEventListener("click", convertToAudio);

/**
 * Converts the Morse code input to plain text and displays it in the message input field.
 */
function convertToString() {
  if (morseInput.value != " ") {
    decoder.setMorse(morseInput.value);
    msgInput.value = decoder.decode();
  }
}

/**
Converts a plain text message to its equivalent in Morse code.
*/
function convertToMorse() {
  if (msgInput.value != " ") {
    decoder.setMsg(msgInput.value);
    morseInput.value = decoder.encode();
  }
}

/**
Converts the message in the audioMsgInput input field to Morse code and plays the corresponding audio.
*/
function convertToAudio() {
  if (audioMsgInput.value != " ") {
    decoder.setMsg(audioMsgInput.value);
    decoder.decodeAudio();
  }
}
