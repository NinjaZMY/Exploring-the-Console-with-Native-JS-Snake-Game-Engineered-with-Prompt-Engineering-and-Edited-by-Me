"snake game using prompt engineering ";

// set up the game variables
let snake = [{ x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) }];
let direction = 'right';
let food = { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) };
let score = 0;

// display the initial game board
displayBoard();

// game loop
let gameRunning = true;
while (gameRunning) {
  // move the snake
  let newHead = { x: snake[0].x, y: snake[0].y };
  let directions = ['up', 'down', 'left', 'right'];
  let randomIndex = Math.floor(Math.random() * directions.length);
  let newDirection = directions[randomIndex];
  switch (newDirection) {
    case 'up':
      newHead.y--;
      break;
    case 'down':
      newHead.y++;
      break;
    case 'left':
      newHead.x--;
      break;
    case 'right':
      newHead.x++;
      break;
  }
  snake.unshift(newHead);
  direction = newDirection;

  // check if the snake hit a wall or itself
  if (newHead.x < 0 || newHead.x >= 10 || newHead.y < 0 || newHead.y >= 10) {
    gameRunning = false;
  } else {
    for (let i = 1; i < snake.length; i++) {
      if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
        gameRunning = false;
        break;
      }
    }
  }

  // check if the snake ate the food
  if (newHead.x === food.x && newHead.y === food.y) {
    food.x = Math.floor(Math.random() * 10);
    food.y = Math.floor(Math.random() * 10);
    score++;
  } else {
    snake.pop();
  }

  // display the updated game board
  displayBoard();

  // wait for a moment before continuing the loop
  wait(500);
}

// game over
console.log('Game Over! Score:', score);

// display the game board
function displayBoard() {
  console.clear();
  let board = '';
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      let char = '-';
      if (x === food.x && y === food.y) {
        char = 'o';
      }
      for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === x && snake[i].y === y) {
          char = 'x';
        }
      }
      board += char;
    }
    board += '\n';
  }
  console.log(board);
}

// wait for a specified number of milliseconds
function wait(ms) {
  let start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

