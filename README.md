**freeCodeCamp** - Information Security Secure Real Time Multiplayer Game
------

### User stories:

1. Develop a real time multiplayer game using the HTML Canvas API and [Socket.io](https://socket.io/). The game can be as simple or as complex as you like, as long as the following user stories are implemented:
    * Multiple players can connect to a server and play.
    * All players are kept in sync.
    * Players can disconnect from the game at any time.
3. Prevent the client from trying to guess / sniff the MIME type.
4. Prevent cross-site scripting (XSS) attacks.
5. Nothing from the website is cached in the client.
6. The headers say that the site is powered by 'PHP 7.4.3' even though it isn't (as a security measure).

### Testing and additional notes

* To run the tests on Glitch, set `NODE_ENV` to `test` without quotes in the `.env` file.
* To run the tests in the console, use the command `npm run test`. To open the Glitch console, first click "Tools" in the bottom left corner and then click "Full Page Console".
