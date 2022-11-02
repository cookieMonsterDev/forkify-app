import View from './View';
import previewView from './previewView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'Nothing found by this query try another one';
  _message = '';

  _generateMarkup() {
    return this._data.map(res => previewView.render(res, false)).join('');
  }
}

export default new ResultsView();
