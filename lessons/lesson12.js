/*
  You may wonder:

  Which use case does "groupBy" have?

  You can think of a situation where you have a bus with multiple objects, all of them with a code value
  You can use groupBy to generate one observable stream per code
*/

import { of } from "rxjs"
import { concatMap, delay, groupBy, mergeMap, skip, map } from "rxjs/operators"

const busObservable = of(
  { code: "en-us", value: "-TEST-" },
  { code: "en-us", value: "hello" },
  { code: "es", value: "-TEST-" },
  { code: "en-us", value: "amazing" },
  { code: "pt-br", value: "-TEST-" },
  { code: "pt-br", value: "olá" },
  { code: "es", value: "hola" },
  { code: "es", value: "mundo" },
  { code: "en-us", value: "world" },
  { code: "pt-br", value: "mundo" },
  { code: "es", value: "asombroso" },
  { code: "pt-br", value: "maravilhoso" }
).pipe(
  concatMap(x => of(x)),
  delay(500)
)

const all = busObservable.pipe(
  groupBy(obj => obj.code), // And here we are grouping by code
  mergeMap(innerObs =>
    innerObs.pipe(
      skip(1), // spipping the first one because it's just "-TEST-"
      map(obj => obj.value) // mapping the value we want to show
    )
  )
)

all.subscribe(x => console.log(x))
