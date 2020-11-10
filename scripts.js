// Player factory
const Player = (name,symb)=>{
    const getName = () => name;
    const getSymb = () => symb;

    return {getName,getSymb}
};






// Game Board
const GameBoard = (()=>{
    'use strick'
    
    //adds and displays wining message to board
    const boardMessage = (message)=>{
        board = board.map((x,i)=> x = message[i] );
        DisplayController.updateDisplayBoard(GameBoard.getBoard())
    }
    //board array
    let board = [
                 "","","",       // 0,1,2
                 "","","",       // 3,4,5
                 "","","",       // 6,7,8
                ]
           
    // gets board
    const getBoard = () =>{
        return board;
    }


    //returns contence of cell on board
    const getCellContence = (index)=>{
        return board[index]
    }

    //updates board with new play and displays
    const updateBoard = (index,player) =>{
        board[index] = player;
        DisplayController.updateDisplayBoard(GameBoard.getBoard())
    }

    // resets board
    const resetBoard = ()=>{
        board = board.map( x => x = "");
        DisplayController.updateDisplayBoard(GameBoard.getBoard())
    }

    //checks for winner
    const checkForWin = (player) =>{

        if(player==1){
            sym = "xxx"
        }else{
            sym = "ooo"
        }

    
        console.log

        let win = false
        let v = 0
        let d1 = 0
        let d2 = 2 


        for (let i = 0; i < 9; i+=3) {
            console.log(v)
        
            if(board[i]+board[i+1]+board[i+2]== sym){
                win = true
                break
            }
            if(board[v]+board[v+3]+board[v+6]== sym){
                win = true
                break
            }   
            if(board[d1]+board[d1+4]+board[d1+8]== sym){
                win = true
                break
            } 
            if(board[d2]+board[d2+2]+board[d2+4]== sym){
                win = true
                break
            } 
            v+=1
            d1+=1
            d2+=1 
            console.log(win)
            
        }

        if(win == true){
            GameFlow.gameOver(win)
        }
        if(board.includes("") == false){
            GameFlow.gameOver(win)
                
        }else{
            GameFlow.setPlayerTurn()
            DisplayController.startListeners()  
        }

        // if(board.includes("") == false){
        //     GameFlow.draw
            
        // }  
    }

    return {
        getBoard,
        updateBoard,
        checkForWin,
        getCellContence,
        resetBoard,
        boardMessage,
    }
})();

