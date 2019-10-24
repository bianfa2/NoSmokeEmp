
var lightersMonitors;
var total = 0;
var time;
var countUp;

var gauge = app.gauge.create({
    el: '#gauge',
    type: 'circle',
    value: 0,
    valueText: '0/10',
    valueTextColor: '#4caf50',
    borderColor: '#4caf50',
    labelText: 'ENCENDIDOS HOY',
    labelTextColor: '#6d6d72',
    labelFontWeight: '800'
});

monitor_lighters();

function monitor_lighters(){

    disconnect_lighters();

    lightersMonitors = [];

    if(indexLighters){
        for(var i = 0; i < indexLighters; i++){
            lightersMonitors.push({
                socket: io('192.168.0.22:3000'),
                data: localStorage.getItem(i)
            });            
        }
        for(const key in lightersMonitors){
            lightersMonitors[key].socket.emit('lighter', lightersMonitors[key].data);
            lightersMonitors[key].socket.on(lightersMonitors[key].data, data =>{
                lightersMonitors[key].data = data;
                show_total();
                show_wasted();
                show_consume_today();
                show_last_time();
            });
        }
    }
    
}

function disconnect_lighters(){
    for(var key in lightersMonitors){
        lightersMonitors[key].socket.disconnect();
    }
}

function show_total(){

    var totalBox = document.getElementById('totalBox');
    total = 0;

    for(var key in lightersMonitors){
        if(lightersMonitors[key].data.total){
            total += lightersMonitors[key].data.total;
        }        
    }

    totalBox.textContent = total;

}

function show_wasted(){

    var wastedBox = document.getElementById('wasted');

    wastedBox.textContent = total*400;

}

function show_consume_today(){
    var current = 0;

    for(var key in lightersMonitors){
        if(lightersMonitors[key].data.current){
            current += lightersMonitors[key].data.current;
        }        
    }

    gauge.update({
        value: current/10,
        valueText: `${current}/10`
    });
    
    if(current>10){
        gauge.update({
            borderColor: '#ff3b30',
            valueTextColor: '#000000',
        });
    }else{
        gauge.update({
            borderColor: '#4caf50',
            valueTextColor: '#4caf50',
        });
    }

}

function show_last_time(){
    var times = [];

    lightersMonitors.forEach(monitor=>{
        times.push(new Date(monitor.data.last));
    })

    time = times.sort((a, b) => b - a)[0];

    count_up();

}

function count_up(){
    if(time){
        var today = new Date();
        const eventDate = time;
        
        var currentTime = today.getTime();
        var eventTime = eventDate.getTime()

        var realTime = currentTime - eventTime;
        
        var sec = Math.floor(realTime/1000);
        var min = Math.floor(sec/60);
        var hrs = Math.floor(min/60);
        var days = Math.floor(hrs/24);
        
        hrs = hrs % 24;
        min %= 60;
        sec %=60;
        
        hrs = (hrs<10)?"0"+hrs:hrs;
        min = (min<10)?"0"+min:min;
        sec = (sec<10)?"0"+sec:sec;    

        var daysLabel = document.getElementById("days");
        var hoursLabel = document.getElementById("hours");
        var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");

        daysLabel.textContent = days;
        hoursLabel.textContent = hrs;
        minutesLabel.textContent = min;
        secondsLabel.textContent = sec;

        countUp = setTimeout(count_up,1000);
    }
}

function clean_statistics(){
    document.getElementById('wasted').textContent = 0;
    document.getElementById('totalBox').textContent = 0;
    gauge.update({
        value: 0/10,
        valueText: '0/10'
    });

    if(countUp){
        clearTimeout(countUp);
        document.getElementById("days").textContent = 0;
        document.getElementById("hours").textContent = '00';
        document.getElementById("minutes").textContent = '00';
        document.getElementById("seconds").textContent = '00';
    }
}