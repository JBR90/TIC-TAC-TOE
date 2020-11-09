const GameBoard = (()=>{
    'use strick'

    let board = [
                 "","","",    // 0,1,2
                 "","","",    // 3,4,5
                 "","","",    // 6,7,8
                ]
                

    const getBoard = () =>{
        return board;
    }

    const updateBoard = (index,player) =>{
        board[index] = player;
        DisplayController.updateBoard(board)
    }

    return {
        getBoard,
        updateBoard,
    }
})();


const GameFlow = (()=>{

    // States
    let playerTurn = 1;
    const winner = false
  

    const getPlayersShowBoard = () =>{
        DisplayController.showPlayerForm()
    }

    const playGame = () =>{
        console.log("playing")
    if(winner == false)
        if(playerTurn == 1){
            player1.getMark(player1.sym)
            playerTurn = 2
        }else{
            player2.getMark(player2.sym)
            playerTurn = 1
        }

    }

 
    
    const createPlayers = (p1,p2) =>{
        player1 = {...Player(p1),...{sym:"x"}}
        player2 = {...Player(p2),...{sym:"o"}}
    
    }
    return{
        getPlayersShowBoard, 
        createPlayers,
        playGame,
    

    }
})();





// gameFlow object = module



const DisplayController = (()=>{
    'use strick'
    const boardContainer = document.querySelector('#board-container');
    const btnStartGame = document.querySelector('#btn-start-game');
    const playerForm = document.getElementById('form-container');
    const btnSubmitPlayers = document.querySelector('#btn-submit-players');


    const clearBoard = ()=>{
        while (boardContainer.firstChild) {
            boardContainer.removeChild(boardContainer.lastChild);
        }
    }

    const updateBoard = (board)=>{
        clearBoard()
        board.forEach((element,index) => {
            let cell = document.createElement('div');  
            cell.classList.add('cell')
            cell.dataset.index = index;
            cell.textContent = board[index]
            boardContainer.appendChild(cell);
        });
    }

    const showStartBtn = ()=>{
        btnStartGame.addEventListener('click', () => {
            btnStartGame.style.display = "none";
            playerForm.style.display = "flex"
            return true
        })
    }
    

    const showPlayerForm = ()=>{
        showStartBtn()
        btnSubmitPlayers.addEventListener('click', () => {
            btnSubmitPlayers.style.display = "none";
            playerForm.style.display = "none"
            btnStartGame.style.display = "none";
            const player1Name = document.getElementById('player1').value;
            const player2Name = document.getElementById('player1').value;
            GameFlow.createPlayers(player1Name,player2Name)
            DisplayController.updateBoard(GameBoard.getBoard())
            GameFlow.playGame()

            


        })


};
    

    return{
        updateBoard,
        clearBoard,
        showPlayerForm,
        
    }
})();


const Player = (name)=>{

    const wrapper = document.getElementById('board-container');


    const getName = () => name;

     const getMark = (sym) =>{
   
        wrapper.addEventListener('click', function _listener(event) {
        let index = event.target.dataset.index;
        console.log(index)
        GameBoard.updateBoard(index,sym)
        wrapper.removeEventListener('click',_listener);
        });
        GameFlow.playGame()
    }

    return{getName,getMark}
};   

//     const getMark = (sym) =>{
   
//         wrapper.addEventListener('click', function _listener(event) {
//         let index = event.target.dataset.index;
//         console.log(index)
//         GameBoard.updateBoard(index,sym)
//         wrapper.removeEventListener('click',_listener);
//         });
//         GameFlow.playGame()
//     }

//     return{getName,getMark}
// };

// const wrapper = document.getElementById('board-container');
// wrapper.addEventListener('click', (event) => {
// let index = event.target.dataset.index;
// console.log(index)
// })



// DisplayController.updateDisplay(GameBoard.publicBoard())
// const player1 = Player('jim')
// console.log(player1.getName())
// console.log(player1.getMark())

GameFlow.getPlayersShowBoard()



