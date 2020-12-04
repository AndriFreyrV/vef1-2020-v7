/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;
/**
 * Byrja forrit.
 */
function start() {
  alert('Halló!')
}

// Hér er gott að commenta út til að vinna í encode/decode föllum fyrst og síðan „viðmóti“ forrits
start();

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  str = str.toLocaleUpperCase();
  var str_out = '';
  for(var i = 0;i < str.length; i++){
    str_out += LETTERS[(LETTERS.indexOf(str[i])+n)%LETTERS.length];
  }
  str = str_out;
  return str;
}
/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  str = str.toLocaleUpperCase();
  var str_out = '';
  var index;
  var pos;
  for(var i = 0;i < str.length; i++){ 
    pos = LETTERS.indexOf(str[i])-n;
    if(pos < 0){
      index = LETTERS.length+pos;
    }
    else{
      index = pos;
    }
    str_out += LETTERS[index];
  }
  str = str_out;
  return str;
}

var action; // global
var shift; // global
var inp_string; // global
var out;

function main(){
  get_action();
  get_shift();
  get_string();
  code_string();
  alert(`Úkoman úr kóðuninni er ${out}`);
}

function get_action(){
  var actions = ['kóða', 'afkóða'];
  action = prompt('Hvort villtu kóða eða afkóða streng? Skrifaðu "kóða" eða "afkóða"');
  if(actions.indexOf(action)==-1){
    alert(`Veit ekki hvaða aðgerð "${action}" er. Reyndu aftur.`);
    get_action();
  }
  return;
}

function get_shift(){
  shift = prompt('Hversu mikið villtu hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]');
  if(shift > 0 && shift <32 && (shift%1===0)){
    shift = parseInt(shift);
    return;
  }
  else{
    alert(`${shift} er ekki heiltala á bilinu [1, 31]. Reyndu aftur`);
    get_shift();
  }
}

function get_string(){
  invalid = [];
  inp_string = prompt(`Gefðu upp strenginn sem á að ${action} með hliðrum ${shift}`);
  inp_string = inp_string.toLocaleUpperCase();
  for(var i = 0;i<inp_string.length;i++){
    if(LETTERS.indexOf(inp_string[i])== -1){
      invalid.push(inp_string[i]);
    }
  }
  if(invalid.length>0){
    alert(`Þú gafst upp stafi sem ekki er hægt að ${action}: ${invalid.join(', ')}. Reyndu aftur`);
    get_string();
    console.log(2+3);
  }
}
function code_string(){
  if(action === 'kóða'){
    out = encode(inp_string, shift);
    return;
  }
  out = decode(inp_string, shift);
}


console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');

main();
