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
        var pluginName = "booking",
            defaults = {
                //someDefault: "Some Value"
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

            // Fire up the plugin
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
//                console.log("[" + this._name + "-plugin]: Initiated");
//                console.log(this);
                
                var bookingForm = this.$el.children();
                
                //select cache
                $selectCountry = bookingForm.find('.selCountry');
                $selectResort = bookingForm.find('.selResort');
                
                //datepickers cache
                $checkInDate = bookingForm.find('.checkIn');
                $triggerIn = bookingForm.find('.triggerIn');
                $checkOutDate = bookingForm.find('.checkOut');
                $triggerOut = bookingForm.find('.triggerOut');
                $selectAdult = bookingForm.find('.selAdult');
                $selectChildren = bookingForm.find('.selChildren');
                
                
                this.initPickers($checkInDate, $checkOutDate);
                
                //binding events
                $checkInDate.change(function() {
                   Plugin.prototype.changeChkIn($(this));
                    console.log($(this).val());
                    console.log("changing...");
                });
                
                //Select changes
                
                $selectCountry.change(function() {
                   Plugin.prototype.countryChange($(this));
                });
                $selectResort.change(function() {
                   Plugin.prototype.resortChange($(this));
                });
                
            },
            
            //Select functions
            countryChange: function updateResort( country ) {
                var selectedCountry = $(country).val();
                var selResort = $(country).parent().next().find('.selResort');
                
                if( selectedCountry === "Jamaica") {
                    $(selResort).val("Negril");
                }
                else {
                    if( selectedCountry === "Turks And Caicos Islands"){
                        $(selResort).val("Turks");
                    } else{
                        $(selResort).val("Select Resort");
                    }
                }
                
                console.log(selectedCountry);
               
            },
            
            resortChange: function updateCountry( resort ) {
                var selectedResort = $(resort).val();
                var selCountry = $(resort).parent().prev().find('.selCountry');
                
                if( (selectedResort === "Negril") || (selectedResort === "Rios") ) {
                    $(selCountry).val("Jamaica");
                }
                else {
                    if( selectedResort === "Turks"){
                        $(selCountry).val("Turks And Caicos Islands");
                    } else{
                        $(selCountry).val("Select Destination");
                    }
                }
                
                console.log(selectedResort);
               
            },
            //End select functions
            
            //Datepickers
            initPickers: function startPickers( pickIn, pickOut ) {
                var pickIn = $checkInDate;
                var pickOut = $checkOutDate;
                minCheckIn = Plugin.prototype.addDate(new Date(), 3);
                minCheckOut = Plugin.prototype.addDate(new Date(), 6);
                
                //pickerIn init
                $(pickIn).datepicker({
                    dateFormat: "mm/dd/yy",
                    minDate: minCheckIn,
                    onSelect: function(date){
                        Plugin.prototype.changeChkOut( date );
                    }
                }); 
                
                //pickerOut init
                $(pickOut).datepicker({
                    dateFormat: "mm/dd/yy",
                    minDate: minCheckOut,
                }); 
            },
            
            openDateIn: function( input ) {
                input = $(this);
                    var id= input.attr('id');
                    $("#"+id).datepicker("show");
                
            },
            
            changeChkIn: function pickDateIn( chkInPicker ) {
                
                $(chkInPicker).datepicker({
                    onSelect: function(date){
                        Plugin.prototype.changeChkOut( date );
                        console.log("hello from onSelect....")
                    }
                }); 
            },
            
            changeChkOut: function setDateOut( chkInDate ) {
                //add check out dates
                var outOn = Plugin.prototype.addDate(chkInDate,3);
                var outDef = Plugin.prototype.addDate(chkInDate,7);
                
                //set check out dates
                $checkOutDate.datepicker("option","minDate", outOn);
                $checkOutDate.datepicker("setDate", outDef);
            },
            
            addDate: function addDays( stringDate, days ) {
               
               var startDate = new Date(stringDate);
               
               startDate.setDate(startDate.getDate() + days);
               var dd = startDate.getDate();
               var mm = startDate.getMonth() + 1;
               var y = startDate.getFullYear();

               var endDate = mm + '/' + dd + '/' + y;
               return endDate;
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