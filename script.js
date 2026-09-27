ABUTTON = document.getElementById("optionA")
BBUTTON = document.getElementById("optionB")
CBUTTON = document.getElementById("optionC")
DBUTTON = document.getElementById("optionD")

let selectedAwnser = null
let questionList = []
let currentQuestion = 0

document.getElementById('csvFileInput').addEventListener('change', function(event) {
    console.log("File Uptated")
    importCSV(event.target.files[0])
})

function updateQestion() {
    if (currentQuestion >= questionList.length) currentQuestion = 0
    const questionField = document.getElementById("question")
    questionField.textContent = questionList[currentQuestion][0]
}

function importCSV(file) {
    if (!file) return

    const reader = new FileReader()

    reader.onload = (e) => {
        const text = e.target.result
        const data = parseCSV(text)
        console.log(data)

        questionList = data

        currentQuestion = 0
        updateQestion()
    }

    reader.readAsText(file)
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
    if (selectedAwnser == null) return

    console.log(`Awnser you chose: ${selectedAwnser}`)
    resetAwnsers()
    currentQuestion++
    updateQestion()
}