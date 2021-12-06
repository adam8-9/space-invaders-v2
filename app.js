const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0
let check = true

for (let i = 0; i < 225; i++) {
    let square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))//makes an array of all the divs

const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader')
        }
    }
}

draw()

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
    }
}

squares[currentShooterIndex].classList.add('shooter')

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')
    switch (e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
            break
        case 'ArrowRight':
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
            break
    }
    squares[currentShooterIndex].classList.add('shooter')

}

document.addEventListener('keydown', moveShooter)

function moveInvaders() {
    let leftEdge = alienInvaders[0] % width === 0
    let rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
    remove()

    if (rightEdge && goingRight) {

        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1
            direction = -1
            goingRight = false
        }

    }

    if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1
            direction = 1
            goingRight = true
        }
    }


    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }

    draw()

    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        resultsDisplay.innerHTML = 'GAME OVER'
        check = false
        clearInterval(invadersId)
        clearInterval(alienBullet)
        clearInterval(moveLaser)
    }

    alienInvaders.forEach((invader, index) => {
        if (invader > squares.length) {
            resultsDisplay.innerHTML = 'GAME OVER'
            check = false
            clearInterval(invadersId)
            clearInterval(moveLaser)
            clearInterval(alienBullet)
        }
    })
    if (aliensRemoved.length === alienInvaders.length) {
        resultsDisplay.innerHTML = 'YOU WIN'
        check = false
        clearInterval(invadersId)
        clearInterval(moveLaser)
    }
}

invadersId = setInterval(moveInvaders, 100)

function shoot(e) {
    console.log(e.key)
    let laserId
    let currentLaserIndex = currentShooterIndex
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')

        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.add('boom')

            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300);
            clearInterval(laserId)

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            results++
            resultsDisplay.innerHTML = results
        }


    }
    switch (e.key) {
        case 'ArrowUp':
            laserId = setInterval(moveLaser, 100)
            break
        case ' ':
            laserId = setInterval(moveLaser, 100)
            break
    }
}

let alienBullet
function alienShoot() {
    let currentAlienLaser = 30
    function enemyLaser() {

        if (alienInvaders.length >= 20 && currentAlienLaser > 225) {
            // let alienLaser1 = Math.floor(Math.random() * (39 - 30 + 1) + 30)
            let alienLaser1 = 30

            currentAlienLaser += alienInvaders.indexOf(alienLaser1)
            //  console.log(alienLaser1, currentAlienLaser, squares[alienLaser1])
        }


        if (currentAlienLaser < 225) {
            squares[currentAlienLaser].classList.remove('laser')
            currentAlienLaser += width
            // console.log(currentAlienLaser)
            squares[currentAlienLaser].classList.add('laser')
        }

        // check if alienInvaders.length is bigger than 20
        //then  choose 3(for now just 1) random indexes from the last 10 indexes and add laser class 
        //
        //  console.log(check)
    }

    switch (check) {
        case true:
            alienBullet = setInterval(enemyLaser, 100)
            break
        case false:
            alienBullet = clearInterval(enemyLaser)
            break
    }
}
alienBullet = setInterval(alienShoot(check), 100)



document.addEventListener('keydown', shoot)

