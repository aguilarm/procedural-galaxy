# Procedural Galaxy

This is an adaptation of what was created in [this video from javidx9](https://www.youtube.com/watch?v=ZZY9YE7rZJw) which
creates an elite-style galaxy map procedurally in C++. It will likely be a very organic and experimental project with no real goal besides exploring both procedural generation and game engine design.

I started translating the code from the video almost directly to JS and did a few exploratory refactoring passes to split the code up a bit. As I began working on a way to use React as the UI and give the engine state out to React, I feel deep into the rabbit hole of [React Three Fiber](https://github.com/pmndrs/react-three-fiber) and [Zustand](https://github.com/pmndrs/zustand). It's likely I will move to a different project trying that approach out in the future, rather than continuing with this one.

Have a look at `app/engine/index.ts` for where I made it with this project. It renders a galaxy map that you can move around with `wasd`. The map is always generated the same, procedurally. Each planet's location is generated on render by using the seeded algorithm. Neat!

## Running

Parcel is the compiler for this project. You can start it up using `yarn start`, and that will fire up a web server at `http://localhost:1234`. Running `yarn build` will output to `./docs`. Eslint is also set up with `yarn lint`.

This project also deploys to Github Pages via Github Actions.