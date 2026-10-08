const ABUTTON = document.getElementById("optionA")
const BBUTTON = document.getElementById("optionB")
const CBUTTON = document.getElementById("optionC")
const DBUTTON = document.getElementById("optionD")
const TEXTANSWERS = document.getElementById("answerBox")

let selectedAnswer = null
let correctOption = null
let correctAnswer = null
let questionList = []
let currentQuestion = 0

let questionIndex = 1
let answerIndex = 0

// Whether the questions will be multiple choice or not
let multipleChoice = true

document.getElementById('csvFileInput').addEventListener('change', function(event) {
    importCSV(event.target.files[0])
})

function updateQuestion() {
    console.log("Update Question")
    if (currentQuestion >= questionList.length) {shuffleQuestions(); return}

    const questionHeader = document.getElementById("questionTitle")
    questionHeader.textContent = `Question (${currentQuestion + 1} / ${questionList.length}):`

    const questionField = document.getElementById("question")
    questionField.textContent = questionList[currentQuestion][questionIndex]
    updateAnswers()
}

function updateAnswers() {
    console.log("Update Answers")
    let answerOptions = [null, null, null, null]

    let answerRandomNumber = Math.floor(Math.random() * 4)

    if (answerRandomNumber == 0) {
        correctOption = 'a';
        answerOptions[0] = questionList[currentQuestion][answerIndex]
    } else if (answerRandomNumber == 1) {
        correctOption = 'b';
        answerOptions[1] = questionList[currentQuestion][answerIndex]
    } else if (answerRandomNumber == 2) {
        correctOption = 'c';
        answerOptions[2] = questionList[currentQuestion][answerIndex]
    } else if (answerRandomNumber == 3) {
        correctOption = 'd';
        answerOptions[3] = questionList[currentQuestion][answerIndex]
    }

    correctAnswer = questionList[currentQuestion][answerIndex]

    for (let i = 0; i < answerOptions.length; i++) {
        while (answerOptions[i] == null) {
            let randomAnswer = Math.floor(Math.random() * questionList.length)
            let match = false
            for (let j = 0; j < answerOptions.length; j++){
                if (questionList[randomAnswer][answerIndex] == answerOptions[j]) match = true
            }
            if (!match) answerOptions[i] = questionList[randomAnswer][answerIndex]
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
    TEXTANSWERS.value = ""
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

    if (multipleChoice) {
        if (correctOption == selectedAnswer) {
            header.textContent = "Correct"
            box.className = "Correct"
        } else {
            header.textContent = "Incorrect"
            box.className = "Incorrect"
        }
    } else {
        if (TEXTANSWERS.value.trim() == correctAnswer.trim()) {
            header.textContent = "Correct"
            box.className = "Correct"            
        } else {
            header.textContent = `"${TEXTANSWERS.value}" is Incorrect`
            box.className = "Incorrect"
        }
    }

    text.textContent = `The answer is: ${question[questionIndex]} = ${question[answerIndex]}`
}

function submitAnswer() {
    console.log("Submit Answer")
    console.log(TEXTANSWERS.value)
    if (questionList.length == 0) {alert("Please Upload a file before trying to answer questions"); return}
    if (selectedAnswer == null && multipleChoice) {return}
    else if (TEXTANSWERS.value.trim() == "") {return}
    checkAnswer()
 
    console.log(`Answer you chose: ${selectedAnswer}`)
    currentQuestion++

    resetAnswers()
    updateQuestion()
}

function flipQuestionType() {
    ;[questionIndex, answerIndex] = [answerIndex, questionIndex]
    updateQuestion()
    updateAnswers()
}

function flipAnswerType() {
    let multipleChoiceAnswers = document.getElementById("answerOptions")

    multipleChoice = !multipleChoice
    if (multipleChoice) {
        multipleChoiceAnswers.classList.remove("disabled")
        TEXTANSWERS.classList.add("disabled")
    } else {
        multipleChoiceAnswers.classList.add("disabled")
        TEXTANSWERS.classList.remove("disabled")
    }
}

TEXTANSWERS.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        submitAnswer();
    }
});