/*
  With the window operator we can break observables 
  using the events of other observable as breaking points
*/

import { fromEvent, interval } from "rxjs";
import { window, map, switchAll, count } from "rxjs/operators";
const clickObservable = fromEvent(document, "click");
const clockObservable = interval(1000);

const resultObservable = clockObservable.pipe(
  window(clickObservable), // So in this case the breaking point are the event from the clickObservables (clicks)
  map(obs => obs.pipe(count())), // It will return the amount of clicks done after every click
  switchAll()
);

resultObservable.subscribe(x => console.log(x));

/*
--0--1--2--3--4--5--6--7--8-- clockObservable
-------c-------c---c--------- clickObservable

    window
 
+------+-------+---+---------
\      \       \   \
 -0--1-|2--3--4|-5-|6--7--8-- (It's breaking the source obserbable after one click)
 
  map(obs => obs.count())
  
+------+-------+---+--
\      \       \   \
 -----2|------3|--1|---
          
    switch
 
------2-------3---1----

*/
