import { KeenElement, html } from '../dependencies/keen-element/index.js';

class NumberInput extends KeenElement {
  constructor() {
    super();
  }

  whenConnected() {
    /* Create control buttons*/
    if (this.hasAttribute('show-controls')) {
      const decreaseButton = document.createElement('button');
      decreaseButton.setAttribute('id', 'decrease-button');
      decreaseButton.textContent = '−';
      this.shadowRoot.insertBefore(decreaseButton, this.shadowRoot.firstChild);

      const increaseButton = document.createElement('button');
      increaseButton.setAttribute('id', 'increase-button');
      increaseButton.textContent = '+';
      this.shadowRoot.appendChild(increaseButton);

      const inputField = this.shadowRoot.querySelector('input');

      this.shadowRoot.addEventListener('mousedown', evt => {
        if (evt.button !== 0 || evt.target.tagName !== 'BUTTON') return;

        const buttonId = evt.target.id;
        const step = Number(this.step) || 1;
        if (buttonId === 'decrease-button') {
          this.value = Number(inputField.value) - step;
        } else {
          this.value = Number(inputField.value) + step;
        }
      });
    }

    /* Set initial value */
    if (this.hasAttribute('value')) {
      this.value = this.getAttribute('value');
    }

  }

  get value() {
    return this.retrieve('input').value;
  }
  set value(value) {
    this.retrieve('input').value = value;
  }

  get step() {
    return this.getAttribute('step');
  }
  set step(value) {
    this.setAttribute('step', value);
  }

  template() { return html`<input type="number">`; }

  styles() {
    return `
    :host {
      width: 180px;
      display: flex;
      flex-wrap: no-wrap;
      align-item: center;
      color: #4b5c7e;
      user-select: none;
    }

    button,
    input {
      text-align: center;
      border: 0;
      outline: none;
      background-color: #f3f5fe;
      font-size: 16px;
    }

    button,
    input::placeholder {
      color: #929292;
    }

    button {
      padding: 10px;
    }

    button:hover {
      color: #4b5c7e;
      cursor: pointer;
    }

    #decrease-button {
      border-radius: 5px 0 0 5px;
    }

    #increase-button {
      border-radius: 0 5px 5px 0;
    }

    input {
      width: 100%;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 5px;
      -moz-appearance: textfield;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /*Show Controls*/
    :host([show-controls]) input {
      padding-right: 0;
      padding-left: 0;
      border-radius: 0;
    }`;
  }
}

customElements.define('number-input', NumberInput);
