const fs = require('fs');

function loadDictionary(filePath){
    const words = fs.readFile(filePath, 'utf8')
    .split('\n')
    .map(word => word.trim().toLowerCase())
    .filter(word => word.lenght > 0);
    return new Set(words);
}

const dictionary = loadDictionary('Words.txt');

misspeld_word = "wrlod";

spell_check(misspeld_word);


function spell_check(misspeld_word) {
    suggestions = [];

    for (i = 0; i <= 100; i++){
        wagner_fischer(misspeld_word, i);    
    }
}

function wagner_fischer(s1, s2) {
    let length_s1 = s1.length;
    let length_s2 = s2.length;

    console.log(length_s1);
}