import React from "react";

/**
 * Represents a single cell (square) in the game grid. Accessible and stylized.
 * @param {number} index
 * @param {string} value
 * @param {function} onSelect
 * @param {boolean} disabled
 * @param {boolean} isWinning
 * @param {function} cellRef
 * @param {function} onKeyDown
 */
// PUBLIC_INTERFACE
const COLORS = {
  secondary: "#F59E0B",
};
const Cell = React.memo(function Cell({
  index,
  value,
  onSelect,
  disabled,
  isWinning,
  cellRef,
  onKeyDown,
}) {
  return (
    <button
      ref={cellRef}
      type="button"
      className={`ttt-cell${isWinning ? " ttt-cell-win" : ""}`}
      aria-label={value ? `Cell ${index + 1}, ${value}` : `Cell ${index + 1}, empty`}
      aria-selected={!!value}
      aria-disabled={disabled}
      role="gridcell"
      tabIndex={0}
      onClick={() => onSelect(index)}
      onKeyDown={(e) => onKeyDown(e, index)}
      style={isWinning
        ? { borderColor: COLORS.secondary, background: "#fffbe8" }
        : undefined
      }
      data-index={index}
    >
      <span className="cell-content" aria-live="polite">
        {value}
      </span>
    </button>
  );
});

export default Cell;
