var TicTacToe = {
    init: function () {
        this.symbols = ["X", "O"];
        // for each class in html, get the element by class name
        this.squares = Array.from(document.querySelectorAll(".square"));
        this.turnIndicator = document.querySelector(".turnIndicator");
        this.button = document.querySelector(".newGame");
        this.board = document.querySelector(".board");
        // for each symbol X/O, if fit one of the state below, this symbol wins
        this.winningSets = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        // add listeners to each square (which square we clicked?)
        this.addEventListeners();
        // start new game
        this.newGame();
    },

    addEventListeners: function () {
        var tPointer = this;
        this.squares.forEach(function (x) {
            x.addEventListener("click", function () {
                tPointer.play(this);
            }, false)
        })
        this.button.addEventListener("click", function () {
            tPointer.newGame();
        }, false);
    },
    // start new game
    newGame: function () {
        // init several parameters:
        // activePlayer: init = 0, default index in array "symbols"
        // gameOver: init = false
        this.activePlayer = 0;
        this.gameOver = false;

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
        // The forEach() method executes a provided function once for each array element.
        // const array1 = ['a', 'b', 'c'];
        //
        // array1.forEach(element => console.log(element));
        //
        // // Expected output: "a"
        // // Expected output: "b"
        // // Expected output: "c"
        //determining the end of the game accounts for the following possible scenarios for the game being over:
        //
        // 1. The board is full, and no winner has yet been declared: Game is a draw.
        // 2. Cross has won.
        // 3. Circle has won.
        // for start a new game, remove any potential class added in previous game
        this.squares.forEach(function (x) {
            // remove X from class
            x.classList.remove(TicTacToe.symbols[0]);
            // remove O from class
            x.classList.remove(TicTacToe.symbols[1]);
        })
        // remove gameOver from class
        this.board.classList.remove("gameOver");
        // function change O->X OR X->O
        this.setTurnIndicator();
    },

    // change subtitle
    setTurnIndicator: function () {
        this.turnIndicator.innerText = this.symbols[this.activePlayer] + "'s turn."
    },

    // el->elementです
    play: function (el) {
        // el.classList.length == 1 other classes have been removed
        if (!this.gameOver && el.classList.length == 1) {
            el.classList.add(this.symbols[this.activePlayer]);
            if (this.checkWin()) {
                this.turnIndicator.innerText = this.symbols[this.activePlayer] + " wins!";
                this.endGame();
            }
            else if (this.checkDraw()) {
                this.turnIndicator.innerText = "It's a draw!";
                this.endGame();
            }
            else {
                this.activePlayer = 1 - this.activePlayer;
                this.setTurnIndicator();
            }
        }
    },

    checkWin: function () {
        var tPointer = this;

        // this.winningSets = [
        //             [0, 1, 2], [3, 4, 5], [6, 7, 8],
        //             [0, 3, 6], [1, 4, 7], [2, 5, 8],
        //             [0, 4, 8], [2, 4, 6]
        //         ];
        return this.winningSets.some(function (x) {
            return x.every(function (i) {
                return Array.from(tPointer.squares[i].classList).indexOf(tPointer.symbols[tPointer.activePlayer]) > -1;
            })
        })
    },

    checkDraw: function () {

        return this.squares.every(function (x) {
            return x.classList.length > 1;
        })
    },

    endGame: function () {
        this.gameOver = true;
        this.board.classList.add("gameOver");
    }
}

window.onload = function () {
    TicTacToe.init();
}
