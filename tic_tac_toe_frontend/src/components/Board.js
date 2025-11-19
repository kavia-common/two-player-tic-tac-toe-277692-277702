import React from "react";

/**
 * The main 3x3 game grid, ARIA-compliant and fully keyboard accessible.
 * @param {function} renderCell - returns <Cell ... /> for a given index
 */
 // PUBLIC_INTERFACE
function Board({ renderCell }) {
  return (
    <div
      className="ttt-board"
      role="grid"
      aria-label="tic tac toe grid"
      aria-rowcount={3}
      aria-colcount={3}
      tabIndex={0}
    >
      {Array.from({ length: 9 }).map((_, i) => renderCell(i))}
    </div>
  );
}
export default React.memo(Board);
