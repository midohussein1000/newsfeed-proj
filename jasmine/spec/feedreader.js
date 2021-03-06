// Hello.
//
// This is JSHint, a tool that helps to detect errors and potential
// problems in your JavaScript code.
//
// To start, simply enter some JavaScript anywhere on this page. Your
// report will appear on the right side.
//
// Additionally, you can toggle specific options in the Configure
// menu.
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /*that loops within each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.*/
        it('contain a URL', function() {
            for (var x = 0; x < allFeeds.length; x++) {
                expect(allFeeds[x].url).toBeDefined();
                expect(allFeeds[x].url).not.toBe('');
            }
        });

        /* makes sure that each feed in the allFeeds object
         *and ensures it has a name defined
         * and that the name is not empty.
         */

        it('have names', function() {
            for (var x = 0; x < allFeeds.length; x++) {
                expect(allFeeds[x].name).toBeDefined();
                expect(allFeeds[x].name).not.toBe('');
            }
        });
    });




    describe('The menu', function() {

        var bodyClass = $('body').hasClass('menu-hidden');


        /* Tests to make sure the menu is hidden when the page loads
         */
        it('is hidden by default', function() {
            expect(bodyClass).toBe(true);
        });

        /* Tests to see if the menu icon will toggle the menu
         */

        it('is toggle-able', function() {
            var menuButton = $('.menu-icon-link');
            menuButton.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuButton.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    describe('Initial entries', function() {
        var numEntries;
        //call loadFeed for first feed. loadFeed has a second paramater for a callback.
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* This test checks that after the initial feed is loaded, there are 
         * entries appearing.
         */
        it('have at least one entry', function(done) {
            numEntries = $('.feed').find('.entry').length;
            expect(numEntries).toBeGreaterThan(0);
            done();
        });
    });
    describe('New Feed Selection', function() {
        var headText,
            newHeadText;

        beforeEach(function(done) {
            spyOn(window, 'loadFeed').and.callThrough();
            loadFeed(0, done);
        });

        it('loads feed 0 when called', function() {
            expect(window.loadFeed).toHaveBeenCalledWith(0, jasmine.any(Function));
            headText = $('.entry').children('h2').text();
        });

        describe('loads a new feed', function() {
            beforeEach(function(done) {
                loadFeed(1, done);
            });

            it('loads feed 1 when called', function() {
                expect(window.loadFeed).toHaveBeenCalledWith(1, jasmine.any(Function));
                this.headText = $('.entry').children('h2').text();
                newHeadText = this.headText;
            });
            it('Feed headlines should not match', function() {
                expect(newHeadText).not.toEqual(headText);
            });
        });
    });
}());
