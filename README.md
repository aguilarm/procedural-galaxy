# Procedural Galaxy

This is an adaptation of what was created in [this video from javidx9](https://www.youtube.com/watch?v=ZZY9YE7rZJw) which
creates an elite-style galaxy map procedurally in C++. It will likely be a very organic and experimental project with no real goal besides exploring both procedural generation and game engine design.

I started translating the code from the video almost directly to JS, did a few refactor passes and then finally switched to Remix. As I began working on a way to use React as the UI and give the engine state out to React, I feel deep into the rabbit hole of [React Three Fiber](https://github.com/pmndrs/react-three-fiber) and [Zustand](https://github.com/pmndrs/zustand). If I build anything with that, I will link the repo here.

Have a look at `app/engine/index.ts` for where I made it with this project. It renders a galaxy map that you can move around with `wasd`. The map is always generated the same, procedurally. Each planet's location is generated on render by using the seeded algorithm. Neat!

## Running

This is running on `remix.run`, which is similar to NextJS. You can use `yarn dev`, `yarn start`, and a few other commands to get going. Check `package.json` for the available commands, and [the remix.run docs](https://remix.run) for loads more info.
