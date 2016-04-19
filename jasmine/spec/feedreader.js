$(function() {
    // test the array that holds the info for the feeds
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined(); // check if the array that holds the feedinfo is defined
            expect(allFeeds.length).not.toBe(0); // check if the array holds data
        });
        // test the properties for each feed
        describe('Each Feed', function(){
            it('has a url', function(){
                allFeeds.forEach(function(feed){
                    expect(feed.url).toBeDefined(); //check if each feed has a url
                    expect(feed.url.length).not.toBe(0); // check if the url for each feed is longer than 0 chars
                });
            });
            it('has a name', function(){
                allFeeds.forEach(function(feed){
                    expect(feed.name).toBeDefined(); // check if each feed has a name defined
                    expect(feed.name.length).not.toBe(0); // check if the name for each feed is longer than 0 chars
                });
            });
        });
    });

    // test the menu functionality
    describe('The menu', function(){
        // check if body has 'menu-hidden' class on load
        it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        it(' is shown when the menu icon is clicked & hidden when the icon is clicked again', function(){
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false); // check if 'menu-hidden' class is removed after clicking the hamburger icon
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true); // check if 'menu-hidden' class is returned when icon is clicked again
        });
    });

    // test the initial loading of entries
    describe('Initial Entries', function(){
        // async call to load a feed
        beforeEach(function(done){
            loadFeed(0,done);
        });

        it('should contain at least a single .entry element within the feed container', function(){
            expect($('.feed .entry').length).toBeGreaterThan(0); // check if entry has content
        });
    });

    // test selection of a different feed 
    describe('New Feed Selection', function(){
        var firstFeed; // variable to store title after 1st loadFeed() call
        var secondFeed;
        // async call to load a new feed & set firstTitle variable
        beforeEach(function(done){
            loadFeed(1, function(){
                firstFeed=$('.feed').html();
                loadFeed(2, done); // load a different feed to check for change
            });
        });

        // afterAll function to restore opening screen after testing
        afterAll(function(done){
            loadFeed(0, done);
        });
        
        it('should change the content', function(){
            secondFeed=$('.feed').html(); // set secondTitle variable 
            expect(secondFeed).not.toBe(firstFeed); // compare firstTitle to secondTitle
        });
    });
}());
