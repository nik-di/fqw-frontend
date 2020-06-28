import './preloader.css';
import '../../images/not-found_v1.svg';

export default class Preloader {
  constructor(preloaderContainer) {
    this.preloaderContainer = preloaderContainer;
    this.preloaderContainerClassname = this.preloaderContainer.classList[0];
  }

  _preloaderContainerShow() {
    this.preloaderContainer.classList.add(`${this.preloaderContainerClassname}_visible`);
  }

  showPreloader(preloaderType) {
    const circle = (`<div class="circle-preloader">
      <div class="circle-preloader__circle"></div>
      <p class="circle-preloader__text">Идёт поиск новостей...</p>
    </div>`);
    const error = (`<div class="preloader-nothing">
        <h3 class="preloader-nothing__title">Во время запроса произошла ошибка.</h3>
        <p class="preloader-nothing__subtitle">Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</p>
    </div>`);
    const nothing = (`<div class="preloader-nothing">
        <picture>
          <source srcset="images/not-found_v1.svg">
          <img class="preloader-nothing__img" src="images/not-found_v1.svg"
          alt="Грустный смайл">
        </picture>
        <h3 class="preloader-nothing__title">Ничего не найдено</h3>
        <p class="preloader-nothing__subtitle">К сожалению по вашему запросу ничего не найдено.</p>
    </div>`);
    switch (preloaderType) {
      case 'circle':
        this.preloaderContainer.insertAdjacentHTML('beforeend', circle);
        break;
      case 'nothing':
        this.preloaderContainer.insertAdjacentHTML('beforeend', nothing);
        break;
      case 'error':
        this.preloaderContainer.insertAdjacentHTML('beforeend', error);
        break;
    }
    this._preloaderContainerShow();
  }

  preloaderClose() {
    const parentNode = this.preloaderContainer;
    while (parentNode.firstElementChild) {
      parentNode.removeNode(parentNode.firstElementChild);
    }
    parentNode.classList.remove(`${this.preloaderContainerClassname}_visible`);
  }
}