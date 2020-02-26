class Carousel{
  static id = 0;
  constructor(values,settings){
    this.values = values;
    this.settings = {};

    this.settings.rootRefId = settings.rootRefId;
    this.settings.dimension = settings.dimension || 'X';
    this.settings.visibleItems = settings.visibleItems || 5;
    this.settings.activeItems = settings.activeItems || 3;
    this.settings.scrollSpeed = settings.scrollSpeed || 1000;
    this.settings.scrollPerClick = settings.scrollPerClick || 1;
    this.init();
  }

  disableButtons = () => {
    this.instanceRef.querySelector(`.next`).disabled = true;
    this.instanceRef.querySelector(`.prev`).disabled = true;
  }

  enableButtons = () => {
    this.instanceRef.querySelector(`.next`).disabled = false;
    this.instanceRef.querySelector(`.prev`).disabled = false;
  }

  scrollNext = () => {
      this.disableButtons();
      const timeToScroll = this.settings.scrollSpeed / this.settings.scrollPerClick;
      let scrollCount = 0;
      let obj = this;
      let timerId = setTimeout(function displayStep(){
        if(scrollCount === obj.settings.scrollPerClick){
          obj.enableButtons();
          return;
        }
        scrollCount += 1;
        obj.offset -= 1;
        obj.draw();
        obj.disableButtons();
        timerId = setTimeout(displayStep,timeToScroll)
      }, timeToScroll);
  }

  scrollPrevious = () => {
      this.disableButtons();
      const timeToScroll = this.settings.scrollSpeed / this.settings.scrollPerClick;
      let scrollCount = 0;
      let obj = this;
      let timerId = setTimeout(function displayStep(){
        if(scrollCount === obj.settings.scrollPerClick){
          obj.enableButtons();
          return;
        }
        scrollCount += 1;
        obj.offset += 1;
        obj.draw();
        obj.disableButtons();
        timerId = setTimeout(displayStep,timeToScroll)
      }, timeToScroll);
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

  isIndexItemActive = (index) => {
   const lastLowInactive = (this.settings.visibleItems - this.settings.activeItems) / 2 - 1;
   const firstHighInactive = (this.settings.visibleItems - (this.settings.visibleItems - this.settings.activeItems) / 2);
   return ((index > lastLowInactive) && (index < firstHighInactive));
  }

  getAllElementsMarkup = () => this.values
  .reduce((elementsMarkup, element, index,valuesArray) => {
    if(index<this.settings.visibleItems){
    return (this.isIndexItemActive(index))
    ? elementsMarkup + `<div class="content active">
      <img src="${valuesArray[this.formatIndexWithOffset(index + this.offset)].picture}" alt="">
      <h3>${valuesArray[this.formatIndexWithOffset(index + this.offset)].title}</h3>
      <p>${valuesArray[this.formatIndexWithOffset(index + this.offset)].description}</p>
    </div>`
    : elementsMarkup + `<div class="content">
      <img src="${valuesArray[this.formatIndexWithOffset(index + this.offset)].picture}" alt="">
      <h3>${valuesArray[this.formatIndexWithOffset(index + this.offset)].title}</h3>
      <p>${valuesArray[this.formatIndexWithOffset(index + this.offset)].description}</p>
    </div>`;
    } else
    return elementsMarkup
  },'');

  getButtonsMarkup = () => `<div class="buttons">
    <button class="next">NEXT</button>
    <button class="prev">PREV</button>
  </div>`;

  draw(){
    const slider = document.createElement('div');
     slider.classList.add(`slider`);
     slider.classList.add(`slider${this.carouselId}`);
     if (this.settings.dimension === 'Y'){
      slider.classList.add(`slider-y`);
     } else {
      slider.classList.add(`slider-x`);
     }
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
