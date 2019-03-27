window.onload = function () {
    var modal = document.createElement('div');

    modal.innerHTML = '<div style="background: #fefefe; padding: 2rem 1.5rem; margin: 45% auto auto auto;"> <form action="#" id="pihole-form"> <div style="display: inline-block"> <label for="hour">Hours</label><br> <input type="number" name="hour"> </div> <div style="display: inline-block"> <label for="min">Minutes</label><br> <input type="number" name="min"> </div> <div style="display: inline-block"> <label for="sec">Seconds</label><br> <input type="number" name="sec"> </div> <div> <input type="button" value="suspend" id="pihole-submit"> </div> </form> </div>';
    document.body.appendChild(modal)

    document.getElementById('pihole-submit').addEventListener('click', function(e){
        var apikey = document.getElementById('pihole').dataset.api;
        var piholeFormData = {};
        piholeForm = new FormData(document.querySelector('form#pihole-form'));
        piholeForm = piholeForm[0] || piholeForm;
        piholeForm.forEach(function (data, key) {
            piholeFormData[key] = data;
        });

        var time = (piholeFormData.hour || 0) * 60 * 60 + (piholeFormData.min || 0) * 60 + (piholeFormData.sec || 0);

        disable(time, apikey, cleanup)
    });
    document.getElementById('pihole-form').addEventListener('submit', function(e){
        e.preventDefault();
    });
}

var disable = function(time, apikey, cb) {
    fetch(`http://pi.hole/admin/api.php?disable=${time}&auth=${apikey}`)
        .then(res => {
            return res;
        }).catch(err => console.error(err));
    cb();
}

var cleanup = function(){
    window.close();
}