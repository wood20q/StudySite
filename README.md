# StudySite

StudySite is a lightweight browser-based study app for quick review using flashcard-style question prompts. It is especially useful for memorizing facts, vocabulary, formulas, and definitions across a wide range of subjects.

## What the project does

This project lets you:

- Upload a CSV file containing study questions and answers
- Display each row as a flashcard-style question
- Practice in multiple-choice mode or free-text answer mode
- Select an answer from A-D in multiple-choice mode
- Type a response in text mode and submit with Enter or the Submit button
- Switch between question-first and answer-first study direction
- Toggle between multiple-choice and text-entry answer styles
- Shuffle the question order for repeated practice
- Get instant feedback on whether the answer was correct

The app runs entirely in the browser, so there is no backend, database, or installation required.

## New features

Recent updates added more flexibility to the study flow:

- Text answer mode: switch from A-D choices to a text box for typed responses
- Question reversal: flip the dataset so the prompt becomes the answer and vice versa
- Answer style toggle: instantly switch between multiple-choice and typed answers without reloading
- Enter-to-submit support in text mode for faster practice
- CSV validation: the app checks that the uploaded file includes enough data before starting
- Improved study workflow: answer checking, shuffle, and question progression are handled directly in the browser

## Example use case

The repository includes a sample file named `polyAtomicIons.csv` that contains chemistry terms like:

```csv
name,formula
ammonium,NH4 +
carbonate,CO3 2-
perchlorate,ClO4 -
```

This file is interpreted as:

- Question: the ion name
- Answer: the chemical formula

The app then generates multiple-choice options or a text-answer prompt and lets the user practice recalling the correct match.

## How to use it

### 1. Open the app

Open `index.html` in a web browser.

### 2. Upload a CSV file

Use the file input on the page to upload a CSV file.

Your CSV should have two columns:

- Column 1: the prompt/question
- Column 2: the answer

Example:

```csv
term,definition
photosynthesis,process plants use to make food
mitosis,cell division that creates two identical cells
```

### 3. Answer the questions

In multiple-choice mode:

- Click one of the A-D answer choices
- Press the Submit button to check your answer
- The app will display whether you were correct and reveal the correct answer

In text mode:

- Type the answer into the text box
- Press Submit or hit Enter
- The app checks the response against the correct answer

### 4. Switch question type

The "Switch Question Type" button flips the app between:

- question -> answer mode
- answer -> question mode

This is useful for studying in reverse, such as identifying a formula from a name or vice versa.

### 5. Switch answer type

The "Switch Answer Type" button toggles between:

- multiple-choice answers
- typed text answers

This lets you practice both recognition-based recall and direct answer input.

## Project structure

- `index.html` – app layout and study interface
- `style.css` – styling for the app
- `theme.css` – color theme definitions
- `script.js` – CSV parsing, answer generation, validation, question switching, and study logic
- `polyAtomicIons.csv` – sample study data for polyatomic ions

## Notes

This project is a simple front-end study tool and is best suited for quick local use. It does not require installation or a package manager.

To use it, simply serve the files locally in a browser or open `index.html` directly.

## Suggested next improvements

- Add scoring and progress tracking
- Add flashcard review history or streaks
- Add keyboard shortcuts for answer selection
- Add support for larger CSV files and stronger validation checks
- Add a landing page or built-in instructions panel
- Add support for case-insensitive or normalized text matching in text mode

This project is ideal for personal study, classroom review, and quick memorization drills.
