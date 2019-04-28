/*
  One of the advantages to use high order operators like switchMap
  is its feature to have access to the source observable event
*/

import { fromEvent, interval } from "rxjs";
import { switchMap, map } from "rxjs/operators";

const clickObservable = fromEvent(document, "click");

// const requestObservable = ...

// const responseObservable = requestObservable
//   .switchMap(request => ... response)

const clockObservable = clickObservable.pipe(
  switchMap(click => {
    // Here we still have access to the source observable
    return interval(1000).pipe(map(i => i * 10 * click.clientX)); // And we can use it in our inner observable
  })
);

clockObservable.subscribe(x => console.log(x));

// flattening
// Observable<Observable<number>> ---> Observable<number>

/*
--------+--------+-----------------
        \        \
         -0-1-2-3 -0-1-2-3-4-5-6---
         
         switch
         
----------0-1-2-3--0-1-2-3-4-5-6---
*/
