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

    thisBooking.element = element;
    thisBooking.dom = {
      wrapper: thisBooking.element,
    };

    const generatedHTML = templates.bookingWidget();

    thisBooking.dom.wrapper.innerHTML = generatedHTML;
    
    thisBooking.dom.peopleAmount = thisBooking.element.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = thisBooking.element.querySelector(select.booking.hoursAmount);
    
  }

  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmountElem = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmountElem = new AmountWidget(thisBooking.dom.hoursAmount); 
  }
}

export default Booking;