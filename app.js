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
let shooterExists = true


let level1 = document.querySelector('#level-1')
let level2 = document.querySelector('#level-2')
let level3 = document.querySelector('#level-3')

let moveSpeed = 1000


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

// function that draws the invaders into the grid
function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader')
        }
    }
}

draw()

//function that removes the invaders
function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
    }
}

squares[currentShooterIndex].classList.add('shooter')

//this function allows the player to move left and right
let moveShooter = (e) => {
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

//this function moves the invaders in the grid 
function moveInvaders() {
    let leftEdge = alienInvaders[0] % width === 0
    let rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1 // 40 % 15 = 10,
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
            clearInterval(alienBulletId)
        }
    })

    if (aliensRemoved.length === alienInvaders.length) {
        resultsDisplay.innerHTML = 'YOU WIN'
        check = false
        clearInterval(invadersId)
        clearInterval(moveLaser)
        clearInterval(alienBulletId)
    }
}

// this check if the player hasnt beem hit by the alienLasers
if (shooterExists == false) {
    resultsDisplay.innerHTML = 'GAME OVER'
    check = false
    clearInterval(invadersId)
    clearInterval(moveLaser)
    clearInterval(alienBulletId)
}

// level1.addEventListener('click', () => { window.location.reload(); moveSpeed = 1000; })
// level2.addEventListener('click', () => { window.location.reload(); moveSpeed = 500; })
// level3.addEventListener('click', () => { moveSpeed = 250; window.location.reload() })

invadersId = setInterval(moveInvaders, moveSpeed)

// this allows the plyaer to shoot lasers
function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex

    let moveLaser = () => {
        try {
            squares[currentLaserIndex].classList.remove('laser')
            currentLaserIndex -= width
            squares[currentLaserIndex].classList.add('laser')

            if (squares[currentLaserIndex].classList.contains('invader')) {
                squares[currentLaserIndex].classList.remove('laser')
                squares[currentLaserIndex].classList.remove('invader')
                squares[currentLaserIndex].classList.add('boom')

                let destroyedSound = new Audio('destroyed.wav')
                destroyedSound.play()
                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300);
                clearInterval(laserId)

                const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
                aliensRemoved.push(alienRemoved)
                results++
                resultsDisplay.innerHTML = results
            }
        }

        catch (e) { }
    }
    if (shooterExists == false) {
        moveLaser = null
        squares[currentShooterIndex].classList.remove('shooter')
        moveShooter = null
    }

    let playerLaser = new Audio('playerLaser.wav')
    switch (e.key) {
        case 'ArrowUp':
            laserId = setInterval(moveLaser, 100)
            playerLaser.play()
            break
        case ' ':
            laserId = setInterval(moveLaser, 100)
            break
    }
}

document.addEventListener('keydown', shoot)
//laserId = setInterval(shoot, 100)

