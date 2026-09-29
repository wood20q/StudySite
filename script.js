const ABUTTON = document.getElementById("optionA")
const BBUTTON = document.getElementById("optionB")
const CBUTTON = document.getElementById("optionC")
const DBUTTON = document.getElementById("optionD")

let selectedAnswer = null
let correctOption = null
let questionList = []
let currentQuestion = 0

document.getElementById('csvFileInput').addEventListener('change', function(event) {
    importCSV(event.target.files[0])
})

function updateQuestion() {
    console.log("Update Question")
    if (currentQuestion >= questionList.length) {shuffleQuestions(); return}
    const questionField = document.getElementById("question")
    questionField.textContent = questionList[currentQuestion][0]
    updateAnswers()
}

function updateAnswers() {
    console.log("Update Answers")
    let answerOptions = [null, null, null, null]

    let answerRandomNumber = Math.floor(Math.random() * 4)

    if (answerRandomNumber == 0) {
        correctOption = 'a';
        answerOptions[0] = questionList[currentQuestion][1]
    } else if (answerRandomNumber == 1) {
        correctOption = 'b';
        answerOptions[1] = questionList[currentQuestion][1]
    } else if (answerRandomNumber == 2) {
        correctOption = 'c';
        answerOptions[2] = questionList[currentQuestion][1]
    } else if (answerRandomNumber == 3) {
        correctOption = 'd';
        answerOptions[3] = questionList[currentQuestion][1]
    }

    for (let i = 0; i < answerOptions.length; i++) {
        while (answerOptions[i] == null) {
            let randomAnswer = Math.floor(Math.random() * questionList.length)
            let match = false
            for (let j = 0; j < answerOptions.length; j++){
                if (questionList[randomAnswer][1] == answerOptions[j]) match = true
            }
            if (!match) answerOptions[i] = questionList[randomAnswer][1]
        }
    }

    ABUTTON.querySelector(".answer").textContent = answerOptions[0]
    BBUTTON.querySelector(".answer").textContent = answerOptions[1]
    CBUTTON.querySelector(".answer").textContent = answerOptions[2]
    DBUTTON.querySelector(".answer").textContent = answerOptions[3]
}

function importCSV(file) {
    console.log("Import CSV")
    if (!file) return

    const reader = new FileReader()

    reader.onload = (e) => {
        const text = e.target.result
        const data = parseCSV(text)

        // Add this check
        if (data.length < 4) {
            alert("Your CSV must contain at least 4 items to play.")
            return
        }

        questionList = data
        shuffleQuestions()
    }

    reader.readAsText(file)
}

function shuffleQuestions() {
    console.log("Shuffle Questions")
    for (let i = 0; i < questionList.length; i++) {
        console.log(`I = ${i}`)
        let j = Math.floor(Math.random() * questionList.length)
        ;[questionList[i], questionList[j]] = [questionList[j], questionList[i]]
    }

    console.log(questionList)

    currentQuestion = 0
    updateQuestion()
}

function parseCSV(text) {
    console.log("Parse CSV")
    const lines = text.split('\n').slice(1).filter(line => line.trim() !== "")
    return lines.map(line => line.split(","))
}

function resetAnswers () {
    console.log("Reset Answers")
    ABUTTON.classList.remove("selected")
    BBUTTON.classList.remove("selected")
    CBUTTON.classList.remove("selected")
    DBUTTON.classList.remove("selected")
    selectedAnswer = null
}

function chooseAnswer (option) {
    console.log("Choose Answers")
    console.log(`Testing ${option}`)

    resetAnswers()

    if (option == "a") {ABUTTON.classList.add("selected"); selectedAnswer = option}
    if (option == "b") {BBUTTON.classList.add("selected"); selectedAnswer = option}
    if (option == "c") {CBUTTON.classList.add("selected"); selectedAnswer = option}
    if (option == "d") {DBUTTON.classList.add("selected"); selectedAnswer = option}
}

function checkAnswer() {
    console.log("Check Answer")
    let box = document.getElementById("CorrectOrIncorrect")
    let header = document.getElementById("answerStatus")
    let text = document.getElementById("answerText")
    let question = questionList[currentQuestion]

    if (correctOption == selectedAnswer) {
        header.textContent = "Correct"
        box.className = "Correct"
    } else {
        header.textContent = "Incorrect"
        box.className = "Incorrect"
    }

    text.textContent = `The answer is: ${question[0]} = ${question[1]}`
}

function submitAnswer() {
    console.log("Submit Answer")
    if (questionList.length == 0) {alert("Please Upload a file before trying to answer questions"); return}
    if (selectedAnswer == null) {return}
    checkAnswer()
 
    console.log(`Answer you chose: ${selectedAnswer}`)
    currentQuestion++

    resetAnswers()
    updateQuestion()
}