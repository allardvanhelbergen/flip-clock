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
 * The classes that reference the divs containing the hands.
 */
clock.cssReference = {
  CLOCK: '#clock'
};

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

  //console.log('hours:', clock.shown.hours);

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

  if (second > clock.shown.second){
    doanimation = true;
    clock.shown.second += 1;
  } else {
    $('.calendar-flip .second').css({visibility: 'hidden'});
  }

  if (doanimation) {
    $('.calendar-top .month').text(clock.MONTHS[clock.shown.month]);
    $('.calendar-top .day').text(clock.DAYS[clock.shown.day]);
    $('.calendar-top .date').text(clock.shown.date);
    $('.calendar-top .hour').text(clock.shown.hour);
    $('.calendar-top .minute').text(clock.shown.minute);
    $('.calendar-top .second').text(clock.shown.second);
    $('.calendar-flip').addClass('fliptop');
    $('.calendar-flip .month').animate({opacity: 1}, 100, function() {
      //$('.calendar-flip').css({top: 8});
      $('.calendar-flip .month').text(clock.MONTHS[clock.shown.month]);
      $('.calendar-flip .day').text(clock.DAYS[clock.shown.day]);
      $('.calendar-flip .date').text(clock.shown.date);
      $('.calendar-flip .hour').text(clock.shown.hour);
      $('.calendar-flip .minute').text(clock.shown.minute);
      $('.calendar-flip .second').text(clock.shown.second);
      $('.calendar-flip').addClass('flipbottom');
      $('.calendar-flip').animate({opacity: 1}, 200, function() {
        $('.calendar-bottom .month').text(clock.MONTHS[clock.shown.month]);
        $('.calendar-bottom .day').text(clock.DAYS[clock.shown.day]);
        $('.calendar-bottom .date').text(clock.shown.date);
        $('.calendar-bottom .hour').text(clock.shown.hour);
        $('.calendar-bottom .minute').text(clock.shown.minute);
        $('.calendar-bottom .second').text(clock.shown.second);
        $(this).hide().css({top: 6})
            .removeClass('fliptop')
            .removeClass('flipbottom')
            .animate({top: 6}, 800, function() {
              $(this).show();
            });
        });
    });
    return true;
  } else { 
  	t = clearInterval(t);
    return false;
  }
}


// Run the clock
$(document).ready(function() {
  $(clock.cssReference.CLOCK).addClass('running');
  //t = setInterval(clock.calendarFlip, 1000);
  
  $('#color-switch').click(function() {
    $('body').toggleClass('light').toggleClass('dark');
    $('#calendar-container').toggleClass('black').toggleClass('white');
  });
});