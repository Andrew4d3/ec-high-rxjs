/*
  With the past example, Each time we click, the past observable gets unsubscribed
  But what if we want to keep both observables running in parallel?

  We have to use "mergeAll" instead
*/

// Doing the same from here
import { interval, fromEvent } from "rxjs";
import { map, mergeAll } from "rxjs/operators";

const clickObservable = fromEvent(document, "click");

const clockObservable = clickObservable.pipe(
  map(click => interval(1000)),
  mergeAll(3) // The parameter indicates how many observable we are allowed to be running at any moment
);

/*
  So in this case, If we click a fourth time, that observable will not start.
  Just if one of the observable completes, it will open room for a new observable to be merged
  (In this case fromEvent is an observable that never completes)
*/

clockObservable.subscribe(x => console.log(x));

// flattening
// Observable<Observable<number>> ---> Observable<number>

/*
--------+--------+------------------------
        \        \
         -0-1-2-3 -0-1-2-3-4-5-6
         
         mergeAll
         
----------0-1-2-3-405162738495...
*/
