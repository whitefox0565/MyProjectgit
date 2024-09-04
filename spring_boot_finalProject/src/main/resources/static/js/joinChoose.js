/**
 * 
 */
 
 $(document).ready(function() {

   $(".chooseMUButton").hover(
         function() {
             $(this).find('a').css({"background-color":"#333333", "color" : "whitesmoke"});
       },
       function() {
           $(this).find('a').css({"background-color":"black", "color" : "white"});
       }
   );
    
});