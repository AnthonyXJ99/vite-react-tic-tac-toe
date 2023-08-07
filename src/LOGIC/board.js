import { WINNER_COMBO } from "../constants"

export const checkWinnerFrom= (checkBoard)=>{
    for (const combo of WINNER_COMBO){
      const [a,b,c]= combo
      if(checkBoard[a] && checkBoard[a] === checkBoard[b] && checkBoard[a]===checkBoard[c]){
        return checkBoard[a]
      }
    }
   
  }