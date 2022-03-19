const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
test('Test GET /hello with no name', function(done) {
  // Don't forget the callback...
  chai
    .request(server) // 'server' is the Express App
    .get('/hello') // http_method(url). NO NAME in the query !
    .end(function(err, res) {
      // res is the response object

      // Test the status and the text response (see the example above).
      // Please follow the order -status, -text. We rely on that in our tests.
      // It should respond 'Hello Guest'
      assert.equal(res.status, 200);
      assert.equal(res.text, 'hello Guest');
      done(); // Always call the 'done()' callback when finished.
    });
});
    // #2
test('Test GET /hello with your name', function(done) {
  // Don't forget the callback...
  chai
    .request(server) // 'server' is the Express App
    .get('/hello?name=John') /** <=== Put your name in the query **/
    .end(function(err, res) {
      // res is the response object

      // Your tests here.
      // Replace assert.fail(). Make the test pass.
      // Test the status and the text response. Follow the test order like above.
      assert.equal(res.status, 200);
      assert.equal(res.text, 'hello John' /** <==  Put your name here **/);
      done(); // Always call the 'done()' callback when finished.
    });
});
    // #3
test('send {surname: "Colombo"}', function(done) {
  // we setup the request for you...
  chai
    .request(server)
    .put('/travellers')
    /** send {surname: 'Colombo'} here **/
    .send({ surname: 'Colombo' })
    // .send({...})
    .end(function(err, res) {
      /** your tests here **/
      assert.equal(res.status, 200, 'response status should be 200');
      assert.equal(res.type, 'application/json', 'Response should be json');
      assert.equal(
        res.body.name,
        'Cristoforo',
        'res.body.name should be "Christoforo"'
      );
      assert.equal(
        res.body.surname,
        'Colombo',
        'res.body.surname should be "Colombo"'
      );

      done(); // Never forget the 'done()' callback...
    });
});
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      assert.fail();

      done();
    });
  });
});

const Browser = require('zombie');

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);



  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      assert.fail();

      done();
    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      assert.fail();

      done();
    });
  });
});
