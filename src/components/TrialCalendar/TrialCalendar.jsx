import React, { useEffect } from 'react';
import './TrialCalendar.css';
import flatpickr from 'flatpickr'; // Import the flatpickr library
import 'flatpickr/dist/flatpickr.min.css'; // Import the flatpickr styles
import { useLocation } from 'react-router-dom';
import { holidays } from '../../data/data';

const TrialCalendar = () => {
    const location = useLocation();


    // useEffect(() => {
    //     // const eventDates = {};
    //     // let day1 = formatDate(new Date(new Date().setMonth(new Date().getMonth() + 1)));
    //     // eventDates[day1] = [
    //     //     'Event 1, Location 1',
    //     //     'Event 2, Location 2'
    //     // ];
    //     // let day2 = formatDate(new Date(new Date().setDate(new Date().getDate() + 40)));
    //     // eventDates[day2] = [
    //     //     'Event 2, Location 3',
    //     // ];

    //     const flatpickrInstance = flatpickr('#calendar .placeholder', {
    //         inline: true,
    //         minDate: null,
    //         showMonths: 1,
    //         disableMobile: true,
    //         onChange: function (date, str) {
    //             console.log(date);
    //             var contents = '';
    //             if (date.length) {
    //                 contents += `<div class="event"><div class="date">${flatpickrInstance.formatDate(date[0], 'l J F')}</div></div>`;
    //                 // for (let i = 0; i < eventDates[str]?.length; i++) {
    //                 //     contents += `<div class="location">${eventDates[str]?.[i]}</div>`;
    //                 // }
    //                 //contents += '</div>';
    //             }
    //             document.querySelector('#calendar .calendar-events').innerHTML = contents;
    //         },
    //         locale: {
    //             weekdays: {
    //                 shorthand: ["S", "M", "T", "W", "T", "F", "S"],
    //                 longhand: [
    //                     "Sunday",
    //                     "Monday",
    //                     "Tuesday",
    //                     "Wednesday",
    //                     "Thursday",
    //                     "Friday",
    //                     "Saturday",
    //                 ]
    //             }
    //         }
    //     });

    //     eventCaledarResize(window);
    //     window.addEventListener('resize', () => eventCaledarResize(window));

    //     function eventCaledarResize($el) {
    //         var width = $el.innerWidth;
    //         if (flatpickrInstance.selectedDates.length) {
    //             flatpickrInstance.clear();
    //         }
    //         // if (width >= 768 && flatpickrInstance.config.showMonths !== 2) {
    //         //     flatpickrInstance.set('showMonths', 2);

    //         // }
    //         if (width < 768 && flatpickrInstance.config.showMonths !== 1) {
    //             flatpickrInstance.set('showMonths', 1);

    //             document.querySelector('.flatpickr-calendar').style.width = '';
    //         }
    //     }

    //     return () => {
    //         window.removeEventListener('resize', () => eventCaledarResize(window));
    //     };
    // }, []);

    useEffect(() => {
        let flatpickrInstance;
    
        if (!flatpickrInstance) {
          flatpickrInstance = flatpickr('#calendar .placeholder', {
            inline: true,
            minDate: null,
            showMonths: 1,
            disableMobile: true,
            onReady: function (selectedDates, dateStr, instance) {
              // Highlight holidays on the calendar initially
              highlightHolidays(instance);
            },
            onChange: function (selectedDates, dateStr, instance) {
              // Highlight holidays on the calendar when a date is selected
              highlightHolidays(instance);
    
              // Display holiday information
              const holidayInfo = holidays.filter((holiday) => holiday.date === dateStr);
    
              const contents = holidayInfo.map((info) => (
                `<div class="event"><div class="date">${instance.formatDate(selectedDates[0], 'l J F')}</div><div class="location">${info.holidayDescription}</div></div>`
              )).join('');
    
              document.querySelector('#calendar .calendar-events').innerHTML = contents;
            },
            onMonthChange: function (selectedDates, dateStr, instance) {
              // Highlight holidays on the calendar when changing months
              highlightHolidays(instance);
            },
            locale: {
              weekdays: {
                shorthand: ["S", "M", "T", "W", "T", "F", "S"],
                longhand: [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
              },
            },
          });
    
          eventCaledarResize(window);
          window.addEventListener('resize', () => eventCaledarResize(window));
        }
    
        function highlightHolidays(instance) {
          const calendarContainer = instance.calendarContainer;
          const dayElements = calendarContainer.querySelectorAll('.flatpickr-day');
    
          dayElements.forEach((dayElement) => {
            const date = instance.formatDate(dayElement.dateObj, 'Y-m-d');
            const isHoliday = holidays.some((holiday) => holiday.date === date);
    
            if (isHoliday) {
              dayElement.classList.add('holiday');
            } else {
              dayElement.classList.remove('holiday');
            }
          });
        }
    
        function eventCaledarResize($el) {
          var width = $el.innerWidth;
          if (flatpickrInstance.selectedDates.length) {
            flatpickrInstance.clear();
          }
    
          if (width < 768 && flatpickrInstance.config.showMonths !== 1) {
            flatpickrInstance.set('showMonths', 1);
    
            document.querySelector('.flatpickr-calendar').style.width = '';
          }
        }
    
        return () => {
          window.removeEventListener('resize', () => eventCaledarResize(window));
        };
      }, [holidays]);
    

    function formatDate(date) {
        let d = date.getDate();
        let m = date.getMonth() + 1;
        let y = date.getFullYear();
        return `${y}-${(m <= 9 ? '0' + m : m)}-${(d <= 9 ? '0' + d : d)}`;
    }
    console.log(location.pathname)

    let title = '';
    if (location.pathname === '/calendar/holiday') {
        title = 'Holidays';
    } else if (location.pathname === '/calendar/leave') {
        title = 'Leaves';
    } else if (location.pathname === '/calendar/birthday') {
        title = 'Birthdays';
    }

    return (
        <div className="cal-modal-container">
            <div className="cal-modal">
                <h3>{title}</h3>
                <div id="calendar">
                    <div className="placeholder"></div>
                    <div className="calendar-events"></div>
                </div>
            </div>
        </div>
    );
};

export default TrialCalendar;
