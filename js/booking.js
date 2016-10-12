 $(function booking (){
     
     var $destinationHeader = $(".selectDestination .customSelect");
     var $resortHeader = $(".selectResort .customSelect");
     
    $('#frmBooking').on('submit', function(e) {
        var elements = this.elements;
        var valid = {};
    });

    $("#frmBooking").trigger("reset");
     
    //Selects
     //New <ul />
     /*$destinationHeader.on('click', function() {
         openSelect(this);
     });
     
     $resortHeader.on('click', function() {
         openSelect(this);
     });
     
     //Functions open / pick selection
     function openSelect(mySelect) {
         var $this = $(mySelect);
         var $options = $this.next(".panel");
                    
         $this.toggleClass("active");
         
         
         chooseOption($this, $options);
     }
     
     function chooseOption(select, options) {
         var $mySelect = select;
         var $optionWrapper = options;
         var $list = $optionWrapper.children();
         
         $optionWrapper.toggleClass("visible");
         
         $optionWrapper.on('click', 'li', function() {
             $list.removeClass('selected');
             var selection = $(this).addClass('selected');
             $mySelect.toggleClass("active");
             $optionWrapper.toggleClass("visible");
             $mySelect.text(selection.text());
             $mySelect.append("<div class=\"arrow\" />")
             var $selectedVal = $optionWrapper.find(".selected").data("val");
         alert($selectedVal);
         });
         
         
     }*/
     //Old Selects
     $(".selCountry").on('change', function() {
          var element = $(this);
          var selection = element.val();

          if(selection === "Jamaica"){
              $(".selResort").val("Negril");
          }
          else {
              if(selection === "Turks And Caicos Islands"){
                  $(".selResort").val("Turks");
              } else{
                  $(".selResort").val("Select Resort");
              }
          }
      });
     
      $(".selResort").on('change', function() {
          var element = $(this);
          var selection = element.val();

          if( (selection === "Negril") || (selection === "Rios") ){
              $(".selCountry").val("Jamaica");
          }
          else {
              if(selection === "Turks"){
                  $(".selCountry").val("Turks And Caicos Islands");
              } else{
                  $(".selCountry").val("Select Destination");
              }
          }
      });
     
    //Datepickers
    var minCheckIn = addDays(new Date(), 3);
    var minCheckOut = addDays(new Date(), 6);
    
    $( ".checkIn" ).datepicker({
        dateFormat: "mm/dd/yy",
        minDate: minCheckIn,
        onSelect: function(date){
            var outOn = addDays(date,3);
            var outDef = addDays(date,7);
            $(".checkOut").datepicker("option","minDate", outOn);
            $(".checkOut").datepicker("setDate", outDef);
        }
    }); 
    $( ".checkOut" ).datepicker({
        dateFormat: "mm/dd/yy",
        minDate: minCheckOut,
    });
    
   function addDays(stringDate, days){
       var startDate = new Date(stringDate);
        
        startDate.setDate(startDate.getDate() + days);
        var dd = startDate.getDate();
        var mm = startDate.getMonth() + 1;
        var y = startDate.getFullYear();
        
        var endDate = mm + '/' + dd + '/' + y;
        return endDate;
    }
});