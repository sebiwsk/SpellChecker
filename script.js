function loadTextFile(file, callback) {
    const rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("text/plain");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function wordsArray(text) {
    // Split text into lines
    const lines = text.split('\n');
    let words = [];
    // Initialize array to store words
    
    // Iterate through each line
    lines.forEach(line => {
       // Trim any leading/trailing whitespace
       line = line.trim();
 
       // If line is not empty, split by whitespace and add to words array
       if (line !== '') {
          const lineWords = line.split(/\s+/);
          words = words.concat(lineWords);
       }
    });
 
    return words;
}

function wagner_fischer(s1, s2) {
    let len_s1 = s1.length;
    let len_s2 = s2.length;

    if (len_s1 > len_s2) {
        [s1, s2] = [s2, s1];
        [len_s1, len_s2] = [len_s2, len_s1];
    }

    let current_row = Array.from({ length: len_s1 + 1 }, (_, index) => index);

    for (let i = 1; i <= len_s2; i++) {
        let previous_row = [...current_row];
        current_row = [i];

        for (let j = 1; j <= len_s1; j++) {
            let add = previous_row[j] + 1;
            let deleteOperation = current_row[j - 1] + 1;
            let change = previous_row[j - 1];

            if (s1[j - 1] !== s2[i - 1]) {
                change += 1;
            }

            current_row[j] = Math.min(add, deleteOperation, change);
        }
    }
    return current_row[len_s1];
}

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const wordInput = document.getElementById('wordInput').value;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>Du hast das Wort eingegeben: <strong>${wordInput}</strong></p>`;

    const misspelled_word = wordInput;

    loadTextFile(txtFile, function(response) {
        const words = wordsArray(response);
        const suggestions = spell_check(misspelled_word, words);
    
        console.log(`Top 10 suggestions for '${misspelled_word}':`);
        suggestions.forEach(([word, distance]) => {
            console.log(`${word} (Distance: ${distance})`);
        });
    });
});

const txtFile = "Words.txt"; // Replace with your actual file name


function spell_check(misspelled_word, words) {
    let suggestions = [];
    for (let i = 0; i < words.length; i++) {
        if (misspelled_word === words[i]) {
            console.log("Das Wort wurde richtig geschrieben");
            return []; // If the word is correctly spelled, no need for suggestions
        } else {
            let distance = wagner_fischer(misspelled_word, words[i]);
            suggestions.push([words[i], distance]);
        }
    }
    suggestions.sort((a, b) => a[1] - b[1]);
    return suggestions.slice(0, 10);
}
