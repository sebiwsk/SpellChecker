# JavaScript Spell Checker

This is a simple JavaScript spell checker that reads a list of words from a text file and suggests corrections for misspelled words entered by the user.

## Features

- Calculates edit distances using both the Wagner-Fischer and Levenshtein algorithms.
- Provides up to 10 suggestions based on similarity to the input word.
- Handles various word lengths efficiently with different algorithms.

## Requirements

- A modern web browser that supports JavaScript.
- The `Words.txt` file containing a list of words in the same directory as your HTML file.

## How to Use

### Load and Run

### Clone or Download

Download the HTML and JavaScript files to your local machine.

### Ensure Words File

Make sure `Words.txt` is present in the same directory as the HTML file.

### Open in Browser

Open the HTML file in a web browser.

### Enter a Word

Type a word into the input field and submit the form.

### View Suggestions

The program will display suggestions for corrections or indicate if the word is correctly spelled.

## Code Explanation

`loadTextFile(file, callback)`
Loads the Words.txt file asynchronously using XMLHttpRequest and passes the content to the callback function.

`wordsArray(text)`
Converts the loaded text into an array of words, filtering out empty lines and trimming excess spaces.

`wagner_fischer(s1, s2)`
Calculates the edit distance between two strings s1 and s2 using the Wagner-Fischer algorithm.

`levenshteinDistance(s1, s2)`
Computes the edit distance between two strings s1 and s2 using the Levenshtein algorithm.

`spell_check(misspelled_word, words)`
Main function that checks the input misspelled_word against the words array, suggesting corrections based on edit distance.

## License

This project is licensed under the MIT License. Feel free to use and modify the code as you wish.

## Author
sebiwsk
