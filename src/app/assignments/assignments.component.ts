import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeUtils } from '../time-utils';

@Component({
  selector: 'app-assignments',
  imports: [],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent {
  assignments:any[] = [
    {'title': 'A0',
      'name': 'Hello, World!',
      'parts': [] },
    {'title': 'A1',
      'name': 'TODO List in HTML and CSS',
      'parts': [] },
    {'title': 'A2',
      'name': 'Widget Factory in Adobe Spectrum',
      'parts': [] },
      {'title': 'A3',
        'name': 'Pokedex in JavaScript',
        'parts': [] }
  ];

  constructor(private http:HttpClient) {
  	this.http.get('calendar.json').subscribe(calendar => {
  		this.parseCalendar(calendar as {});
  	});
  }

  parseCalendar(calendar:any) {
    let events:any[] = calendar['events'];
    //Add date string to each event
    events.map(e => {
      let due = new Date(e.date + " " + calendar['defaults'].assignment.due + " GMT" + TimeUtils.getTimezoneOffset());
      e['dueStr'] = new Intl.DateTimeFormat("en-US", {month: "long", day: 'numeric', year: 'numeric', hour:'numeric', minute:'2-digit'}).format(due);
    });
    //Filter by type
    let assignmentList = events.filter(e => e['type'] == 'assignment');
    assignmentList.forEach(((assignment) => {
      for(let i=0; i<this.assignments.length;i++) {
        if(this.assignments[i].title == assignment.title) {
          this.assignments[i].parts.push(assignment);
        }
      }
    }));
  }
}
