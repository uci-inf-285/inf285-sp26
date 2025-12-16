import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarEventComponent } from '../calendar-event/calendar-event.component';
import { TimeUtils } from '../time-utils';

@Component({
  selector: 'app-calendar',
  imports: [CalendarEventComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  calendar:any[] = [];
  defaults:any = {};

  constructor(private http:HttpClient) {
  	this.http.get('calendar.json').subscribe(calendar => {
  		this.parseCalendar(calendar as any);
  	});
  }

  parseCalendar(calendar:any) {
  	const typeOrder = ["holiday", "absence", "assignment", "discussion", "lecture", "demo", "officehours_daniel", "officehours_weijun", "officehours_ziqi", "officehours_emily"];

    let events:any[] = calendar['events'];
	this.defaults = calendar['defaults'];
    events = events.map((event) => {
		event.date = TimeUtils.createFromString(event.date);
		return event;
	});

    events.sort((a, b) => {
		return a.date > b.date ? 1 : 0;
	});
	let start_date = new Date(events[0].date);
	let end_date = new Date(events[events.length - 1].date);
	start_date.setDate(start_date.getDate() - start_date.getDay());
	end_date.setDate(end_date.getDate() - end_date.getDay() + 6);
	
	var calendar_dates:any = [];
	let events_index = 0;

	let today = new Date();
    today.setHours(0, 0, 0, 0);
	while(start_date <= end_date) {
		let todays_events:any[] = [];
		//Compare the date rather than the time to account for Daylight Savings
		while(events_index < events.length && events[events_index].date.toLocaleDateString() == start_date.toLocaleDateString()) {
			todays_events.push(events[events_index]);
			events_index++;
		}
		todays_events.sort((a:any, b:any) => {
			return typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type);
		});
		calendar_dates.push({
			date: start_date,
			isToday: today.getTime() == start_date.getTime(),
			isWeekend: start_date.getDay() == 0 || start_date.getDay() == 6,
			dateStr: new Intl.DateTimeFormat("en-US", {month: "short", day: 'numeric'}).format(start_date),
			events: todays_events
		});
		start_date = new Date(start_date);
		start_date.setDate(start_date.getDate() + 1);
	}
	this.calendar = calendar_dates;
  }
}