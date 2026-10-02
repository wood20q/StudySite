# StudySite

StudySite is a lightweight browser-based study app designed for quick review using flashcard-style multiple-choice questions. It is especially useful for memorizing chemistry facts like polyatomic ions, but the app can work with any CSV-based question set you provide.

## What the project does

This project lets you:

- Load a CSV file containing study questions and answers
- Display each prompt as a multiple-choice question
- Select an answer from A-D
- Submit your answer and see whether it was correct
- Switch between question-first and answer-first flashcard modes
- Shuffle the question order for repeated practice

The app is intentionally simple and runs entirely in the browser, so there is no backend or database required.

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

The app then generates multiple-choice options and lets the user practice recalling the correct match.

## How to use it

### 1. Open the app

Open `index.html` in a web browser.

### 2. Upload a CSV file

Use the file input in the page to upload a CSV file.

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

- Click one of the A-D answer choices
- Press the Submit button to check your answer
- The app will display whether you were correct and reveal the correct answer

### 4. Switch question type

The "Switch Question Type" button flips the app between:

- question -> answer mode
- answer -> question mode

This is useful for studying in reverse, such as identifying a formula from a name or vice versa.

## Project structure

- `index.html` – main app layout and study interface
- `style.css` – styling for the app
- `theme.css` – color theme definitions
- `script.js` – logic for reading CSV files, generating choices, checking answers, and shuffling questions
- `polyAtomicIons.csv` – sample study data for poly-atomic ions

## Notes

This project is a simple front-end study tool and is best suited for quick local use. It does not require installation or a package manager.

To use it, simply serve the files locally in a browser or open `index.html` directly.

## Suggested next improvements

- Add support for text input instead of just multiple choice 
- Add scoring and progress tracking
- Add keyboard controls for answering questions
- Add support for larger CSV files and validation checks
- Add a landing page or instructions section inside the app itself

This project is ideal for personal use, classroom study, and quick memorization drills.
