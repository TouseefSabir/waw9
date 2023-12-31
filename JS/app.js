//The URIs of the REST endpoint
IUPS = "https://prod-16.northeurope.logic.azure.com:443/workflows/e708edfeadff4935959b8498f2c5f424/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=fJcWn0iuycR-Holz7f51IR-1IWrOwfI0gXphpoScwOM";
RAI = "https://prod-40.northeurope.logic.azure.com:443/workflows/991fcc87d37d435d8c485d61b6c761cf/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dQ-TXieMZ-rI2tmx6HwiDVwzJrBpON7cDfX-eak3Mmo";

BLOB_ACCOUNT = "https://imgshareb00958967.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retvideos").click(function(){

      //Run the get asset list function
      getvideo();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
 //Create a form data object
 submitData = new FormData();
 //Get form variables and append them to the form data object
 submitData.append('FileName', $('#FileName').val());
 //submitData.append('userID', $('#userID').val());
 submitData.append('userName', $('#userName').val());
 submitData.append('Age', $('#Age').val());
 submitData.append('userID', $('#userID').val());
 submitData.append('Title', $('#Title').val());
 submitData.append('publisher', $('#publisher').val());
 submitData.append('Producer', $('#Producer').val());
 //submitData.append('Rating', $('#Rating').val());
 submitData.append('Genre', $('#Genre').val());
 //submitData.append('userName', $('#userName').val());
 submitData.append('File', $("#UpFile")[0].files[0]);

 //Post the form data to the endpoint, note the need to set the content type header
 $.ajax({
 url: IUPS,
 data: submitData,
 cache: false,
 enctype: 'multipart/form-data',
 contentType: false,
 processData: false,
 type: 'POST',
 success: function(data){

 }
 });

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getvideo(){

 //Replace the current HTML in that div with a loading message
 $('#videoList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
 $.getJSON(RAI, function( data ) {
 //Create an array to hold all the retrieved assets
 var items = [];

 //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
 $.each( data, function( key, val ) {
 items.push( "<hr />");
 items.push("<img src='"+BLOB_ACCOUNT + val["filePath"] +"' width='400'/> <br />")
 items.push( "File : " + val["fileName"] + "<br />");
 items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
 items.push( "<hr />");
 });
 //Clear the assetlist div
 $('#videoist').empty();
 //Append the contents of the items array to the ImageList Div
 $( "<ul/>", {
 "class": "my-new-list",
 html: items.join( "" )
 }).appendTo( "#videoList" );
 });
}









