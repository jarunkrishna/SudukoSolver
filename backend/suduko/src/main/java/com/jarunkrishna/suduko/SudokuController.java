package com.jarunkrishna.suduko;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sudoku")
@CrossOrigin(origins = "http://localhost:3000")
public class SudokuController {

    private final SudokuSolver sudokuSolver = new SudokuSolver();

    @PostMapping("/solve")
    public int[][] solveSudoku(@RequestBody int[][] board) {
        if (sudokuSolver.solveSudoku(board)) {
            return board;
        } else {
            throw new IllegalArgumentException("No solution exists for the given Sudoku puzzle");
        }
    }
}
