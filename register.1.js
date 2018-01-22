//Waits untill the dom is loaded and then runs our JavaScript
$(document).ready(function(){

  // On page load, make an AJAX request to our API endpoint to retrieve all friends in DB
  $.ajax({
    url: 'http://rest.learncode.academy/api/adamws33/friends', 
    type: 'GET'
  }).done( (data)=>{
    // We get an array of friends back, iterate over the array
    data.forEach( (eachFriend)=>{
      // For each friend, Construct their full name and build a list-item from that
      let name = `${eachFriend.first} ${eachFriend.last}`;
      let theDiv=`${eachFriend.division}`
      let newElement= createFriend(name, eachFriend.id);
      // Append the new list item to our unordered list
      $('#tableBody').append(createTableRowP(name,theDiv))
    })
  }).fail( ()=>{
    //if our alert fails notify the user
    alert('AJAX call failed, unable to retrieve friends');
  })


  // On page load, make a clidk event listening for our Add A New Friend button
  $('#add').click((e) =>{
    // Stop the page from refreshing, and then get the value from the input field
    e.preventDefault();
    let newFriendName=$('#inputN').val(); 
    let newFriendEmail=$('#inputE').val(); 
    let newFriendDiv= $('#inputD').val(); 
    //Split the names based on the first space we find
    let firstName = newFriendName.substr(0, newFriendName.indexOf(' '));
    let lastName = newFriendName.substr(newFriendName.indexOf(' ')+1);
    let email= newFriendEmail
    let division= newFriendDiv
    // Send the new friend's information to the API

    $.ajax({
      url: 'http://rest.learncode.academy/api/adamws33/friends', 
      type: 'POST',
      data: {
        first: firstName,
        last: lastName,
        email: email,
        division: newFriendDiv
      }
    }).done( (data)=>{
      //When the API sends us the success message, construct a list-item and add it to the unordered list
      let newElement = createFriend(`${newFriendName} ${newFriendDiv}` , data.id);
      console.log (data.id)
      $('#tableBody').append(createTableRowP(newFriendName,newFriendDiv))
      $('#add').click(()=>{

      })
      //clear the input field
      $('#input').val("");
    }).fail( ()=>{
          //if our alert fails notify the user
      alert('AJAX call failed, unable to POST new friends');
    })
  })

  //On page load, make a click event listener for our unordered list
  // when somone clicks a list-item, this function will fire 
  $("#tableBody").on('click', 'tr', function(e){
    $.ajax({
      url: `http://rest.learncode.academy/api/adamws33/friends/${e.target.id}`, 
      type: 'DELETE'
    }).done( ()=>{
      $(this).remove();
    }).fail( ()=>{
          //if our alert fails notify the user
      alert('AJAX call failed, unable to DELETE friends');
    })
  })

    function createFriend(name,id){
      return $(`<li>${name}</li>`).addClass('list-group-item list-group-item-action list-group-item-dark').attr('id', id);
    }
    function createTableRowP(person,div){

      let row = $(`<tr></tr>`)
      let name = $(`<td>${person}</td>`)
      let divIn = $(`<td>${div}</td>`)


      row.append(name)
      row.append(divIn)
      return row
    }
})  