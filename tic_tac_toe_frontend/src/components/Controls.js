import React from "react";

/**
 * Contains the reset button and possibly additional controls in the future.
 * @param {function} onReset
 * @param {boolean} gameOver
 * @param {object} resetBtnRef
 */
// PUBLIC_INTERFACE
const COLORS = {
  primary: "#2563EB",
};

function Controls({ onReset, gameOver, resetBtnRef }) {
  return (
    <div className="ttt-controls" style={{ margin: "20px 0" }}>
      <button
        ref={resetBtnRef}
        className="ttt-btn-reset"
        type="button"
        aria-label="Reset game"
        onClick={onReset}
        style={{
          background: COLORS.primary,
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "10px 36px",
          fontSize: 18,
          fontWeight: 700,
          marginRight: 10,
          boxShadow: "0 1px 8px #2563eb30",
          cursor: "pointer",
          outline: "none"
        }}
        tabIndex={0}
      >
        {gameOver ? "Restart" : "Reset"}
      </button>
    </div>
  );
}
export default React.memo(Controls);
