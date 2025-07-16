function criaArray2D(coluna, linha){
    let array = new Array(coluna);
    for (let i = 0; i < array.length; i++) {
        array[i] = new Array(linha); 
        for(let j = 0; j < array[i].length; j++){
            array[i][j] = 0;
        }
    }
    return array;
}

let grid;
let tam = 10;
let coluna, linha;

let hueValue = 200;

function setup() {
    createCanvas(800, 800);
    colorMode(HSB, 360, 255, 255);
    coluna = width / tam;
    linha = height / tam;
    grid = criaArray2D(coluna, linha);

    for(let i = 0; i < coluna; i++){
        for(let j = 0; j < linha; j++){
            grid[i][j] = 0;
        }
    }
}

function mouseDragged(){
    let mouseCol = floor(mouseX / tam);
    let mouseLin = floor(mouseY / tam);

    let tamanho = 5;
    let extencao = floor(tamanho/2);
    for(let i = -extencao; i <= extencao; i++){
        for(let j = -extencao; j <= extencao; j++){
            if(random(1) < 0.75){
                let col = mouseCol + i;
                let lin = mouseLin + j;
                if(col >= 0 && col <= coluna - 1 && lin >= 0 && lin <= linha-1){ // Verifica se o mouse está dentro do Canvas
                    grid[col][lin] = hueValue;
                }
            }
        }
    }
    hueValue += 0.5;
    if(hueValue > 360){
        hueValue = 1;
    }
}

function draw(){
    background(0);
    for(let i = 0; i < coluna; i++){
        for(let j = 0; j < linha; j++){
            noStroke();
            if(grid[i][j] > 0){
                fill(grid[i][j], 255, 255);
                let x = i * tam;
                let y = j * tam;
                square(x, y, tam);
            }
        }
    }
    
    let proxGrid = criaArray2D(coluna, linha);
    for(let i = 0; i < coluna; i++){
            for(let j = 0; j < linha; j++){
                let valor = grid[i][j];
                if(valor > 0){
                    let embaixo = grid[i][j+1];

                    let dir = random([-1, 1]); // Número entre -1 e 1 para a areia ir aleatoriamente pra direita ou esquerda caso já tenha areia embaixo
                    let baixoA, baixoB;
                    if(i + dir >= 0 && i + dir <= coluna - 1){
                        baixoA = grid[i+dir][j+1];
                    }
                    if(i - dir >= 0 && i - dir <= coluna - 1){
                        baixoB = grid[i-dir][j+1];
                    }

                    if(embaixo === 0){
                        proxGrid[i][j+1] = grid[i][j];
                    } else if(baixoA === 0){
                        proxGrid[i+dir][j+1] = grid[i][j];
                    } else if(baixoB === 0){
                        proxGrid[i-dir][j+1] = grid[i][j];
                    } else {
                        proxGrid[i][j] = grid[i][j];
                    }
                }
            }
        }
    grid = proxGrid;
}

function resetaGrid(){
    for (let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++){
            grid[i][j] = 0;
        }
    }
}