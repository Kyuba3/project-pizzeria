import {select, templates} from '../settings.js';

import AmountWidget from '../components/AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';
import { utils } from '../utils.js';


class Booking{

  constructor(element){
    const thisBooking = this;

    thisBooking.render(element);

    thisBooking.initWidgets();
  }

  render(element){
    const thisBooking = this;

    const generatedHTML = templates.bookingWidget();
    thisBooking.element = utils.createDOMFromHTML(generatedHTML);

    const bookingContainer = document.querySelector(select.containerOf.booking);
    bookingContainer.appendChild(thisBooking.element);



    thisBooking.dom = {
      wrapper: element,
      hoursAmount: element.querySelector(select.booking.hoursAmount),
      peopleAmount: element.querySelector(select.booking.peopleAmount),
      dateInput: element.querySelector(select.widgets.datePicker.wrapper),
      hourInput: element.querySelector(select.widgets.hourPicker.wrapper),
    };


    
  }

  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmountElem = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmountElem = new AmountWidget(thisBooking.dom.hoursAmount); 

    thisBooking.dateInputElem = new DatePicker(thisBooking.dom.dateInput);
    thisBooking.hourInputElem = new HourPicker(thisBooking.dom.hourInput);
  }
}

export default Booking;