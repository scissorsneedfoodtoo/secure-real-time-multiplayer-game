**freeCodeCamp** - Information Security Secure Real Time Multiplayer Game
------

### User stories:

1. Prevent the client from trying to guess / sniff the MIME type.
2. Prevent cross-site scripting (XSS) attacks.
3. Nothing from the website is cached in the client.
4. The headers say that the site is powered by 'PHP 7.4.3' even though it isn't (as a security measure).
5. Develop a real time multiplayer game using the HTML Canvas API and [Socket.io](https://socket.io/) that:
    * Allows multiple players to connect to a server and play.
    * Keeps all player in sync.
    * Allows players to disconnect at any time and updates the game accordingly.
6. All 4 functional tests pass.

### Testing and additional notes

1. To run the tests on Glitch, set `NODE_ENV` to `test` without quotes in the `.env` file.
2. To run the tests from the console, run `npm run test`.
