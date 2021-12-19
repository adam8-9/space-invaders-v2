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
            //console.log(alienInvaders[i], squares[alienInvaders[i]])
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
    let rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1 // 40 % 15 = 10,
    //console.log(leftEdge, rightEdge)
    remove()

    if (rightEdge && goingRight) {

        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1
            direction = -1
            goingRight = false
        }
        //console.log(alienInvaders)

    }

    // const alienInvaders = [
    //     0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    //     15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    //     30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    // ]
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]


    if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1
            direction = 1
            goingRight = true
        }
    }


    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
        //console.log(alienInvaders[alienInvaders.length - 1], alienInvaders[alienInvaders.length - 1] % width)

    }

    draw()

    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        resultsDisplay.innerHTML = 'GAME OVER'
        check = false
        clearInterval(invadersId)
        clearInterval(alienBullet)
        clearInterval(moveLaser)
        // console.log(check)
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
        clearInterval(alienBullet)
    }
}

invadersId = setInterval(moveInvaders, 3000)

function shoot(e) {
    //  console.log(e.key)
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
document.addEventListener('keydown', shoot)
//laserId = setInterval(shoot, 100)

let alienBulletId
function alienShoot() {
    // let 
    //let laser1Positions = [alienInvaders[20], alienInvaders[10], alienInvaders[0]]
    let laser1 = alienInvaders[20]
    let laser2 = alienInvaders[10]
    let laser3 = alienInvaders[0]

    // let currentLaser1Indexes = [20, 10, 0]
    //let currentLaser1Index = currentLaser1Indexes[0];
    // let AlienLaser2 = alienInvaders[20]
    // let AlienLaser3 = alienInvaders[20]
    function enemyLaser() {

        // if (alienInvaders.length >= 20) {
        //     // let alienLaser1 = Math.floor(Math.random() * (39 - 30 + 1) + 30)
        //     let alienLaser1 = 35

        //     currentAlienLaser += alienInvaders.indexOf(alienLaser1)
        //     //  console.log(alienLaser1, currentAlienLaser, squares[alienLaser1])
        // }
        // let iterator1 = laser1Positions[Symbol.iterator]()
        // let iterator2 = currentLaser1Indexes[Symbol.iterator]()
        if (!aliensRemoved.includes(20)) {
            if (laser1 < 225) {
                squares[laser1].classList.remove('laser')
                laser1 += width
                squares[laser1].classList.add('laser')
            } else {
                laser1 = alienInvaders[20]
            }
        }

        if (aliensRemoved.includes(20) && !aliensRemoved.includes(10)) {
            if (laser2 < 225) {
                squares[laser2].classList.remove('laser')
                laser2 += width
                squares[laser2].classList.add('laser')
            } else {
                //alienInvaders[20]
                //console.log(laser1 - (laser1))
                laser2 = alienInvaders[10]
            }
        }

        if (aliensRemoved.includes(10) && !aliensRemoved.includes(0)) {
            if (laser3 < 225) {
                squares[laser3].classList.remove('laser')
                laser3 += width
                squares[laser3].classList.add('laser')
            } else {
                //alienInvaders[20]
                //console.log(laser1 - (laser1))
                laser3 = alienInvaders[0]
            }
        }
        // } else {
        //     currentLaser1Index = iterator2.next().value
        //     laser1 = iterator1.next().value.position
        // }
        //  console.log()
        // check if alienInvaders.length is bigger than 20
        //then  choose 3(for now just 1) random indexes from the last 10 indexes and add laser class 
        //
        //  console.log(check)
        // console.log(check)
    }


    setInterval(enemyLaser, 100)
    //else clearInterval(enemyLaser)



}

alienBulletId = setInterval(alienShoot(), 100)
if (check === false) { clearInterval(alienBulletId) }





