const bird = document.querySelector('.bird');
const pipeUpElements = document.querySelectorAll('.pipeUp');
const pipeDownElements = document.querySelectorAll('.pipeDown');
const menu = document.querySelector('.menu');

const collision = {
  value: false,

  check() {
    const birdRect = bird.getBoundingClientRect();

    pipeUpElements.forEach((pipeUpElement) => {
      const pipeUpRect = pipeUpElement.getBoundingClientRect();
      if (
        birdRect.right > pipeUpRect.left &&
        birdRect.left < pipeUpRect.right &&
        birdRect.bottom > pipeUpRect.top &&
        birdRect.top < pipeUpRect.bottom
      ) {
        console.log('Bird collided with pipeUp!');
        this.value = true;
      }
    });

    pipeDownElements.forEach((pipeDownElement) => {
      const pipeDownRect = pipeDownElement.getBoundingClientRect();
      if (
        birdRect.right > pipeDownRect.left &&
        birdRect.left < pipeDownRect.right &&
        birdRect.bottom > pipeDownRect.top &&
        birdRect.top < pipeDownRect.bottom
      ) {
        this.value = true;
        console.log('Bird collided with pipeDown!');
      }
    });

    if (this.value) {
      menu.style.display = 'block';
    } else {
      menu.style.display = 'none';
    }
  },
  resetState() {
    this.value = false;
  },
};

export default collision;
