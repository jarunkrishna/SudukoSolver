import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [board, setBoard] = useState(Array(9).fill("").map(() => Array(9).fill("")));
    const [solution, setSolution] = useState([]);

    const handleChange = (row, col, value) => {
        const newBoard = [...board];
        newBoard[row][col] = value;
        setBoard(newBoard);
    };

    const solveSudoku = () => {
        const formattedBoard = board.map(row => row.map(cell => cell === "" ? 0 : parseInt(cell)));
        fetch('http://localhost:8080/api/sudoku/solve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedBoard)
        })
        .then(response => response.json())
        .then(data => setSolution(data))
        .catch(error => alert("No solution exists for the given Sudoku puzzle"));
    };

    return (
        <div className="App">
            <h1>Sudoku Solver</h1>
            <table>
                <tbody>
                    {board.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex}>
                                    <input
                                        type="text"
                                        value={cell}
                                        maxLength="1"
                                        onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={solveSudoku}>Solve</button>
            {solution.length > 0 && (
                <div>
                    <h2>Solution:</h2>
                    <table>
                        <tbody>
                            {solution.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, colIndex) => (
                                        <td key={colIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default App;
