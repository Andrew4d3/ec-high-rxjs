/*
  With window toggle we can observe events that happen between two
  observable beginning

  Just like a toggle, it will go ON and OFF between those two
*/
import { fromEvent, interval } from "rxjs";
import { mergeAll, windowToggle } from "rxjs/operators";

const clockObservable = interval(100);
const downObservable = fromEvent(document, "mousedown");
const upObservable = fromEvent(document, "mouseup");

const resultObservable = clockObservable.pipe(
  // We will be observing events from the clockObservable betwen these two Observables
  windowToggle(downObservable, () => upObservable),
  mergeAll() // We can merge because all these observables don't overlap
);

resultObservable.subscribe(x => console.log(x));

/*
--0--1--2--3--4--5--6--7--8--9--
----------D-------------D------- downObservable
-------------------U------------ upObservable

 windowToggle
 
----------+-------------+-------
          \3--4--5-|    \-8--9--
          
 mergeAll
 
-----------3--4--5--------8--9--

*/
