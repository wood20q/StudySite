ABUTTON = document.getElementById("optionA")
BBUTTON = document.getElementById("optionB")
CBUTTON = document.getElementById("optionC")
DBUTTON = document.getElementById("optionD")

let selectedAwnser = null
let correctOption = null
let questionList = []
let currentQuestion = 0

document.getElementById('csvFileInput').addEventListener('change', function(event) {
    console.log("File Uptated")
    importCSV(event.target.files[0])
})

function updateQestion() {
    if (currentQuestion >= questionList.length) shuffleQuestions()
    const questionField = document.getElementById("question")
    questionField.textContent = questionList[currentQuestion][0]
    updateAwnsers()
}

function updateAwnsers() {
    let awnserOptions = [null, null, null, null]

    let awnserRandomNumber = Math.floor(Math.random() * 4)

    if (awnserRandomNumber == 0) {
        correctOption = 'A';
        awnserOptions[0] = questionList[currentQuestion][1]
    } else if (awnserRandomNumber == 1) {
        correctOption = 'B';
        awnserOptions[1] = questionList[currentQuestion][1]
    } else if (awnserRandomNumber == 2) {
        correctOption = 'C';
        awnserOptions[2] = questionList[currentQuestion][1]
    } else if (awnserRandomNumber == 3) {
        correctOption = 'D';
        awnserOptions[3] = questionList[currentQuestion][1]
    }

    ABUTTON.querySelector(".awnser").textContent = awnserOptions[0]
    BBUTTON.querySelector(".awnser").textContent = awnserOptions[1]
    CBUTTON.querySelector(".awnser").textContent = awnserOptions[2]
    DBUTTON.querySelector(".awnser").textContent = awnserOptions[3]
}

function importCSV(file) {
    if (!file) return

    const reader = new FileReader()

    reader.onload = (e) => {
        const text = e.target.result
        const data = parseCSV(text)
        console.log(data)

        questionList = data
        shuffleQuestions()
    }

    reader.readAsText(file)
}

function shuffleQuestions() {
    for (let i = 0; i < questionList.length; i++) {
        let j = Math.floor(Math.random() * questionList.length)
        console.log(`i = ${i} | j = ${j}`)
        ;[questionList[i], questionList[j]] = [questionList[j], questionList[i]]
    }

    console.log(questionList)

    currentQuestion = 0
    updateQestion()
}

function parseCSV(text) {
    const lines = text.split('\n').slice(1)
    return lines.map(line => line.split(","))
}

function resetAwnsers () {
    ABUTTON.classList.remove("selected")
    BBUTTON.classList.remove("selected")
    CBUTTON.classList.remove("selected")
    DBUTTON.classList.remove("selected")
    selectedAwnser = null
}

function chooseAwnser (option) {
    console.log(`Testing ${option}`)

    resetAwnsers()

    if (option == "a") {ABUTTON.classList.add("selected"); selectedAwnser = option}
    if (option == "b") {BBUTTON.classList.add("selected"); selectedAwnser = option}
    if (option == "c") {CBUTTON.classList.add("selected"); selectedAwnser = option}
    if (option == "d") {DBUTTON.classList.add("selected"); selectedAwnser = option}
}

function submitAwnser() {
    if (questionList.length == 0) {alert("Please Upload a file before trying to awnser questions"); return}
    if (selectedAwnser == null) {return}

    console.log(`Awnser you chose: ${selectedAwnser}`)
    resetAwnsers()
    currentQuestion++
    updateQestion()
}