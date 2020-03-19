/*
*       
*       To run the tests on Glitch, set `NODE_ENV` to `test` 
*       without quotes in the `.env` file. 
*       To run the tests in the console, open the terminal 
*       with [Ctrl + `] (backtick) and run the command `npm run test`.
*
*/

const chai = require('chai');
const assert = chai.assert;
const canvas = require("canvas");

// Mock the DOM for testing
const { JSDOM } = require('jsdom');
const dom = new JSDOM(`<!DOCTYPE html><html><head><script src="/socket.io/socket.io.js"></script></head><body><div class="container"><canvas ref="game" id="game-window" width="640" height="480"></canvas></div></body></html>`);

global.window = dom.window;
global.document = dom.window.document;
global.Image = canvas.Image;

import { movePlayer } from '../public/helper-functions.mjs';


suite('Unit Tests', () => {

  suite('Movement test', () => {
    test("Blah blah", done => {
      assert.deepStrictEqual([], []);
      done();
    });

  });

});