const DisplayController = (()=>{

    const boardContainer = document.querySelector('#board-container');
    const player1Name = document.getElementById('p1-name');
    const player2Name = document.getElementById('p2-name');
    const btnStartGame = document.querySelector('#btn-start-game');
    const playerForm = document.getElementById('form-container');
    const btnSubmitPlayers = document.querySelector('#btn-submit-players');
    const gameContainer = document.querySelector('#game-container')
    const btnPlayAgain = document.querySelector('#btn-play-again');

    const setActiveClass = (player)=>{
        if(player == 1){
            player1Name.classList.add('win')
            player2Name.classList.remove('win')
        }else{
            player2Name.classList.add('win')
            player1Name.classList.remove('win')
        }
    }
    
    
    const clearBoard = ()=>{
        while (boardContainer.firstChild) {
            boardContainer.removeChild(boardContainer.lastChild);
        }
    }

    const createCell = (index)=>{
        let cell = document.createElement('div');  
        cell.classList.add('cell')
        // cell.style.border = cellBoarders(index)
        return cell
    }



    const updateWinnnrDisplay = (player)=>{
        console.log(player)
        if(player == 1){
            player1Name.textContent = `${player1.getName()} wins!`;
            player2Name.textContent = `${player2.getName()} loses!`;
            player1Name.classList.add('win')
        }else{
            player2Name.textContent = `${player2.getName()} wins!`;
            player1Name.textContent = `${player1.getName()} loses!`;
            player2Name.classList.add('win')
        }

    }
  

    

    const updateDisplayBoard = (board)=>{
        clearBoard()
        board.forEach((element,index) => {
            let cell = createCell(index)
            cell.dataset.index = index;
            cell.textContent = board[index]
            boardContainer.appendChild(cell);
        });
    }


    const getMark = (e) =>{
        
        let index = e.target.dataset.index;
        console.log(index,"x")
        let s = "x"
        if (GameFlow.getPlayerTurn() == 1){
            s = "x"
        }else{
            s = "o"
        }
                GameBoard.updateBoard(index,s)
                GameBoard.checkForWin(GameFlow.getPlayerTurn()) 
    }

    const startBtn = ()=>{
        btnStartGame.addEventListener('click', () => {
            btnStartGame.style.display = "none";
            playerForm.style.display = "flex"
            
        })
    }

    const playAgainBtn = ()=>{
        btnPlayAgain.addEventListener('click', () => {
            btnPlayAgain.style.display = "none";
            GameBoard.resetBoard()
            btnStartGame.style.display = "flex";
           
            gameContainer.style.display = "none"
    
           
            
        })
    }
    const showPlayerForm = ()=>{

        btnSubmitPlayers.addEventListener('click', () => {
            // btnSubmitPlayers.style.display = "none";
            playerForm.style.display = "none"
            btnStartGame.style.display = "none";
            let player1NameForm = document.getElementById('player1').value;
            let player2NameForm = document.getElementById('player2').value;
    
            player1Name.textContent = player1NameForm
            player2Name.textContent = player2NameForm
            GameFlow.createPlayers(player1NameForm,player2NameForm)
            gameContainer.style.display = "flex";
     

            


        })}
    
    //eventListeners
    const startListeners = ()=>{
        
        const boardContainer = document.getElementById('board-container');
        boardContainer.addEventListener('click',getMark)
    }

    const stopListeners = ()=>{
        boardContainer.removeEventListener('click',getMark);
    }



    return{
        updateDisplayBoard,
        startListeners,
        stopListeners,
        updateWinnnrDisplay,
        setActiveClass,
        startBtn,
        showPlayerForm,
        playAgainBtn,
    }

})();

const GameFlow =  (()=>{

    let playerMode = 0;    // '0 = two player' '1 = AI'
    let playerTurn = 1;
    const winnerMessage = ["G","A","M","E","O","V","E","R","!"]
    const drawMessage = ["D","-","R","-","A","-","W","-","!"]

    const startGame = ()=>{
    }
    
    const getPlayerMode = ()=>{
        return playerMode;
        

    }

    const init = ()=>{
        DisplayController.startBtn()
        DisplayController.updateDisplayBoard(GameBoard.getBoard())
        DisplayController.showPlayerForm()
        DisplayController.startListeners()
        DisplayController.setActiveClass(playerTurn)
        DisplayController.playAgainBtn()
        
    }

    const gameOver = (win)=>{
        console.log("Game Over")
        console.log("win" + win)
        win == true ? GameBoard.boardMessage(winnerMessage):GameBoard.boardMessage(drawMessage);
        DisplayController.updateWinnnrDisplay(playerTurn)
        DisplayController.stopListeners()
    }

    const draw = ()=>{
        console.log("Draw")
    }

    const getPlayerTurn = ()=>{
        return playerTurn
    }

    const setPlayerTurn = ()=>{
        console.log(playerTurn)
        if(playerTurn == 1){
            playerTurn = 2
            DisplayController.setActiveClass(playerTurn)

        }else{
            playerTurn = 1
            DisplayController.setActiveClass(playerTurn)
        }
    }

    const createPlayers = (p1,p2) =>{
        console.log(p1+"player")
        player1 = Player(p1,"x")
        player2 = Player(p2 ,"o")
    }


    return{
        init,
        createPlayers,
        getPlayerTurn,
        setPlayerTurn,
        gameOver,
        draw,
        getPlayerMode,
    }

})();

// const AI = (()=>{

//     const findBestMove = (board)=>{
//         let bestMove = null
//         board.forEach(element => {
//             if(move)
            
//         });
//     }

//     const getMove = ()=>{
//         let board = GameBoard.getBoard();
//         board.forEach((cell,index) => {
//             if(cell == ""){
//                 return index
                
//             }
            
//         });

//     }
//     return {
//         getMove,
//     }
// })();



GameFlow.init()




