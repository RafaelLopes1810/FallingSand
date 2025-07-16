function criaArray2D(coluna, linha){
    let array = new Array(coluna);
    for (let i = 0; i < array.length; i++) {
        array[i] = new Array(linha); 
    }
    return array;
}

let grid;
let tam = 10;
let coluna, linha;

function setup() {
    createCanvas(400, 400);
    coluna = width / tam;
    linha = height / tam;
    grid = criaArray2D(coluna, linha);

    for(let i = 0; i < coluna; i++){
        for(let j = 0; j < linha; j++){
            grid[i][j] = 0;
        }
    }
}

function draw(){
    background(0);

    for(let i = 0; i < coluna; i++){
        for(let j = 0; j < linha; j++){
            stroke(255);
            fill(grid[i][j] * 255);
            let x = i * tam;
            let y = j * tam;
            square(x, y, tam);
        }
    }
}