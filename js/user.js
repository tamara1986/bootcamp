// Fetch user id from get parameter
var url = new URL(window.location.href);
var user_id = url.searchParams.get("id");
var user_image = document.getElementById('user-image');
var username = document.getElementById('username');
var feeds = document.getElementById('feed-list');

// Load user data
function loadUserData() {
    getUsers(true);
    getStatuses(user_id);
    getImages(user_id);
}

function displayUser() {
    user_list.forEach(function(user) {
        if(user.id == user_id) {
            if(user.image == null) {
                user_image.innerHTML = '<img src="img/no-img.png" />';
            } else {
                user_image.innerHTML = '<img src="img/' + user.image + '" />';
            }
            username.innerHTML = user.name;
        }
    });
}