/*
  mergeAll has a feature to "remember" observables that have not chance to be triggered at the moment

  So if we set mergeAll(1) and emit a click event while the current observable is still running
  That second observable will wait on queue after the current one completes, and then start emiting

  There's a shortcut for this, which is "concatAll"
*/

import { interval, fromEvent } from "rxjs";
import { map, concatAll, take } from "rxjs/operators";

const clickObservable = fromEvent(document, "click");

const clockObservable = clickObservable.pipe(
  map(click => interval(1000).pipe(take(5))), // Now this observable completes after 5 values
  concatAll() // This is literally the same as mergeAll(1)
);

clockObservable.subscribe(x => console.log(x));

// flattening
// Observable<Observable<number>> ---> Observable<number>

/*
--------+--------------+-+----
        \        
         -0-1-2-3-4|
         
         concatAll
         
----------0-1-2-3-4-----0-1-2-3-4--0-1-2-3-4
*/

/*
  The "+" are the click events, as you can see if you click twice in a row
  The second one will start emiting events after the first one completes
*/
