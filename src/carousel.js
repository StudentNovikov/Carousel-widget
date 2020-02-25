class Carousel{
  static id = 0;
  constructor(values,settings){
    this.values = values;
    this.settings = settings;
    this.init();
    // this.instanceRef = document.querySelector(`.slider${this.carouselId}`);
    // this.instanceRef.querySelector(`.next`).addEventListener('click',this.scrollNext);
    // this.instanceRef.querySelector(`.prev`).addEventListener('click',this.scrollPrevious);
  }
  scrollNext = () => {
    this.offset -= 1;
    this.draw();
  }

  scrollPrevious = () => {
    this.offset += 1;
    this.draw();
  }

  formatIndexWithOffset = (indexWithOffset) => indexWithOffset % this.values.length >= 0
    ? indexWithOffset % this.values.length
    : indexWithOffset % this.values.length + this.values.length;

  init(){
    if(!this.settings.rootRefId){
      console.log(`No rootReference, can't draw element`);
    }
    this.carouselId = Carousel.id + 1;
    Carousel.id += 1;
    this.offset = 0;
    this.draw();
  }

  getAllElementsMarkup = () => this.values
  .reduce((elementsMarkup, element, index,valuesArray) => {
    return (index ===0 || index ===valuesArray.length - 1)
    ? elementsMarkup + `<div class="content">
      <img src="${valuesArray[this.formatIndexWithOffset(index + this.offset)].picture}" alt="">
      <h3>${valuesArray[this.formatIndexWithOffset(index + this.offset)].title}</h3>
      <p>${valuesArray[this.formatIndexWithOffset(index + this.offset)].description}</p>
    </div>`
    : elementsMarkup + `<div class="content active">
      <img src="${valuesArray[this.formatIndexWithOffset(index + this.offset)].picture}" alt="">
      <h3>${valuesArray[this.formatIndexWithOffset(index + this.offset)].title}</h3>
      <p>${valuesArray[this.formatIndexWithOffset(index + this.offset)].description}</p>
    </div>`;
    },'');

  getButtonsMarkup = () => `<div class="buttons">
    <button class="next">NEXT</button>
    <button class="prev">PREV</button>
  </div>`;

  draw(){
    const slider = document.createElement('div');
     slider.classList.add(`slider`);
     slider.classList.add(`slider${this.carouselId}`);
     slider.insertAdjacentHTML('afterbegin', this.getAllElementsMarkup());
     slider.insertAdjacentHTML('beforeend', this.getButtonsMarkup());
    document.getElementById(this.settings.rootRefId).innerHTML = '';
    document.getElementById(this.settings.rootRefId).appendChild(slider);

    this.instanceRef = document.querySelector(`.slider${this.carouselId}`);
    this.instanceRef.querySelector(`.next`).addEventListener('click',this.scrollNext);
    this.instanceRef.querySelector(`.prev`).addEventListener('click',this.scrollPrevious);
  }
}

export { Carousel };
