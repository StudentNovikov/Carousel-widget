class Carousel{
  static id = 0;
  constructor(values,settings){
    this.values = values;
    this.settings = settings;
    this.init();
    this.instanceRef = document.querySelector(`.carousel${this.carouselId}`);
    this.instanceRef.querySelector(`.slide-btn-next`).addEventListener('click',this.scrollNext);
    this.instanceRef.querySelector(`.slide-btn-prev`).addEventListener('click',this.scrollPrevious);
  }
  scrollNext(){
    console.log('Scrolling to the next element');
  }

  scrollPrevious(){
    console.log('Scrolling to the previos element');
  }

  init(){
    if(!this.settings.rootRefId){
      console.log(`No rootReference, can't draw element`);
    }
    this.carouselId =Carousel.id + 1;
    Carousel.id += 1;
    this.draw();
  }
  draw(){
    const container = document.createElement('div');
    container.classList.add(`carousel${this.carouselId}`);
    container.classList.add(`carousel-container`);

    const gridContainer = document.createElement('div');
    gridContainer.classList.add(`carousel-inner`);
    gridContainer.innerHTML = 'some temp text just to see this div';
    
    const buttonPrev = document.createElement('button');
    buttonPrev.innerHTML = 'PREVIOUS';
    buttonPrev.classList.add('btn','slide-btn-prev');

    container.appendChild(buttonPrev);
    container.appendChild(gridContainer);



    const buttonNext = document.createElement('button');
    buttonNext.innerHTML = 'NEXT';
    buttonNext.classList.add('btn','slide-btn-next');

    container.appendChild(buttonNext);
    document.getElementById(this.settings.rootRefId).appendChild(container);
  }
}

export { Carousel };