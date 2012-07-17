/**
 * The namespace for the clock.
 */
var clock = {};

/**
 * The strings for the months of the year.
 * @const
 */
clock.MONTHS = [
    'JAN', 'FEB', 'MAR', 'APR',
    'MAY', 'JUN', 'JUL', 'AUG',
    'SEP', 'OCT', 'NOV', 'DEC'
];

/**
 * The strings for the days of the week.
 * @const
 */
clock.DAYS = [
    'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
];

/**
 * The current active shown date time content.
 */
clock.shown = {
  'day': 0,
  'date': 1,  // There is no 0th of a month
  'month': 0,
  'hour': 0,
  'minute': 0,
  'second': 0
};


clock.calendarFlip = function() {
  var d = new Date();
  var day = d.getDay();
  var date = d.getDate();
  var month = d.getMonth();
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();

  var doanimation = false;
  if (day > clock.shown.day) {
    doanimation = true;
    clock.shown.day += 1;
  } else {
    $('.calendar-flip .day').css({visibility: 'hidden'});
  }

  if (date > clock.shown.date){
    doanimation = true;
    clock.shown.date += 1;
  } else {
    $('.calendar-flip .date').css({visibility: 'hidden'});      
  }

  if (month > clock.shown.month) {
    doanimation = true;
    clock.shown.month += 1;
  } else {
    $('.calendar-flip .month').css({visibility: 'hidden'});
  }

  if (hour > clock.shown.hour){
    doanimation = true;
    clock.shown.hour += 1;
  } else {
    $('.calendar-flip .hour').css({visibility: 'hidden'});      
  }

  if (minute > clock.shown.minute){
    doanimation = true;
    clock.shown.minute += 1;
  } else {
    $('.calendar-flip .minute').css({visibility: 'hidden'});
  }

  if (doanimation) {

    // Set top values behind flipper
    $('.calendar-top .month').text(clock.MONTHS[clock.shown.month]);
    $('.calendar-top .day').text(clock.DAYS[clock.shown.day]);
    $('.calendar-top .date').text(clock.shown.date);
    $('.calendar-top .hour').text(clock.shown.hour);
    $('.calendar-top .minute').text(clock.shown.minute);

    // Initiate top transition
    $('.calendar-flip').addClass('fliptop');

    // Wait for top transition to finish (this is a hack)
    $('.calendar-flip .month').animate({'opacity': 1}, 100, function() {
      // Adjust positioning and set values for flipper
      $('.calendar-flip .month').text(clock.MONTHS[clock.shown.month]);
      $('.calendar-flip .day').text(clock.DAYS[clock.shown.day]);
      $('.calendar-flip .date').text(clock.shown.date);
      $('.calendar-flip .hour').text(clock.shown.hour);
      $('.calendar-flip .minute').text(clock.shown.minute);
      $('.calendar-flip').css('top', '+=2');

      // Initiate bottom transtion
      $('.calendar-flip').addClass('flipbottom');

      // Wait for bottom transition to finish (again, hack)
      $('.calendar-flip').animate({'opacity': 1}, 100, function() {
        $('.calendar-bottom .month').text(clock.MONTHS[clock.shown.month]);
        $('.calendar-bottom .day').text(clock.DAYS[clock.shown.day]);
        $('.calendar-bottom .date').text(clock.shown.date);
        $('.calendar-bottom .hour').text(clock.shown.hour);
        $('.calendar-bottom .minute').text(clock.shown.minute);

        // Hide flipper, transition back and wait (hack) and show it again
        $(this).hide().css('top', '-=2')
            .removeClass('fliptop')

            .removeClass('flipbottom')
            .animate({'opacity': 1}, 200, function() {
              $(this).show();
            });
      });
    });

  } else { 
    t = clearInterval(t);
    return false;
  }
}


// Run the clock
$(document).ready(function() {
  t = setInterval(clock.calendarFlip, 500);
});