import React from "react";

/**
 * Shows current turn, win/draw message, or error.
 * @param {{message:string, error:boolean}} status
 */
// PUBLIC_INTERFACE
const COLORS = {
  primary: "#2563EB",
  error: "#EF4444",
  secondary: "#F59E0B",
  text: "#111827",
};
function StatusBar({ status }) {
  let color = COLORS.primary;
  if (status.error) color = COLORS.error;
  if (status.message && status.message.includes("win")) color = COLORS.secondary;
  if (status.message && status.message.includes("Draw")) color = COLORS.text;

  return (
    <div className="ttt-statusbar" aria-live="polite" style={{
      marginBottom: 20,
      minHeight: 32,
      color,
      fontWeight: 600,
      fontFamily: "inherit",
      fontSize: 20,
    }}>
      {status.message}
    </div>
  );
}
export default React.memo(StatusBar);
