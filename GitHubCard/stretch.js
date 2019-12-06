/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get("https://api.github.com/users/nicbongo")
    .then(response => {
    console.log(response);
    
        const newUser = userCreator(response.data);
        cardContainer.appendChild(newUser);
    })
    .catch (error => {
    console.log(error);
});

function userCreator (object) {
  // create elements
  const dataCard = document.createElement("div"),
        dataImg = document.createElement("img"),
        dataInfo = document.createElement("div"),
        dataName = document.createElement("h3"),
        dataUserName = document.createElement("p"),
        dataLocation = document.createElement("p"),
        dataProfile = document.createElement("p"),
        dataProfLink = document.createElement("a"),
        dataFollowers = document.createElement("p"),
        dataFollowing = document.createElement("p"),
        dataBio = document.createElement("p"); 
    
  // classes
  dataCard.classList.add("card");
  dataInfo.classList.add("card-info");
  dataName.classList.add("name");
  dataUserName.classList.add("username");

  //text content
  dataImg.src = object.avatar_url;
  dataName.textContent = object.name;
  dataUserName.textContent = object.login;
  dataLocation.textContent = `Location: ${object.location}`;
  dataUserName.textContent = object.login;
  dataProfLink.href = object.html_url;
  dataProfLink.textContent = object.html_url;
  dataProfile.textContent = `Profile: `;
  dataFollowers.textContent = `Followers: ${object.followers}`;
  dataFollowing.textContent = `Following: ${object.following}`;
  dataBio.textContent = `Bio: ${object.bio}`;

  // append
  dataProfile.appendChild(dataProfLink);
  dataInfo.appendChild(dataName);
  dataInfo.appendChild(dataUserName);
  dataInfo.appendChild(dataLocation);
  dataInfo.appendChild(dataProfile);
  dataInfo.appendChild(dataFollowers);
  dataInfo.appendChild(dataFollowing);
  dataInfo.appendChild(dataBio);
  dataCard.appendChild(dataImg);
  dataCard.appendChild(dataInfo);

  return dataCard
}

const cardContainer = document.querySelector(".cards");

axios.get(`https://api.github.com/users/nicbongo/followers`)
  .then(followers => {
    // console.log(response);
    followers.data.forEach(follower => {
      axios.get(follower.url)
      .then(follower => {
        cardContainer.appendChild(userCreator(follower.data))
      })
      
    });
    
  })
  .catch (error => {
    console.log(error);
  });

