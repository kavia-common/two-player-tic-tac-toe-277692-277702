import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// PUBLIC_INTERFACE
describe('Tic Tac Toe App', () => {
  it('renders the game board', () => {
    render(<App />);
    expect(screen.getByLabelText(/tic tac toe grid/i)).toBeInTheDocument();
    expect(screen.getAllByRole('gridcell')).toHaveLength(9);
  });

  it("shows 'Player X's turn' at start", () => {
    render(<App />);
    expect(screen.getByText(/player x's turn/i)).toBeInTheDocument();
  });

  it('can make a move and updates status', () => {
    render(<App />);
    const cells = screen.getAllByRole('gridcell');
    fireEvent.click(cells[0]);
    expect(cells[0].textContent).toBe('X');
    expect(screen.getByText(/player o's turn/i)).toBeInTheDocument();
  });

  it('should not allow move on an occupied cell', () => {
    render(<App />);
    const cells = screen.getAllByRole('gridcell');
    fireEvent.click(cells[0]);
    // Try to click again
    fireEvent.click(cells[0]);
    // Value remains 'X'
    expect(cells[0].textContent).toBe('X');
  });

  it('can detect a win', () => {
    render(<App />);
    const cells = screen.getAllByRole('gridcell');
    // X moves: 0,1,2 (row win)
    fireEvent.click(cells[0]);
    fireEvent.click(cells[3]);
    fireEvent.click(cells[1]);
    fireEvent.click(cells[4]);
    fireEvent.click(cells[2]);
    expect(screen.getByText(/wins/i)).toBeInTheDocument();
  });

  it('can detect a draw', () => {
    render(<App />);
    const moves = [0,1,2,4,3,5,7,6,8]; // Results in a draw
    const cells = screen.getAllByRole('gridcell');
    moves.forEach((cellIdx, idx) => {
      fireEvent.click(cells[cellIdx]);
    });
    expect(screen.getByText(/draw/i)).toBeInTheDocument();
  });

  it('reset button resets the board', () => {
    render(<App />);
    const cells = screen.getAllByRole('gridcell');
    fireEvent.click(cells[0]);
    fireEvent.click(cells[1]);
    fireEvent.click(cells[2]);
    // Click reset
    const btn = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(btn);
    expect(cells[0].textContent).toBe("");
    expect(screen.getByText(/player x's turn/i)).toBeInTheDocument();
  });

  it('should allow keyboard navigation and Enter activation', () => {
    render(<App />);
    const cells = screen.getAllByRole('gridcell');
    cells[0].focus();
    fireEvent.keyDown(cells[0], { key: "Enter" });
    expect(cells[0].textContent).toBe('X');
    // Test arrow navigation (Right to cell 1, then Enter)
    fireEvent.keyDown(cells[0], { key: "ArrowRight" });
    expect(document.activeElement).toBe(cells[1]);
    fireEvent.keyDown(cells[1], { key: " " });
    expect(cells[1].textContent).toBe('O');
  });

  // TODO: Add further tests for accessibility attributes, edge cases, error handling as needed.
});
