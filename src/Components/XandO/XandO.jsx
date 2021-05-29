import { Fragment } from "react";
import { useState, useEffect } from "react";
import style from "./XandO.css";
const COL = 3;
const ROW = 3;

const XandO = () => {
  const defaultArray = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const [startPlay, setStartPlay] = useState(false)
  const [winnerArray, setWinnerArray] = useState({ x: [], y: [] });
  const [counter, setCounter] = useState(0);
  const [winner, setWinner] = useState(0);
  const [twoDArray, set2DArray] = useState(defaultArray);
  const gridValue = twoDArray.map((cellArray, x) => {
    const rowVal = cellArray.map((cell, y) => {
      let classVal = style["cellStyle"];
      if (
        (winnerArray.x[y] === x && winnerArray.y[y] === y) ||
        (winnerArray.transsporsed &&
          winnerArray.x[x] === x &&
          winnerArray.y[x] === y)
      ) {
        classVal += " " + style["winningCells"];
      }
      return (
        <div className={classVal} onClick={() => playTurn(y, x)}>
          {cell}
        </div>
      );
    });
    return <div className={style["rowStyle"]}>{rowVal}</div>;
  });

  const playTurn = (y, x) => {
    if (!winner && startPlay) {
      const newArray = twoDArray.slice();
      let PlayerVal = "X";
      if (counter % 2 !== 0) {
        PlayerVal = "O";
      }
      let flag = false;
      if (!newArray[x][y]) {
        newArray[x][y] = PlayerVal;
        flag = isWinner(newArray);
        set2DArray(newArray);
        setCounter(counter + 1);
        if (flag) {
          console.log("Im Here");
          setWinner(PlayerVal);
          setWinnerArray(flag);
        }
      }
    }
  };
  const startGame = (bool) => {
    setStartPlay(bool)
  }

  const isWinner = (array) => {
    let flag = false;
    const transsporsedArray = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    const d1Array = [];
    const d2Array = [];
    let colcount = 0;
    array.forEach((rowVal, index) => {
      if (
        rowVal.every((val, i, arr) => {
          return val && val === arr[0];
        })
      ) {
        // flag = {type: 'row', index: index};
        flag = { y: [0, 1, 2], x: [index, index, index] };
      }
      rowVal.forEach((cv, i) => {
        transsporsedArray[i][colcount] = cv;
        if (index === i) {
          d1Array.push(cv);
        }
        if (index + i === 2) {
          d2Array.push(cv);
        }
      });
      colcount = colcount + 1;
    });
    transsporsedArray.forEach((Col, index) => {
      if (
        Col.every((val, i, arr) => {
          return val && val === arr[0];
        })
      ) {
        flag = { x: [0, 1, 2], y: [index, index, index], transsporsed: true };
      }
    });
    if (
      d1Array.length === 3 &&
      d1Array.every((val, i, arr) => {
        return val && val === arr[0];
      })
    ) {
      flag = { y: [0, 1, 2], x: [0, 1, 2] };
    }
    if (
      d2Array.length === 3 &&
      d2Array.every((val, i, arr) => {
        return val && val === arr[0];
      })
    ) {
      flag = { y: [0, 1, 2], x: [2, 1, 0] };
    }
    return flag;
  };
  const onReset = () => {
    set2DArray(defaultArray);
    setWinner(0);
    setWinnerArray({ x: [], y: [] });
    setCounter(0);
    setStartPlay(false);
  };
  return (
    <div className={style["gamespace"]}>
      <div className={style["gridspace"]}>{gridValue}</div>
      <PlayerTurn counter={counter} startPlay={startPlay} startGame={startGame} winner={winner}/>
      <ResetGame onReset={onReset} startPlay={startPlay} />
    </div>
  );
};
function ResetGame({onReset, startPlay}) {
    return startPlay?<div className={style["currentPlayer"]+ ' ' + style["pointer"]}  onClick={onReset}>Reset</div>:null
}
function StartGame({ startPlay, startGame }) {
    return !startPlay?<div className={style["currentPlayer"]+ ' ' + style["pointer"]} onClick={() => {
        startGame(true)
    }} >Start Game</div>: null;
}
function PlayerWinner({ winner }) {
  return <div className={style["currentPlayer"]} >{winner ? `${winner} is the winner` : null}</div>;
}
function PlayerTurn({ counter, startPlay, startGame, winner }) {
  if (counter === 9 || winner) {
    return (
    <Fragment>
        <div className={style["currentPlayer"]}>Game Over</div>
        <PlayerWinner winner={winner} />
    </Fragment>
    
    );
  }
  if(!startPlay){
      return <StartGame startPlay={startPlay} startGame={startGame} />
  }else{
    return (
        <div className={style["currentPlayer"]}>
          {counter % 2 === 0 ? "X" : "O"} is the current player
        </div>
      );
  }
  
}

export default XandO;
