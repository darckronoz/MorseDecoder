
class MorseDecoder {
    constructor(msg, code, morse) {
        this.msg = msg;
        this.code = code;
        this.morse = morse;
    }

    encode() {
        let result = '';
        this.msg.forEach(n => {
            result += this.code.get(n.toUpperCase());
        });
        return result;
    }

    get_key_from_val(val) {
        return [...this.code].find(([key, value]) => val === value)[0];
    }
}

const code = new Map([
    ['A', '.-'], ['B', '-...'], ['C', '-.-.'], ['D', '-..'], ['E', '.'], ['F', '..-.'], ['G', '--.'], ['H', '....'],
    ['I', '..'], ['J', '.---'], ['K', '-.-'], ['L', '.-..'], ['M', '--'], ['N', '-.'], ['O', '---'], ['P', '.--.'], ['Q', '--.-'],
    ['R', '.-.'], ['S', '...'], ['T', '-'], ['U', '..-'], ['V', '...-'], ['W', '.--'], ['X', '-..-'],
    ['Y', '-.--'], ['Z', '..--'], ['Á', '.--.-'], ['É', '..-..'], ['Ñ', '--.--'], ['Ó', '---.'],
    [' ', '.......']
]);