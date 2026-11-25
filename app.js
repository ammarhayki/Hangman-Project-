const words = ['GHOST', 'PUMPKIN', 'WITCH', 'VAMPIRE', 'ZOMBIE', 'SKELETON', 'BAT', 'SPIDER', 'HAUNTED', 'MONSTER', 'CANDY', 'MUMMY', 'GRAVEYARD', 'WEREWOLF']

let wrongGuesses = 0;
let gameOver = false
let randomWord = null;
let liElementArr = []
let liElement = null
let guessedLetters = []

const openInstructionsButtonEl = document.querySelector('#instructionsBtn')
const instructionsModalEl = document.querySelector('#instructions')
const closeInstructionsBtnEl = document.querySelector('#close-instructions')
const imageEl = document.querySelector('.image')
const messageEl = document.querySelector('.guess')

const keyBtnEl = document.querySelectorAll('.key')

const startBtnEl = document.querySelector('#start')
const listLetters = document.querySelector('#liLetters')
const resetBtnEl = document.querySelector('#reset')

let letters = ''
let guessedKey = ''




const init = () => {
    listLetters.innerHTML = ''
    liElementArr = []
    guessedLetters = []
    wrongGuesses = 0
    gameOver = false

    keyBtnEl.forEach(button => {
        button.disabled = false
    });

    // randomly pick a word from the words array and set it as the chosen word
    randomWord = words[Math.floor(Math.random() * words.length)]
    letters = randomWord.split('')
    // Render the blanks according to the chosen word length
    letters.forEach((letter, index) => {

        const liElement = document.createElement('li')
        liElement.id = index

        liElement.setAttribute('id', index)
        liElement.innerHTML = '&nbsp'
        listLetters.appendChild(liElement);
        liElementArr.push(letter)

        console.log(liElementArr)
    });

}
const checkGuess = (key) => {
    if (gameOver) return;

    if (!liElementArr.includes(key)) {
        wrongGuesses++
        messageEl.textContent = `Wrong attempts: ${wrongGuesses}`
        imageEl.src = `./assets/game-pic-${wrongGuesses}.png`
        return
    }
    if (!guessedLetters.includes(key)) {
        guessedLetters.push(key)
    }

    liElementArr.forEach((letter, index) => {
        if (letter === key) {

            console.log(index)
            console.log(document.getElementById(index))
            document.getElementById(index).textContent = key;
        }
    })


}

const gameCondition = () => {

    const hasWon = letters.every(letter =>
        guessedLetters.includes(letter)
    )
    if (hasWon) {
        gameOver = true
        messageEl.textContent = 'You Win!'
        keyBtnEl.forEach(button => {
            button.disabled = true
        });
        return
    }

    if (wrongGuesses >= 6) {
        gameOver = true
        messageEl.textContent = `Game Over! The word was ${randomWord}`
        keyBtnEl.forEach(button => {
            button.disabled = true
        });
    }

}

keyBtnEl.forEach((key) => {
    key.addEventListener('click', (event) => {
        event.target.disabled = true
        guessedKey = event.target.innerHTML

        checkGuess(guessedKey)
        gameCondition()
        console.log(guessedKey)
    })
})


startBtnEl.addEventListener('click', () => {
    startBtnEl.disabled = true
    messageEl.textContent = `Wrong attempts: ${wrongGuesses}`

    init()
})

resetBtnEl.addEventListener('click', () => {
    wrongGuesses = 0;
    gameOver = false
    randomWord = null;
    liElementArr = []
    liElement = null
    guessedLetters = []
    imageEl.src = `./assets/game-pic-${wrongGuesses}.png`
    messageEl.textContent = `Wrong attempts: ${wrongGuesses}`

    init()


})


openInstructionsButtonEl.addEventListener('click', () => {
    instructionsModalEl.showModal()

})
closeInstructionsBtnEl.addEventListener('click', () => {
    instructionsModalEl.close()
})






