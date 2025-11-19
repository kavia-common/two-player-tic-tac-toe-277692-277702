import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import Board from "./components/Board";
import Cell from "./components/Cell";
import StatusBar from "./components/StatusBar";
import Controls from "./components/Controls";
import logger from "./components/logger";
import calculateWinner from "./components/calculateWinner";

const COLORS = {
  primary: "#2563EB",
  secondary: "#F59E0B",
  error: "#EF4444",
  gradient: "linear-gradient(135deg, #2563eb1a, #f9fafb 100%)",
  background: "#f9fafb",
  surface: "#ffffff",
  text: "#111827",
};

const initialBoard = Array(9).fill(null);

// PUBLIC_INTERFACE
function App() {
  // State
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState({ message: "Player X's turn", error: false });
  const [gameOver, setGameOver] = useState(false);
  const [winnerLine, setWinnerLine] = useState([]);
  // For keyboard navigation
  const cellRefs = useRef(Array(9).fill(null));
  // For dynamic focus on game reset
  const resetBtnRef = useRef(null);

  // On game state update, check for win/draw
  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setStatus({
        message: `Player ${result.winner} wins!`,
        error: false,
      });
      setGameOver(true);
      setWinnerLine(result.line);
      logger("[Game] Winner:", result.winner, "Line:", result.line);
    } else if (board.every((cell) => cell)) {
      setStatus({ message: "Draw!", error: false });
      setGameOver(true);
      setWinnerLine([]);
      logger("[Game] Draw");
    } else {
      setStatus({
        message: `Player ${isXNext ? "X" : "O"}'s turn`,
        error: false,
      });
      setGameOver(false);
      setWinnerLine([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  // Reset board
  const handleReset = useCallback(() => {
    setBoard(initialBoard);
    setIsXNext(true);
    setStatus({ message: "Player X's turn", error: false });
    setGameOver(false);
    setWinnerLine([]);
    // Return focus to first cell for accessibility
    if (cellRefs.current[0]) cellRefs.current[0].focus();
    logger("[Game] Reset board");
  }, []);

  // Handle cell click or keyboard activation
  const handleCellSelect = useCallback(
    (index) => {
      if (gameOver || board[index]) {
        logger("[Move] Invalid move at:", index, "gameOver:", gameOver);
        return;
      }
      const nextBoard = [...board];
      nextBoard[index] = isXNext ? "X" : "O";
      setBoard(nextBoard);
      setIsXNext((prev) => !prev);
      logger("[Move] Player", (isXNext ? "X" : "O"), "at", index);
    },
    [board, gameOver, isXNext]
  );

  // For keyboard navigation (arrow/focus)
  const handleCellKeyDown = useCallback((e, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (row > 0) {
          e.preventDefault();
          cellRefs.current[index - 3]?.focus();
        } break;
      case 'ArrowDown':
      case 's':
      case 'S':
        if (row < 2) {
          e.preventDefault();
          cellRefs.current[index + 3]?.focus();
        } break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (col > 0) {
          e.preventDefault();
          cellRefs.current[index - 1]?.focus();
        } break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (col < 2) {
          e.preventDefault();
          cellRefs.current[index + 1]?.focus();
        } break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        // Simulate click
        handleCellSelect(index);
        break;
      default:
        break;
    }
  }, [handleCellSelect]);

  // Memoize cell rendering for perf
  const renderCell = useCallback(
    (i) => (
      <Cell
        key={i}
        index={i}
        value={board[i]}
        onSelect={handleCellSelect}
        disabled={gameOver || !!board[i]}
        isWinning={winnerLine.includes(i)}
        cellRef={(el) => (cellRefs.current[i] = el)}
        onKeyDown={handleCellKeyDown}
      />
    ),
    [board, gameOver, winnerLine, handleCellSelect, handleCellKeyDown]
  );

  // THEME SWITCH (Ocean Professional theme only)
  useEffect(() => {
    document.body.style.background = COLORS.background;
    document.body.style.color = COLORS.text;
  }, []);

  return (
    <div className="App" style={{ minHeight: "100vh", background: COLORS.background }}>
      <main>
        <h1
          style={{
            color: COLORS.primary,
            marginTop: 40,
            letterSpacing: "1px",
            fontWeight: 700,
            textShadow: "0 3px 12px #2563eb22",
          }}
        >
          Tic Tac Toe
        </h1>
        <section className="game-section" aria-label="Tic Tac Toe game">
          <StatusBar status={status} />
          <Board renderCell={renderCell} />
          <Controls
            onReset={handleReset}
            gameOver={gameOver}
            resetBtnRef={resetBtnRef}
          />
        </section>
      </main>
      <footer style={{
        marginTop: "3rem",
        color: COLORS.primary,
        opacity: 0.9,
        fontSize: 14,
        textAlign: "center",
      }} aria-label="footer">
        <span>Ocean Professional Theme — Kavia Playground Demo</span>
      </footer>
    </div>
  );
}

export default App;
