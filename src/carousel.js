class Carousel{
  static id = 0;
  constructor(values, settings){
    // {dimension = 'X'}
    try{
      if((typeof (values)) === 'string'){
        this.values = this.parseValues(values);
      } else if((typeof (values)) === 'object'){
        this.values = values;
      }

      this.settings = {};

      this.settings.rootRefId = settings.rootRefId;
      this.settings.dimension = settings.dimension || 'X';
      this.settings.visibleItems = settings.visibleItems || 5;
      this.settings.activeItems = settings.activeItems || 3;
      this.settings.scrollSpeed = settings.scrollSpeed || 1000;
      this.settings.scrollPerClick = settings.scrollPerClick || 1;
      if(this.values.length === 0
        || this.settings.activeItems < 0
        || this.settings.visibleItems < 0
        || this.settings.scrollSpeed < 0
        || this.settings.scrollPerClick < 0){
        throw new Error('');
      }
      this.init();
    } catch (error) {
       console.log('Carousel creation is impossible with given attributes');
    }
  }

  init(){
    if(!this.settings.rootRefId){
      console.log(`No rootReference, can't draw element`);
    }
    this.carouselId = Carousel.id + 1;
    Carousel.id += 1;
    this.offset = 0;
    this.createSliderContainer();
    this.draw();
    this.drawButtons();
    this.addClickListeners();
    this.addSwipeListeners();
  }

  parseValues(values){
    try{
      const element = document.getElementById(values);
      const childDivs = Array.from(element.getElementsByTagName('div'));

      return childDivs.reduce((valuesArray,currentDiv) => {
        const picture = currentDiv.getElementsByTagName('img')[0].getAttribute('src');
        const title = currentDiv.getElementsByTagName('h3')[0].innerHTML;
        const description = currentDiv.getElementsByTagName('p')[0].innerHTML;
        return [...valuesArray,{picture,title,description}];
      },[])
    } catch(error) {
        console.log('We could not parse given template, try again');
        console.log(`${error.name} : ${error.message}`);
        throw error;
    }
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
        timerId = setTimeout(displayStep,timeToScroll)
      }, timeToScroll);
  }

  formatIndexWithOffset = (indexWithOffset) => indexWithOffset % this.values.length >= 0
    ? indexWithOffset % this.values.length
    : indexWithOffset % this.values.length + this.values.length;

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

  createSliderContainer(){
    const slider = document.createElement('div');
    slider.classList.add(`slider`);
    slider.classList.add(`slider${this.carouselId}`);
    if (this.settings.dimension === 'Y'){
      slider.classList.add(`slider-y`);
     } else {
      slider.classList.add(`slider-x`);
    }
    document.getElementById(this.settings.rootRefId).appendChild(slider);
  }

  draw(){
    const slider = document.querySelector(`.slider${this.carouselId}`);
    this.removeAllCarouselItems(slider);
     slider.insertAdjacentHTML('afterbegin', this.getAllElementsMarkup());
  }

  removeAllCarouselItems(slider){
    while (slider.childNodes.length > 1) {
      slider.removeChild(slider.firstChild);
    }
  }

  drawButtons(){
    this.instanceRef = document.querySelector(`.slider${this.carouselId}`);
    this.instanceRef.insertAdjacentHTML('beforeend', this.getButtonsMarkup());
  }

  addClickListeners(){
    this.instanceRef.querySelector(`.next`).addEventListener('click',this.scrollNext);
    this.instanceRef.querySelector(`.prev`).addEventListener('click',this.scrollPrevious);
  }

  addSwipeListeners = () => {
    this.instanceRef.addEventListener('touchstart', handleTouchStart, false);
    this.instanceRef.addEventListener('touchmove', handleTouchMove, false);

    let xDown = null;
    let yDown = null;

    function getTouches(evt) {
      return evt.touches ||             // browser API
             evt.originalEvent.touches; // jQuery
    }
    let obj = this;

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };

    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;

        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
              obj.scrollPrevious();
                /* left swipe */
            } else {
                /* right swipe */
              obj.scrollNext();
            }
        } else {
            if ( yDiff > 0 ) {
              obj.scrollPrevious();
                /* up swipe */
            } else {
              obj.scrollNext();
                /* down swipe */
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    };

  }
}

export { Carousel };
