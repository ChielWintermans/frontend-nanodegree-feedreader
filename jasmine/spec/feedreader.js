$(function() {

    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        describe('Each Feed', function(){
            it('has a url', function(){
                allFeeds.forEach(function(feed){
                    expect(feed.url).toBeDefined();
                    expect(feed.url.length).not.toBe(0);
                });
            });
            it('has a name', function(){
                allFeeds.forEach(function(feed){
                    expect(feed.name).toBeDefined();
                    expect(feed.name.length).not.toBe(0);
                });
            });
        });
    });

    describe('The menu', function(){
        it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        it(' is shown when the menu icon is clicked & hidden when the icon is clicked again', function(){
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function(){
        beforeEach(function(done){
            loadFeed(0,done);
        });
        it('should contain at least a single .entry element within the feed container', function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function(){
        var thisTitle=$('.header-title').html();
        beforeEach(function(done){
            loadFeed(1, done);
        });
        afterEach(function(done){
            loadFeed(0, done);
        });
        it('should change the content', function(){
            expect($('header-title').html()).not.toBe(thisTitle);
        });
    });
}());
