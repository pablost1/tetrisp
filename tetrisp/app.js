document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')
    const width = 10;

    // The Tetrominoes

    const l_tetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [width*2, 1, width+1, width*2+1],
        [width, width*2, width*2+1, width*2+2]
    ]
    const z_tetromino = [
        [width*2, width+1, width*2+1, width+2],
        [0, width, width+1, width*2+1],
        [width*2, width+1, width*2+1, width+2],
        [0, width, width+1, width*2+1],
    ]
    const t_tetromino = [
        [width, 1, width+1, width+2],
        [1, width+1, width*2+1, width+2],
        [width, width+1, width*2+1, width+2],
        [width, 1, width+1, width*2+1],
    ]
    const o_tetromino = [
        [0, width, 1, width+1],
        [0, width, 1, width+1],
        [0, width, 1, width+1],
        [0, width, 1, width+1],
    ]
    const i_tetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
    ]

    const the_tetrominoes = [l_tetromino, z_tetromino, t_tetromino, o_tetromino, i_tetromino]

    let current_position = 4
    let current_rotation = 0

    //randomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random()*the_tetrominoes.length)
    let current = the_tetrominoes[random][current_rotation]

    //draw thee first rotation in the first tetromino
    function draw() {
        current.forEach(index => {
            squares[current_position + index].classList.add('tetromino')
        })
    }

    //undraw the Tetromino
    function undraw() {
        current.forEach(index => {
            squares[current_position+index].classList.remove('tetromino')
        })
    }

    //Making the Tetromino move down every second
    timer_id = setInterval(move_down, 333)

    //Controls
    function control(e) {
        if(e.keyCode ===37) {
            move_left()
        }
        else if(e.keyCode === 38) {
            rotate()
        }
        else if(e.keyCode ===39) {
            move_right()
        }
        else if(e.keyCode === 40) {
            move_down()
        }
    }
    document.addEventListener('keyup', control)

    //move down function
    function move_down() {
        undraw()
        current_position += width
        draw()
        freeze()
    }

    //move o tetromino para a esquerda, a não ser que esteja no canto ou tenha algum bloco no caminho
    function move_left() {
        undraw()
        const is_at_left_edge = current.some(index => (current_position + index) % width === 0)

        if(!is_at_left_edge) current_position -=1

        if(current.some(index => squares[current_position + index].classList.contains('taken'))) {
            current_position += 1
        }

        draw()
    }
    function move_right() {
        undraw()
        const is_at_right_edge = current.some(index => (current_position + index) % width === width -1)

        if(!is_at_right_edge) current_position +=1

        if(current.some(index => squares[current_position + index].classList.contains('taken'))) {
            current_position -= 1
        }

        draw()
    }
    //Rotate the tetromino
    function rotate() {
        undraw()
        current_rotation++
        if(current_rotation === current.length) {
            current_rotation = 0
        }
        current = the_tetrominoes[random][current_rotation]
        draw()
    }

    //Freeze
    function freeze() {
        if(current.some(index => squares[current_position + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[current_position + index].classList.add('taken'))
            
            //start a new tetrominoo falling
            random = Math.floor(Math.random() * the_tetrominoes.length)
            current = the_tetrominoes[random][current_rotation]
            current_position = 4
            draw()
        }
    }

    //Keybindings
})