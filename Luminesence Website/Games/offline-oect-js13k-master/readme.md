# What is this?

This is a [loderunner](https://en.wikipedia.org/wiki/Lode_Runner) style game in JavaScript created for the 2018 [Js13kGames](http://js13kgames.com/) competetion. You can see the [original entry here](https://js13kgames.com/entries/offline-oect)!

## Why is it cool? 

The compo takes place over 30 days, and requires building a game that totals (zipped) under 13k. Offline O.E.C.T came in at 12,911 bytes!

**See the [rewrite branch](https://github.com/BenjaminWFox/offline-oect-js13k/tree/rewrite) for (currently in progress) updates & extensions to the codebase made after the competition.**

### About


For best performance, use Chrome.

It is built on top of the [Ga](https://github.com/kittykatattack/ga) game engine and uses most of the core engine as well as a few extra plugins, most notably the `makeTiledWorld` method to assemble the game level.

The game level was built in [Tiled](https://www.mapeditor.org/). Any new level could be swapped in using the files in the assets directory. One caveat to know is that *all* tiles in a level must be occupied, hence the presence of a completely transparent 'air' tile in the tileset.

The enemy AI uses Dijkstra's algorithm, a slightly modified version of the one found [here](https://github.com/mburst/dijkstras-algorithm/blob/master/dijkstras.js).

### Run & Build

Run with `npm start` from the `game/` directory.

Build with `npm run build` to minify and copy files to `dist`.

The source files are in `game/src`. All Ga code is in `ga.js`, all other code is in `main.js`, including a condensed copy of `world.json`. The other two required files are `index.html` and `tileset.png`.

### The Good

The best thing about this game (for me) is that it's a finished piece. I have a bad habit of starting personal projects and not finishing them, so was excited to use the competition as a motivation to complete a game.

A challenge was figuring out the enemy ai. I haven't had much opportunity to work with algorithms and graphs. After some reading I identified Dijkstra's as a good solution, but was having a hard time visualizing the game level as a graph. It took some tinkering before realizing that I could build the graph nodes from each tile and its neighbors, and it was cool to see how small changes in the graph construction (adding or preventing certain types of tiles) changed the enemy behavior.

There were a lot of moving parts in the game, and I kept a running list of what the smallest pieces were and how they would be assembled into the bigger picture. This helped make the larger tasks more manageable.

Ga was a great catalyst to get this going. While there were situations where it was a bit more opaque that I'd have liked, the framework allowed me to spend far less time on the low-level implementation that would have been possible without it.

Also good is the stability of the game. I haven't been able to crash it or freeze it throughout testing.

Key takeaways:
- You can do it
- Break large problems down into smaller pieces
- Testing pays off in eliminating headaches later on

### The Bad

As above, building the graph from each tile individually is inefficient and lead to a large graph and a lot of processing when enemies recalculate their paths. Especially problematic in the current version is the situation where enemies have no path to the player. Two potential solutions are:
- A graph built on tiles that sensibly group into a large node.
- Additional metadata for each node that can inform smarter pathing.

The graph is also static, which means that when the player is within a destroyed tile the enemies can't find a path to the player. This could be solved by adding the destroyed tile into the graph temporarily, but I haven't had time to get around to it.

There is a tendency in javascript development that I think is prevalent to want to grab example code and jam it in as a final solution. I'm certainly guilty of this, but it's neccessary to do more than skim tutorials to snip code for a robust solution. I still haven't fully internalized everything the Djikstra algorithm is doing, which make it hard to tune it for performance.

The level code was significantly larger than I expected. I would have liked to have included several levels that eased the player into the game, but couldn't accomodate them due to the size of the JSON files :(

Key takeaways:
- There's always more to learn (take the time to do so)
- The harder it feels to understand, the bigger the payoff (especially for optimization)

### The Ugly

Code structure & orgnization is essentially non-existant. It wouldn't be an easy project for someone else to go in and understand, let alone edit (that includes myself in 6 months).

Lack of structure also made it challenging to be sure that changing some code woudln't affect something seemingly unrelated. Unit tests actually would have been very convenient, although I wouldn't have had the time to include them.

I didn't create a build system right away, and when I finally got around to that step I had to do a lot of refactoring to get the files structured in a way that worked with Webpack.

Key takeaways:
- Spend time to organize code into logical classes and methods
- Create a sensible build pipeline and then organize code to work within it, rather than the other way around.
