 $(function(){

    $('#frmBooking').on('submit', function(e) {
        var elements = this.elements;
        var valid = {};
    });

    $("#frmBooking").trigger("reset");
     
    //Selects
     $("#destination").on('change', function() {
          var element = $(this);
          var selection = element.val();

          if(selection === "Jamaica"){
              $("#resort").val("Negril");
          }
          else {
              if(selection === "Turks And Caicos Islands"){
                  $("#resort").val("Turks");
              } else{
                  $("#resort").val("Select Resort");
              }
          }
      });
     
      $("#resort").on('change', function() {
          var element = $(this);
          var selection = element.val();

          if( (selection === "Negril") || (selection === "Rios") ){
              $("#destination").val("Jamaica");
          }
          else {
              if(selection === "Turks"){
                  $("#destination").val("Turks And Caicos Islands");
              } else{
                  $("#destination").val("Select Destination");
              }
          }
      });
     
    //Datepickers
    var minCheckIn = addDays(new Date(), 3);
    var minCheckOut = addDays(new Date(), 6);
    
    $( "#dateIn" ).datepicker({
        dateFormat: "mm/dd/yy",
        minDate: minCheckIn,
        onSelect: function(date){
            var outOn = addDays(date,3);
            var outDef = addDays(date,7);
            $("#dateOut").datepicker("option","minDate", outOn);
            $("#dateOut").datepicker("setDate", outDef);
        }
    }); 
    $( "#dateOut" ).datepicker({
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