let alienBulletId
//this makes the aliens shoot at the player 
let alienShoot = () => {
    //let laser1Positions = [alienInvaders[20], alienInvaders[10], alienInvaders[0]]
    let laser1 = alienInvaders[20]
    let laser2 = alienInvaders[10]
    let laser3 = alienInvaders[0]

    let laser4 = alienInvaders[25]
    let laser5 = alienInvaders[15]
    let laser6 = alienInvaders[5]

    let laser7 = alienInvaders[29]
    let laser8 = alienInvaders[19]
    let laser9 = alienInvaders[9]
    function enemyLaser1() {

        // if (alienInvaders.length >= 20) {
        //     // let alienLaser1 = Math.floor(Math.random() * (39 - 30 + 1) + 30)
        //     let alienLaser1 = 35

        //     currentAlienLaser += alienInvaders.indexOf(alienLaser1)
        //     //  console.log(alienLaser1, currentAlienLaser, squares[alienLaser1])
        // }
        // let iterator1 = laser1Positions[Symbol.iterator]()
        // let iterator2 = currentLaser1Indexes[Symbol.iterator]()

        try {
            let count = 0
            let AlienSound = new Audio('alienLaser.wav')
            AlienSound.playbackRate = 1
            AlienSound.volume = 0.5
            if (!aliensRemoved.includes(20)) {
                if (laser1 < 225) {
                    squares[laser1].classList.remove('alienLaser')
                    laser1 += width
                    squares[laser1].classList.add('alienLaser')
                    count++
                    console.log(count)
                    if (count == 1) {
                        AlienSound.play()
                        count = 2
                    } else {
                        AlienSound.pause()
                    }
                } else {
                    laser1 = alienInvaders[20]
                    count = 0
                }
            }


            if (aliensRemoved.includes(20) && !aliensRemoved.includes(10)) {
                if (laser2 < 225) {
                    squares[laser2].classList.remove('alienLaser')
                    laser2 += width
                    squares[laser2].classList.add('alienLaser')
                } else {
                    //alienInvaders[20]
                    //console.log(laser1 - (laser1))
                    laser2 = alienInvaders[10]
                }
            }

            if (aliensRemoved.includes(10) && !aliensRemoved.includes(0)) {
                if (laser3 < 225) {
                    squares[laser3].classList.remove('alienLaser')
                    laser3 += width
                    squares[laser3].classList.add('alienLaser')
                } else {
                    //alienInvaders[20]
                    //console.log(laser1 - (laser1))
                    laser3 = alienInvaders[0]
                }
            }
        }
        catch (e) {

        }
        // } else {
        //     currentLaser1Index = iterator2.next().value
        //     laser1 = iterator1.next().value.position
        // }
        //  console.log()
        // check if alienInvaders.length is bigger than 20
        //then  choose 3(for now just 1) random indexes from the last 10 indexes and add laser class

    }

    function enemyLaser2() {
        try {
            if (!aliensRemoved.includes(25)) {
                if (laser4 < 225) {
                    squares[laser4].classList.remove('alienLaser')
                    laser4 += width
                    squares[laser4].classList.add('alienLaser')
                } else {
                    laser4 = alienInvaders[25]
                }
            }



            if (aliensRemoved.includes(25) && !aliensRemoved.includes(15)) {
                if (laser5 < 225) {
                    squares[laser5].classList.remove('alienLaser')
                    laser5 += width
                    squares[laser5].classList.add('alienLaser')
                } else {
                    //alienInvaders[20]
                    //console.log(laser1 - (laser1))
                    laser5 = alienInvaders[15]
                }
            }

            if (aliensRemoved.includes(15) && !aliensRemoved.includes(5)) {
                if (laser6 < 225) {
                    squares[laser6].classList.remove('alienLaser')
                    laser6 += width
                    squares[laser6].classList.add('alienLaser')
                } else {
                    //alienInvaders[20]
                    //console.log(laser1 - (laser1))
                    laser6 = alienInvaders[5]
                }
            }
        }

        catch (e) { }

    }

    function enemyLaser3() {
        try {
            if (!aliensRemoved.includes(29)) {
                if (laser7 < 225) {
                    squares[laser7].classList.remove('alienLaser')
                    laser7 += width
                    squares[laser7].classList.add('alienLaser')
                } else {
                    laser7 = alienInvaders[29]
                }
            }



            if (aliensRemoved.includes(29) && !aliensRemoved.includes(19)) {
                if (laser8 < 225) {
                    squares[laser8].classList.remove('alienLaser')
                    laser8 += width
                    squares[laser8].classList.add('alienLaser')
                } else {
                    //alienInvaders[20]
                    //console.log(laser1 - (laser1))
                    laser8 = alienInvaders[19]
                }
            }

            if (aliensRemoved.includes(19) && !aliensRemoved.includes(9)) {
                if (laser9 < 225) {
                    squares[laser9].classList.remove('alienLaser')
                    laser9 += width
                    squares[laser9].classList.add('alienLaser')
                } else {
                    //alienInvaders[20]
                    //console.log(laser1 - (laser1))
                    laser9 = alienInvaders[9]
                }
            }
        }

        catch (e) { }

        if (squares[currentShooterIndex].classList.contains('alienLaser')) {
            squares[currentShooterIndex].classList.remove('alienLaser')
            squares[currentShooterIndex].classList.remove('shooter')
            squares[currentShooterIndex].classList.add('boom')

            setTimeout(() => squares[currentShooterIndex].classList.remove('boom'), 300);
            clearInterval(alienBulletId)
            shooterExists = false
        }

    }
    setInterval(enemyLaser1, 100)
    setInterval(enemyLaser2, 100)
    setInterval(enemyLaser3, 100)
    //else clearInterval(enemyLaser)
}

alienBulletId = setInterval(alienShoot(), 100)
if (shooterExists == false) { alienShoot = null }


