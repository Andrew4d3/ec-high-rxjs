/*
  We can use groupBy to generate multiple obserbables
  grouped by a specific value
  
  Think of it like a "GROUP BY" instrucction in SQL
*/
import { interval } from "rxjs";
import { take, map, groupBy, mergeAll, toArray } from "rxjs/operators";

const numbersObservable = interval(500).pipe(take(5));

numbersObservable
  .pipe(
    groupBy(x => x % 2), // This will group the source observable into two groups: Odd and even values
    map(innerObs => innerObs.pipe(toArray())), // Will transfor the grouped observables into arrays
    mergeAll() // And merge everything
  )
  .subscribe(x => console.log(x));

/*
--0--1--2--3--4|

 groupBy(x => x % 2)
 
--+--+---------|
  \  \
  \  1-----3---|
  0-----2-----4|
  
 map(innerObs => innerObs.toArray())
 
--+--+---------|
  \  \
  \  ---------[1,3]|
  ------------[0,2,4]|
  
 mergeAll
 
--------------([0,2,4],[1,3])|

*/
