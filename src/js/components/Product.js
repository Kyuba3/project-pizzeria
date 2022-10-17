import {select, classNames, templates} from '../settings.js';
import {utils} from '../utils.js';
import AmountWidget from '../components/AmountWidget.js';

class Product{
  constructor(id, data){
    const thisProduct = this;
      
    thisProduct.id = id;
    thisProduct.data = data;
      
    thisProduct.renderInMenu();
    thisProduct.getElements();
    thisProduct.initAccordion();
    thisProduct.initOrderForm();
    thisProduct.initAmountWidget();
    thisProduct.processOrder();
    thisProduct.prepareCartProductParams();
      
  }
  renderInMenu(){
    const thisProduct = this;

    /* Generate HTML based on template */
    const generatedHTML = templates.menuProduct(thisProduct.data);
    /* create element using utils.createElementFromHTML */ 
    thisProduct.element = utils.createDOMFromHTML(generatedHTML);
    /* find menu container */ 
    const menuContainer = document.querySelector(select.containerOf.menu);
    /* add element to menu */
    menuContainer.appendChild(thisProduct.element);
  }
    
  getElements(){
    const thisProduct = this;
    
    thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
    thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
    thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
    thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
    thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
    thisProduct.imageWrapper = thisProduct.element.querySelector(select.menuProduct.imageWrapper);
    thisProduct.amountWidgetElem = thisProduct.element.querySelector(select.menuProduct.amountWidget);
  }

  initAccordion(){
    const thisProduct = this;
    /* start add event listener to clickable trigger on event click */
    thisProduct.accordionTrigger.addEventListener('click', function(event){
      /* prevent default action for event */
      event.preventDefault();
      /* find active product */
      const activeProduct = document.querySelector(select.all.menuProductsActive);
      /* if there is active product and it's not thisProduct.element, remove class active from it */
      if(activeProduct != null  && activeProduct != thisProduct.element){
        activeProduct.classList.remove(classNames.menuProduct.wrapperActive);
      }
      /* toggle active class on thisProduct.element */
      thisProduct.element.classList.toggle(classNames.menuProduct.wrapperActive);
    });
      
  }

  initOrderForm(){
    const thisProduct = this;
       
    thisProduct.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisProduct.processOrder();
    });
      
    for(let input of thisProduct.formInputs){
      input.addEventListener('change', function(){
        thisProduct.processOrder();
      });
    }
      
    thisProduct.cartButton.addEventListener('click', function(event){
      event.preventDefault();
      thisProduct.processOrder();
      thisProduct.addToCart();
    });
  }

  processOrder(){
    const thisProduct = this;
    // convert form to object structure
    const formData = utils.serializeFormToObject(thisProduct.form);
    // set price to default price
    let price = thisProduct.data.price;

    // for every category (param)
    for(let paramId in thisProduct.data.params){
      // determine param value
      const param = thisProduct.data.params[paramId];
      console.log(paramId, param);
      
      // for every option in this catrgory
      for (let optionId in param.options){
        // determine option value
        const option = param.options[optionId];
        console.log(optionId, option);

        if(formData[paramId] && formData[paramId].includes(optionId)){
          if(!option.default){
            price += option.price;
          }
        } else if(option.default){
          price -= option.price;
        }
        // find image .paramId-optionId
        console.log(thisProduct.imageWrapper);
        const findImage = thisProduct.imageWrapper.querySelector('.' + paramId + '-' + optionId);
        console.log(findImage);
        // check it is founded
        if(findImage){
          // check it is selected
          if(formData[paramId].includes(optionId)){
            findImage.classList.add(classNames.menuProduct.imageVisible);
          } else {
            findImage.classList.remove(classNames.menuProduct.imageVisible);
          }
        } 
      }
    }
    price *= thisProduct.amountWidget.value;
    // update calculated price in the HTML
    thisProduct.priceSingle = price;
    thisProduct.priceElem.innerHTML = price;
  }

  initAmountWidget(){
    const thisProduct = this;
    
    thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem);

    thisProduct.amountWidgetElem.addEventListener('updated', function(){
      thisProduct.processOrder();
    });
  }
    
  addToCart(){
    const thisProduct = this;

    thisProduct.name = thisProduct.data.name;
    thisProduct.amount = thisProduct.amountWidget.value;
   
    const event = new CustomEvent('add-to-cart', {
      bubbles: true,
      detail: {
        product: thisProduct.prepareCartProduct(),
      },
    });

    thisProduct.element.dispatchEvent(event);
  }

  prepareCartProduct(){
    const thisProduct = this;

    const productSummary = {
      id: thisProduct.id,
      name: thisProduct.data.name,
      amount: thisProduct.amountWidget.value,
      priceSingle: thisProduct.priceSingle, 
      price: thisProduct.amountWidget.value * thisProduct.priceSingle,
      params: thisProduct.prepareCartProductParams(),
    };

    return productSummary;
      
  }

  prepareCartProductParams(){
    const thisProduct = this;

    const formData = utils.serializeFormToObject(thisProduct.form);
    const params = {};
      
    for (let paramId in thisProduct.data.params){
      const param = thisProduct.data.params[paramId];
      console.log(param, paramId);
        
      params[paramId] = {
        label: param.label,
        options: {},
      };

      for(let optionID in param.options){
        const option = param.options[optionID];
        console.log(optionID, option);

        const optionSelected = formData[paramId] && formData[paramId].includes(optionID);
        
        if(optionSelected){
          params[paramId].options[optionID] = option.label;
        }
      }
    }
    return params;
  }
}

export default Product;