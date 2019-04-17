/*
  The past lesson we saw how we can map to observables and subscribe to them
  But that procedure is quite complicated. First, we have to subscribe inside a subscription
  And second, this could lead to leaking if we don't unsubscrine to the observable being mapped

  In order to relief these issues, we count with "flattening operators"
  These operators will do all the procedure to "subscribe and unsubscribe" for us.

  The first we are going to see is "switchAll"
*/

import { interval, fromEvent } from "rxjs";
import { map, switchAll } from "rxjs/operators"; // Here we are importing a new operator "switchAll"

const clickObservable = fromEvent(document, "click"); // Again, we define an event observable

const clockObservable = clickObservable.pipe(
  map(click => interval(1000)),
  switchAll() // With this, we don't have to subscribe to the inner observable
);

clockObservable.subscribe(x => console.log(x)); // Starts printing the interval numbers each time we got a click
// The difference with the past lesson is this time it will to unsubscribe to the past observable, so a new counter will start each time we click

// The following marble diagram explains it
// flattening
// Observable<Observable<number>> ---> Observable<number>

/*
--------+--------+------------------------
        \        \
         -0-1-2-3 -0-1-2-3-4-5-6
         
         switch
         
----------0-1-2-3--0-1-2-3-4-5-6

*/

/*
  So every time we click a new observable will "branch out" 
  by doing a "switch" we force the events emitted by the second observable to go into the main flow
  That's the reason we see them in the same line
  
*/
