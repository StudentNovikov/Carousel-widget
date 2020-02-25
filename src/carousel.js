class Carousel{
  static id = 0;
  constructor(values,settings){
    this.values = values;
    this.settings = settings;
    this.init();
    this.instanceRef = document.querySelector(`.slider${this.carouselId}`);
    this.instanceRef.querySelector(`.next`).addEventListener('click',this.scrollNext);
    this.instanceRef.querySelector(`.prev`).addEventListener('click',this.scrollPrevious);
  }
  scrollNext = () => {
    console.log(`Scrolling to the next element, carousel: ${this.carouselId}`);
  }

  scrollPrevious = () => {
    console.log(`Scrolling to the next element, carousel: ${this.carouselId}`);
  }

  init(){
    if(!this.settings.rootRefId){
      console.log(`No rootReference, can't draw element`);
    }
    this.carouselId = Carousel.id + 1;
    Carousel.id += 1;
    this.draw();
  }
  draw(){
    const slider = document.createElement('div');
     slider.classList.add(`slider`);
     slider.classList.add(`slider${this.carouselId}`);
     slider.insertAdjacentHTML('afterbegin',`<div class="content">
        <img src="https://placekitten.com/210/210" alt="">
        <h3>title1</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, architecto!</p>
      </div>
      <div class="content active">
        <img src="https://placekitten.com/200/200" alt="">
        <h3>title2</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, architecto!</p>
      </div>
      <div class="content active">
        <img src="http://placebear.com/200/200" alt="">
        <h3>title3</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, architecto!</p>
      </div>
      <div class="content active">
        <img src="http://placebear.com/210/210" alt="">
        <h3>title4</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, architecto!</p>
      </div>
      <div class="content">
        <img src="http://placebear.com/205/205" alt="">
        <h3>title5</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, architecto!</p>
      </div>
      <div class="buttons">
        <button class="next">NEXT</button>
        <button class="prev">PREV</button>
      </div>
    </div>`);
    document.getElementById(this.settings.rootRefId).appendChild(slider);
  }
}

export { Carousel };
