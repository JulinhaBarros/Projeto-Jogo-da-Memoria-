const grid = document.querySelector('.grid');
const player = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'browser',
  'cog maeeom',
  'cogumelo vermelho',
  'flor de fogo',
  'flor de gelo',
  'luigi',
  'mario',
  'peach',
  'tartaruga',
  'toad',
  'yoshi',
  'estrela',
];

const createElement = (tag, classe) => {
  const element = document.createElement(tag);
  element.className = classe;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if(disabledCards.length === 24) {
    clearInterval(this.loop);
    i = true;
    setTimeout(() => {
      alert(`Parabéns, ${player.innerHTML} você venceu!!\nSeu tempo foi de ${timer.innerHTML} segundos!!`);
    }, 500);
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if(firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';
    }, 500);
  }
}

const revealCard = ({ target }) => {
  if(target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if(firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if(secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();
  }
}


const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.setAttribute('data-character', character);

  card.addEventListener('click', revealCard);

  return card;
}

const createGame = () => {
  const duplicateCharacters = [ ...characters, ...characters];
  const shuffleArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffleArray.forEach((character) => {
    const card = createCard(character);

    grid.appendChild(card);
  });
}

const startTimer = () => {
  this.loop = setInterval(() => {
    const time = +timer.innerHTML;
    timer.innerHTML = time + 1;
  }, 1000);
}

window.onload = () => {
  player.innerHTML = localStorage.getItem('player');
  startTimer();
  createGame();
}