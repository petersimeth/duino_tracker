


async function fetchData() {
    // Fetch data from the API
    let user_name = localStorage['username']
    let respons = await fetch('https://server.duinocoin.com/users/' + user_name);
    let data = await respons.json();

    // Create String for Verification Status
    if (data.result.balance.verified == "yes") {
        verified_status = ' <svg fill="#f2a710" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>'
    }
    else {
        verified_status = ' <svg fill="#3b362c" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>'
    }

    document.getElementById('balance_value').innerText = data.result.balance.balance.toFixed(2);
    document.getElementById('username').innerHTML = data.result.balance.username + " " + verified_status;
    
    

    // Calculate Days till the Stake expires
    var stake_date = new Date(data.result.balance.stake_date*1000);
    var current_date = new Date();
    var Difference_In_Time = stake_date.getTime() - current_date.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    var Difference_In_Days_print = ''

    if (Difference_In_Days < 0) {
        Difference_In_Days_print = '-'
        document.getElementById('stake_warning').innerText = "STAKE!!!!!"
    }
    else {
        Difference_In_Days_print = Math.round(Difference_In_Days)
    }
        
    var stake_amount = data.result.balance.stake_amount
    document.getElementById('staking_value').innerText = Difference_In_Days_print
    document.getElementById('stake_amount').innerText = stake_amount
    
        
    // Miner
    var hashrate_combined = 0.0
    var miner_count = 0
    for (const miner of data.result.miners) {
        miner_count = miner_count + 1
    hashrate_combined = hashrate_combined + miner.hashrate

    }
    


    hashrate_combinded_print = hashrate_combined.toFixed(0)

    if (hashrate_combined.toFixed(0) > 100000) {
        hashrate_combinded_print = (hashrate_combined/100000).toFixed(2) + " mH/S"
    }
    else if (hashrate_combinded_print > 1000) {
        hashrate_combinded_print = (hashrate_combined/1000).toFixed(2) + " kH/S"
    }
    else {
        hashrate_combinded_print = hashrate_combined.toFixed(2) + " H/S"
    }
    
    //document.getElementById("miners").innerHTML = "<span class='highlight'>" + miner_count + "</span> Nodes online <br>with a total rate of <span class='highlight'>" + hashrate_combinded_print + "</span>";

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


fetchData()