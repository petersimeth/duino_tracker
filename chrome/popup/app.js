async function fetchData() {
    // Fetch data from the API
    let user_name = localStorage['username']
    let respons = await fetch('https://server.duinocoin.com/users/' + user_name);
    let data = await respons.json();



    document.getElementById('balance_value').innerText = data.result.balance.balance.toFixed(2);
    document.getElementById('username').innerText = data.result.balance.username;
    document.getElementById('stake_amount').innerText = data.result.balance.stake_amount


    // Create String for Verification Status
    if (data.result.balance.verified == "yes") {
        document.getElementById("verified_status_false").style.visibility = "hidden";
    } 
    else {
        document.getElementById("verified_status_true").style.visibility = "hidden";
    }

    
    // Calculate Days till the Stake expires
    var stake_date = new Date(data.result.balance.stake_date*1000);
    var current_date = new Date();
    var difference_in_days = (stake_date.getTime() - current_date.getTime()) / (1000 * 3600 * 24);
    if (difference_in_days < 0) {
        document.getElementById('staking_value').innerText = '-'
        document.getElementById('stake_warning').innerText = "STAKE!!!!!"
    }
    else {
        document.getElementById('staking_value').innerText = Math.round(difference_in_days)
    }
        
        
    // Miner
    var hashrate_combined = 0.0
    var miner_count = 0
    for (const miner of data.result.miners) {
        miner_count = miner_count + 1
        hashrate_combined = hashrate_combined + miner.hashrate
    }
    
    if (hashrate_combined.toFixed(0) > 100000) {
        var hashrate_combinded_print = (hashrate_combined/100000).toFixed(2) + " mH/S"
    }
    else if (hashrate_combinded_print > 1000) {
        var hashrate_combinded_print = (hashrate_combined/1000).toFixed(2) + " kH/S"
    }
    else {
        var hashrate_combinded_print = hashrate_combined.toFixed(2) + " H/S"
    }
    
    document.getElementById("miners_count").innerText = miner_count
    document.getElementById("hashrate_combined").innerText = hashrate_combinded_print
    document.getElementById('username_value').value = user_name
}


// Update the Username in the local Storage
document.getElementById('set_username_button').onclick = () => {
    let value = document.getElementById('username_value').value;
    localStorage['username'] = value
    console.log("localStorage Set:key='username' value=" + value)
    fetchData();
}


// Disable Scrolling
var styleElement = document.createElement('style');
    styleElement.id = 'remove-scroll-style';
    styleElement.textContent =
        'html::-webkit-scrollbar{display:none !important}' +
        'body::-webkit-scrollbar{display:none !important}';
    document.getElementsByTagName('body')[0].appendChild(styleElement);


// Get the input field
var input = document.getElementById("username_value");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("set_username_button").click();
        }
    }
);


fetchData()