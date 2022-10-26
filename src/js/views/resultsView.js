import View from './View';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'Nothing found by this query try another one';
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(item) {
    return `
    <li class="preview">
      <a class="preview__link preview__link--active" href="#${item.id}">
        <figure class="preview__fig">
          <img src="${item.image}" alt="${item.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${item.title}</h4>
          <p class="preview__publisher">${item.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>`;
  }
}

export default new ResultsView();
