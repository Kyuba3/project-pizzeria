import {settings, select} from './settings.js';

class AmountWidget{
  constructor(element){
    const thisWidget = this;

    thisWidget.getElements(element);
    thisWidget.setValue(settings.amountWidget.defaultValue);
    thisWidget.initActions();
  }
    
  getElements(element){
    const thisWidget = this;

    thisWidget.element = element;
    thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input);
    thisWidget.linkDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.linkIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);
  }
    
  setValue(value){
    const thisWidget = this;

    let newValue = parseInt(value);
    const minValue = settings.amountWidget.defaultMin;
    const maxValue = settings.amountWidget.defaultMax;


    if(thisWidget.value !== newValue  && !isNaN(newValue)){
      thisWidget.value = newValue;
        
      if(thisWidget.value < minValue){
        thisWidget.value = minValue;
      } else if (thisWidget.value > maxValue){
        thisWidget.value = maxValue;
      }
    }
    thisWidget.input.value = thisWidget.value;

    thisWidget.announce();

  }

  initActions(){
    const thisWidget = this;

    thisWidget.input.addEventListener('change', function(){
      thisWidget.setValue(thisWidget.value);
    });
      
    thisWidget.linkDecrease.addEventListener('click', function(event){
      event.preventDefault();
      //if >=0 bo nie chcemy byc na minus
      thisWidget.setValue(thisWidget.value - 1);
    });

    thisWidget.linkIncrease.addEventListener('click', function(event){
      event.preventDefault();
      //if 0 bo nie chcemy byc na minus
      thisWidget.setValue(thisWidget.value + 1);
    });
  }

  announce(){
    const thisWidget = this;

    const event = new CustomEvent('updated', {
      bubbles: true
    });
      
      
    thisWidget.element.dispatchEvent(event);
  }
}

export default AmountWidget;