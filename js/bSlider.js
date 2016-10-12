/*
// Common JS
// Date: November 2013
// Developers:
//  Josue Enamorado - jenamorado@sanservices.hn
// Description:
//  This is a simple boilerplate for plugins with requirejs
// ---------------------------------------------------------
*/

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function(){
    // Defaults
        var pluginName = "bSlider",
            defaults = {
                width: 1440, 
                height: 604,
                navigation: true,
                dots: true, 
                auto:true,
                pausetime: 4000,
                fadeSpeed: 300
            };

    // Plugin Constructor
        function Plugin( element, options ) {
            this.$el        = $(element);
            this._defaults  = defaults;
            this._name      = pluginName;

            // jQuery has an extend method that merges the
            // contents of two or more objects, storing the
            // result in the first object. The first object
            // is generally empty because we don't want to alter
            // the default options for future instances of the plugin
            this.options    = $.extend( {}, defaults, options); // Merging defaults with parametes received
            
           // console.log("Plugin->Constructor");
            this.init();            
        }
    

    // Plugin methods
        Plugin.prototype = {
            init: function() {
                // Place initialization logic here
                // You already have access to the DOM element and
                // the options via the instance, e.g. this.$el
                // and this.options
                // you can add more functions like the one below and
                // call them like so: this.yourOtherFunction(this.$el, this.options).
              //  console.log("Init Slider");

                
                var wrapper = this.$el.children().wrapAll($("<div>").attr("class","slides")).parent();
                var container = wrapper.wrapAll($("<div>").attr("class","sliderContent")).parent();
                                                
                //Add navigation
                if(defaults.navigation)
                    wrapper.append('<div class="nav"><div class="leftnav2"><div class="arrow" /></div><div class="rightnav2"><div class="arrow" /></div></div>');
                
                if(defaults.dots)
                    wrapper.append('<div class="dot-nav"><div class="playSlides"><span class="iconmoon-pause2" /></div><ul class="list-inline indicators" /></div>');
                                    
                var indicator = container.find('.indicators');
                
                wrapper.find('img').each(function()
                {                                         
                    // dots navigation
                    if (defaults.dots === true)
                        indicator.append('<li class="indicator"><span></span></li>');                 
                    
                    $(this).wrapAll('<a href="https://www.google.hn/" class="image" />');                    
                });			

                $bPlaying = this.options.auto;
                $imgs = wrapper.find('a.image');
                $imgCount = ($imgs.length) - 1; //to prevent blank slide at the end.
                $navPrev = wrapper.find('div.leftnav2');
                $navNext = wrapper.find('div.rightnav2');
                $dots = container.find('.indicators li');
                $play = container.find('.playSlides span');
                $timer = 0;
                
                wrapper.width(this.options.width)
                       .height(this.options.height); 
                    
                $imgs.hide().first().addClass('current').show(); //set current image
                $dots.first().addClass('current');
                
                //Finally start playing
                this.autoPlay($bPlaying);     
                
                //Bind Events
                $navNext.click(function(){
                    Plugin.prototype.next();
                });

                $navPrev.click(function(){
                    Plugin.prototype.prev();
                });

                $dots.click(function(){  // Click indicator
                    clearInterval($timer);
                    Plugin.prototype.moveTo($(this).index());
                    $play.addClass('pause');
                    $bPlaying = false;                
                });

                $play.click(function()
                {
                    clearInterval($timer);
                    $bPlaying = !$bPlaying;
                    $play.toggleClass('pause');
                    Plugin.prototype.autoPlay($bPlaying);                    
                });                                                           
            },
            
            //Play
            autoPlay: function(playing)
            {
                //console.log("Autoplay->"+playing);
                if(playing == true) {
                    $timer = setInterval(function() {
                       Plugin.prototype.next(); 
                    },defaults.pausetime);
                } else{
                   clearInterval($timer);
                }
            },            
            // Get current index
            getCurrentIndex: function()
            {            
                //console.log("CurrentIndex->"+$imgs.filter('.current').index());
                return $imgs.filter('.current').index();
            },
            //Move to slide
            moveTo: function(index)
            { 
                $imgs
                    .removeClass('current')
                    .fadeOut(defaults.fadeSpeed)
                    .eq(index)
                    .fadeIn(defaults.fadeSpeed)
                    .addClass('current');
                $dots
                    .removeClass('current')
                    .eq(index)
                    .addClass('current');

            },
            //Next Slide
            next : function() 
            {
                var index = this.getCurrentIndex();
                if (index < $imgCount)
                    this.moveTo(index + 1);         // Go next
                else
                    this.moveTo(0);                 // If last go first
            },
            //Previous Slide
            prev : function() 
            {
                var index = this.getCurrentIndex();
                if (index > 0)
                    this.moveTo(index - 1); // Go previous
                else
                    this.moveTo($imgCount); // If first go last                              
            }                                                        
        };

    // First we check if we can access the plugin method, then we have
    // a really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations on the same element.
        $.fn[pluginName] = function ( options ) {

            if ( typeof options === 'string' ) {
                var args = Array.prototype.slice.call( arguments, 1 );

                this.each(function() {
                    var instance = $.data( this, pluginName );

                    if ( !instance ) {
                        console.error( "cannot call methods on " + pluginName + " prior to initialization; " +
                        "attempted to call method '" + options + "'" );
                        return;
                    }

                    if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
                        console.error( "no such method '" + options + "' for " + pluginName + " instance" );
                        return;
                    }

                    instance[ options ].apply( instance, args );
                });
            }
            else {
                this.each(function() {
                    var instance = $.data( this, pluginName );
                    if ( !instance ) {
                        $.data( this, pluginName, new Plugin( this, options ));
                    }
                });
            }

            return this;
        };
}( jQuery ));