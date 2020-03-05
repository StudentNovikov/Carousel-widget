let index = 0;
let amount = 0;// amount of images
const currTransl = [];
let translationComplete = true;

const transitionCompleted = () => {
  translationComplete = true;
};

document.addEventListener('DOMContentLoaded', () => {
  amount = document.querySelector('.activeContainer').querySelectorAll('.item').length;
  for (let i = 0; i < amount; i += 1) {
    currTransl[i] = 0;
    document.querySelector('.activeContainer').querySelectorAll('.item')[i]
      .addEventListener('transitionend', transitionCompleted, true);
  }
});

function right() {
  if (translationComplete === true) {
    translationComplete = false;
    index -= 1;
    if (index === -1) {
      index = amount - 1;
    }
    const outerIndex = (index) % amount;
    for (let i = 0; i < amount; i += 1) {
      const item = document.querySelector('.activeContainer').getElementsByClassName('item')[i];
      item.style.opacity = '1';
      item.style.transform = `translate(${currTransl[i] + 200}px)`;
      currTransl[i] += 200;
    }
    const outerItem = document.getElementsByClassName('item')[outerIndex];
    outerItem.style.transform = `translate(${currTransl[outerIndex] - 200 * (amount)}px)`;
    outerItem.style.opacity = '0';
    currTransl[outerIndex] -= 200 * (amount);
  }
}

function left() {
  if (translationComplete === true) {
    translationComplete = false;
    index += 1;
    const outerIndex = (index - 1) % amount;
    for (let i = 0; i < amount; i += 1) {
      const item = document.querySelector('.activeContainer').getElementsByClassName('item')[i];
      item.style.opacity = '1';
      item.style.transform = `translate(${currTransl[i] - 200}px)`;
      currTransl[i] -= 200;
    }
    const outerItem = document.getElementsByClassName('item')[outerIndex];
    outerItem.style.opacity = '0';
    outerItem.style.transform = `translate(${currTransl[outerIndex] + 200 * (amount)}px)`;
    currTransl[outerIndex] += 200 * (amount);
  }
}

document.getElementById('nextSmooth').addEventListener('click', () => right());
document.getElementById('prevSmooth').addEventListener('click', () => left());
