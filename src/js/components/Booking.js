import {select, templates} from '../settings.js';

import AmountWidget from '../components/AmountWidget.js';


class Booking{

  constructor(element){
    const thisBooking = this;

    thisBooking.render(element);

    thisBooking.initWidgets();

  }

  render(element){
    const thisBooking = this;

    const generatedHTML = templates.bookingWidget();

    thisBooking.element = element;

    thisBooking.dom = {
      wrapper: thisBooking.element,
      peopleAmount: document.querySelector(select.booking.peopleAmount),
      hoursAmount: document.querySelector(select.booking.hoursAmount),
    };

    thisBooking.dom.wrapper.innerHTML = generatedHTML;
  }

  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmountElem = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmountElem = new AmountWidget(thisBooking.dom.hoursAmount);
    
    thisBooking.dom.peopleAmount.addEventListener('click', function(event){
      event.preventDefault();
    });

    thisBooking.dom.hoursAmount.addEventListener('click', function(event){
      event.preventDefault();
    });
    
  }

}

export default Booking;