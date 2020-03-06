/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

// Mock the DOM for testing
const { JSDOM } = require('jsdom');
const dom = new JSDOM(`<!DOCTYPE html><html><body><div class="container"><div class="form-container"><textarea rows="10" cols="60" id="text-input"></textarea><br /><select id="locale-select"><option value="american-to-british">American to British</option><option value="british-to-american">British to American</option></select><input type="button" value="Translate" id="translate-btn" /><input type="button" value="Clear" id="clear-btn" /></div><div id="output-container"><div id="solution-container">Translated Sentence:<div id="translated-sentence"></div><div id="error-msg"></div></div></div></div></body></html>`);

global.window = dom.window;
global.document = dom.window.document;

const Translator = require('../public/translator.js');

suite('Unit Tests', () => {

  suite('Function translateSentence(input, targetLocale)', () => {

    suite('American to British English', () => {

      test('Mangoes are my favorite fruit. --> Mangoes are my favourite fruit.', done => {
        const input = 'Mangoes are my favorite fruit.';
        const output = 'Mangoes are my favourite fruit.';
        const testStr = Translator.translateSentence(input, 'british').translatedStr;
        assert.strictEqual(testStr, output);
        done();
      });

      test('I ate yogurt for breakfast. --> I ate yoghurt for breakfast.', done => {
        const input = 'I ate yogurt for breakfast.';
        const output = 'I ate yoghurt for breakfast.';
        const testStr = Translator.translateSentence(input, 'british').translatedStr;
        assert.strictEqual(testStr, output);
        done();
      });

      test("We had a party at my friend's condo. --> We had a party at my friend's flat.", done => {
        const input = "We had a party at my friend's condo.";
        const output = "We had a party at my friend's flat.";
        const testStr = Translator.translateSentence(input, 'british').translatedStr;
        assert.strictEqual(testStr, output);
        done();
      });

      test('Can you toss this in the trashcan for me? --> Can you toss this in the bin for me?', done => {
        const input = 'Can you toss this in the trashcan for me?';
        const output = 'Can you toss this in the bin for me?';
        const testStr = Translator.translateSentence(input, 'british').translatedStr;
        assert.strictEqual(testStr, output);
        done();
      });

      test('The parking lot was full. --> The car park was full.', done => {
        const input = 'The parking lot was full.';
        const output = 'The car park was full.';
        const testStr = Translator.translateSentence(input, 'british').translatedStr;
        assert.strictEqual(testStr, output);
        done();
      });

      test('Like a high tech Rube Goldberg machine. --> Like a high tech Heath Robinson device.', done => {
        const input = 'Like a high tech Rube Goldberg machine.';
        const output = 'Like a high tech Heath Robinson device.';
        const testStr = Translator.translateSentence(input, 'british').translatedStr;
        assert.strictEqual(testStr, output);
        done();
      });

    });

    suite('British to American English', () => {

      test('We watched the footie match for a while. --> We watched the soccer match for a while.', done => {
        const input = 'We watched the footie match for a while.';
        const output = 'We watched the soccer match for a while.';
        const testStr = Translator.translateSentence(input, 'american').translatedStr;
        assert.strictEqual(testStr, output);
        done();
      });

      test('Paracetamol takes up to an hour to work. --> Tylenol takes up to an hour to work.', done => {
        const input = 'Paracetamol takes up to an hour to work.';
        const output = 'Tylenol takes up to an hour to work.';
        const testStr = Translator.translateSentence(input, 'american').translatedStr;
        assert.strictEqual(testStr, output);
        done();
      });

      test('First, caramelise the onions. --> First, caramelize the onions.', done => {
        const input = 'First, caramelise the onions.';
        const output = 'First, caramelize the onions.';
        const testStr = Translator.translateSentence(input, 'american').translatedStr;
        assert.strictEqual(testStr, output);
        done();
      });

      test('I spent the bank holiday at the funfair. --> I spent the public holiday at the carnival.', done => {
        const input = 'I spent the bank holiday at the funfair.';
        const output = 'I spent the public holiday at the carnival.';
        const testStr = Translator.translateSentence(input, 'american').translatedStr;
        assert.strictEqual(testStr, output);
        done();
      });

      test('I had a bicky then went to the chippy. --> I had a cookie then went to the fish-and-chip shop.', done => {
        const input = 'I had a bicky then went to the chippy.';
        const output = 'I had a cookie then went to the fish-and-chip shop.';
        const testStr = Translator.translateSentence(input, 'american').translatedStr;
        assert.strictEqual(testStr, output);
        done();
      });

      test("I've just got bits and bobs in my bum bag. --> I had a cookie then went to the fish-and-chip shop.", done => {
        const input = "I've just got bits and bobs in my bum bag.";
        const output = "I've just got odds and ends in my fanny pack.";
        const testStr = Translator.translateSentence(input, 'american').translatedStr;
        assert.strictEqual(testStr, output);
        done();
      });

    });

  });

});
