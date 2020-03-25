**freeCodeCamp** - Information Security 5: Secure Real Time Multiplayer Game
------

### User stories:

Develop a 2D real time multiplayer game using the HTML Canvas API and [Socket.io](https://socket.io/). The game can be as simple or complex as you like, as long as all the following user stories are implemented:

1. Multiple players can connect to a server and play.
2. Each player has an avatar.
3. Each player is represented by an object created by the `Player` class in `Player.mjs`.
4. At a minimum, each player object should contain a unique `id`, a `score`, along with `x` and `y` coordinates representing the player's current position.
5. The game has at least one type of collectible item. Complete the `Collectible` class in `Collectible.mjs` to implement this.
6. At a minimum, each collectible item object created by the `Collectible` class should contain a unique `id`, along with `x` and `y` coordinates representing the item's current position.
7. Players can use the WASD and/or arrow keys to move their avatar. Complete the `movePlayer` method in `Player.mjs` to implement this.
8. The `movePlayer` method should accept two arguments: a string of "up", "down", "left", or "right", and a number for the amount of pixels the player's position should change. `movePlayer` should adjust the `x` and `y` coordinates of the player object it's called from.
9. Players can collide with a collectible item. Complete the `collision` method in `Player.mjs` to implement this.
10. The `collision` method should accept a collectible item's object as an argument. If the player's avatar intersects with the item, the `collision` method should return `true`.
11. All players are kept in sync.
12. Players can disconnect from the game at any time.
13. Prevent the client from trying to guess / sniff the MIME type.
14. Prevent cross-site scripting (XSS) attacks.
15. Nothing from the website is cached in the client.
16. The headers say that the site is powered by 'PHP 7.4.3' even though it isn't (as a security measure).

### Testing and additional notes

* To run the tests on Glitch, set `NODE_ENV` to `test` without quotes in the `.env` file.
* To run the tests in the console, use the command `npm run test`. To open the Glitch console, first click "Tools" in the bottom left corner and then click "Full Page Console".
