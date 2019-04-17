/*
So far we have been able to map different values using observables (string, booleans, etc)
But what if we wanted to map another observable?
*/

/* Importing dependencies */
import { interval, fromEvent } from 'rxjs' // Observable creators
import { map } from 'rxjs/operators' // Operators

// Creating an observable from an event. It will emit every time the dom gets clicked
const clickObservable = fromEvent(document, 'click')

// Mapping the observable to return a new observable (interval) every time the dom gets clicked
const clockObservable = clickObservable
  .pipe(map(click => interval(1000)))

// Subscribing to the the past observable, now every time the dom gets clicked a new sequence of number will start printing on console
clockObservable
  .subscribe(clock => clock.subscribe(tick => console.log(tick))) // tick is gomming from internal

/*
 But there must be better ways to do this!
*/
