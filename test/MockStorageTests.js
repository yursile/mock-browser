/**
 * @class AbstractStorageTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/10/14 4:12 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    MockStorage = require('../lib/MockStorage');

describe('MockStorage', function() {
    'use strict';

    describe('#instance', function() {
        var storage = new MockStorage(),
            methods = [
                'getItem',
                'setItem',
                'clear',
                'key',
                '__protected'
            ];

        it('should create an instance of MockStorage', function() {
            should.exist( storage );
            storage.should.be.instanceof( MockStorage );
            storage.length.should.equal( 0 );
        });

        it('should have all known methods by size and type', function() {
            dash.functionsIn( storage ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                storage[ method ].should.be.a( 'function' );
            });
        });
    });

    describe('setItem', function() {
        var storage = new MockStorage();

        it('should set a data item', function() {
            var key = 'mykey',
                value = 'my value';

            storage.setItem( key, value );

            storage.__protected().data[ key ].should.equal( value );
        });
    });

    describe('getItem', function() {
        var storage = new MockStorage();

        it('should get a data item', function() {
            var key = 'mykey',
                value = 'my value';

            storage.setItem( key, value );

            storage.getItem( key ).should.equal( value );
        });
    });

    describe('length', function() {
        var storage = new MockStorage();

        it('should get a data item', function() {
            var key = 'mykey',
                value = 'my value';

            storage.setItem( key, value );

            storage.length.should.equal( 1 );
        });
    });

    describe('clear', function() {
        var storage = new MockStorage();

        it('should clear all data', function() {
            for (var i = 0; i < 10; i++) {
                storage.setItem( "key:" + i, 'value: ' + new Date().toJSON() );
            }

            storage.length.should.equal( 10 );
            storage.clear();
            storage.length.should.equal( 0 );
        });
    });

    describe('key', function() {
      var storage = new MockStorage();

      it('should return the keys in the order they were inserted', function() {
        var key0 = 'mykey',
            value0 = 'my value',
            key1 = 'key2',
            value1 = 'value2';

        storage.setItem( key0, value0 );
        storage.setItem( key1, value1 );

        storage.key( 0 ).should.equal( 'mykey' );
        storage.key( 1 ).should.equal( 'key2' );

        storage.setItem( key0, value1 );
        storage.key( 0 ).should.equal( 'mykey' );
      });
    });
});
