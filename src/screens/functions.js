const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row: row,  //ou so row
                column: column, //ou so column
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0,

            }
        })
    })
     
}



const fields = board => [].concat(...board)


export { 
    createMinedBoard,
}