var MamnoonFeed = (function () {

  var mamnoonBlogspotBaseUrl = 'http://blog.mamnoonrestaurant.com'; // no trailing slash
  var feedFeatureId = 'feed-feature';
  var feedListId = 'feed-list';

  function init() {
  	initLoader();
  }

  function feedsLoaded() {
    
    var feed = new google.feeds.Feed( mamnoonBlogspotBaseUrl + '/feeds/posts/default?nocache='+new Date().getTime() );
    // feed.includeHistoricalEntries();
    // feed.setNumEntries(6);
    feed.load(function(result) {
      if (!result.error) {
        var feedFeature = document.getElementById( feedFeatureId ), 
            feedList = document.getElementById( feedListId ),
            dateToString = function ( s ) {
              var d = new Date( s );
              return d.getFullYear() + "-" + ( d.getMonth()+1 ) + "-" + d.getDate();
            };

        // feed-feature
        if ( result.feed.entries.length ) {        
          var entry = result.feed.entries[0];
          var div = document.createElement("div");
          div.innerHTML = '';
          div.innerHTML += '<p>' + dateToString( entry.publishedDate ) + '</p>';
          div.innerHTML += '<h4><a href="' + entry.link + '" target="_blank">' + entry.title + '</a></h4>';
          div.innerHTML += '<p><cite>by ' + entry.author + '</cite></p>';
          div.innerHTML += '<p>' + entry.contentSnippet + '</p>';
          div.innerHTML += '<p><a href="' + entry.link + '" target="_blank">More...</a></p>';
          feedFeature.appendChild(div);
        }

        // feed-list
        for (var i = 1; i < result.feed.entries.length; i++) {
          var entry = result.feed.entries[i];
          var li = document.createElement("li");
          li.innerHTML = '';
          li.innerHTML += '<p>' + dateToString( entry.publishedDate ) + '</p>';
          li.innerHTML += '<h5><a href="' + entry.link + '" target="_blank">' + entry.title + '</a></h5>';
          li.innerHTML += '<p>' + entry.contentSnippet + '</p>';
          feedList.appendChild(li);
        }
      } else {
        var container = document.getElementById("feed");
        container.innerHTML = '<p><a href="'+ mamnoonBlogspotBaseUrl +'" target="_blank">Mamnoon</a></p>';
      }
    });
  }

	function startLoading() {
		google.load("feeds", "1", {"callback" : feedsLoaded} );
	}

	function initLoader() {
	  var script = document.createElement("script");
	  script.src = "https://www.google.com/jsapi?callback=googleJsapiLoaded";
	  script.type = "text/javascript";
	  document.getElementsByTagName("head")[0].appendChild(script);
	}

	return {
		init: init,
		startLoading: startLoading
	}

})();

function googleJsapiLoaded() {
	MamnoonFeed.startLoading();
}