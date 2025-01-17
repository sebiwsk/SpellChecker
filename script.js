function loadTextFile(file, callback) {
    const rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("text/plain");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200) {
                callback(null, rawFile.responseText);  
            }
            else {
                callback(new Error("Error loading file: " + rawFile.status));
            }
        }
    };
    rawFile.send(null);
}

function wordsArray(text) {
    return text.split('\n')
        .map(line => line.trim())
        .filter(line => line !== '')
        .flatMap(line => line.split(/\s+/));
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

function levenshteinDistance(s1, s2) {
    const len_s1 = s1.length;
    const len_s2 = s2.length;
    const dp = Array.from({ length: len_s1 + 1 }, (_, i) => [i]);
 
    for (let j = 1; j <= len_s2; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= len_s1; i++) {
        for (let j = 1; j <= len_s2; j++) {
            const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
            dp[i] = dp[i] || [];
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
            );
        }
    }

    return dp[len_s1][len_s2];
}

function spell_check(misspelled_word, words) {
    const suggestions = [];
    const maxDistance = 4;
    for (let i = 0; i < words.length; i++) {
        if (misspelled_word === words[i]) {
            return [{word: words[i], distance: 0}];
        } 
        else {
            let distance;
            if (misspelled_word.length < 10) {
                distance = levenshteinDistance(misspelled_word, words[i]);
            }
            else {
                distance = wagner_fischer(misspelled_word, words[i]);
            }
            if (distance < maxDistance) {
                suggestions.push({ word: words[i], distance: distance });
            }
        }
    }
    suggestions.sort((a, b) => a.distance - b.distance);
    return suggestions.slice(0, 10);
}

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const wordInput = document.getElementById('wordInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "";
    
    const txtFile = "Words.txt";
    loadTextFile(txtFile, function(error, response) {
        if (error) {
            resultDiv.innerHTML = "Error loading file.";
        }
        else {
            const words = wordsArray(response);
            const suggestions = spell_check(wordInput, words);
            if (suggestions.length > 0) {
                if (suggestions[0].distance === 0) {
                    resultDiv.innerHTML += `The word was spelled correctly!</br>`;
                }
                else {
                    suggestions.forEach(({word, distance}) => {
                        resultDiv.innerHTML += `${word} (Distance: ${distance})</br>`;
                    });
                }
            }
            else {
                resultDiv.innerHTML += `No word was found for improvement!`;
            }  
        }
    });
});