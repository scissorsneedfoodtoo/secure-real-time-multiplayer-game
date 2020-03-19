**freeCodeCamp** - Information Security 5: Secure Real Time Multiplayer Game
------

### User stories:

1. Develop a 2D real time multiplayer game using the HTML Canvas API and [Socket.io](https://socket.io/). The game can be as simple or complex as you like, as long as all the following user stories are implemented.
2. Each player is represented by an object which, at a minimum, contains the following properties:
    * A unique `id`.
    * `x` and `y` coordinates representing their current position.
    * A `score`.
3. Multiple players can connect to a server and play. When a player joins the game, append their player object to the `currPlayers` array in `game.mjs`. Complete the `addPlayer` object in `helper-functions.mjs` to implement this.
    * The `addPlayer` function should take an array of current player objects
3. Players can use the WASD keys to move their avatar. Complete the `movePlayer` function in `helper-functions.mjs` to implement this.
    * The `movePlayer` function should accept three arguments: a string of `"W"`, `"A"`, `"S"`, or `"D"`, a number for the amount of pixels the player's position should change, and an object containing the player's current `x` and `y` coordinates. `movePlayer` should return an object containing the player's new `x` and `y` coordinates.
4. All players are kept in sync.
5. Players can disconnect from the game at any time.

The Hat class should have a draw method that accepts an argument indicating the number of balls to draw from the hat. This method should remove balls at random from contents and return those balls as a list of strings. If the number of balls to draw exceeds the available quantity, return all the balls.

Next, create an experiment method in prob_calculator.py (not inside the Hat class). This method should accept the following arguments:

hat: A hat object containing balls.
balls_to_draw: An object indicating the exact group of balls to attempt to draw from the hat for the experiment. For example, to determine the probability of drawing 2 blue balls and 1 red ball from the hat, set balls_to_draw to {"blue":2, "red":1}.
num_balls_drawn: The number of balls to draw out of the hat in each experiment.
num_experiments: The number of experiments to perform. (The more experiments performed, the more accurate the approximate probability will be.)
The experiment method should return a probability.

2. The game can be as simple or complex as you like
3. Prevent the client from trying to guess / sniff the MIME type.
4. Prevent cross-site scripting (XSS) attacks.
5. Nothing from the website is cached in the client.
6. The headers say that the site is powered by 'PHP 7.4.3' even though it isn't (as a security measure).

### Testing and additional notes

* To run the tests on Glitch, set `NODE_ENV` to `test` without quotes in the `.env` file.
* To run the tests in the console, use the command `npm run test`. To open the Glitch console, first click "Tools" in the bottom left corner and then click "Full Page Console".
