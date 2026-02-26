//Define variables
var next = document.getElementById('next');
var totalScore = document.getElementById('totalScore');
var timer = document.getElementById('timer');
var count = 0;
var scoreCount = 0;
var duration = 0;
var qaSet = document.querySelectorAll('.question_set');
var qaAnsRow = document.querySelectorAll('.question_set .question_answer_row input');


//Add eventlistener for every user click on the application
next.addEventListener('click',function(){
    step();
    duration =60
})


//Display each question for 1 minute.
qaAnsRow.forEach( function(qaAnsRowSingle){
    qaAnsRowSingle.addEventListener('click', function(){
        setTimeout(function(){
            step();
            duration =60
        },500)


        //Evaluate user's score.
        var valid = this.getAttribute("valid");
        if(valid == "valid"){
            scoreCount +=10;           
            totalScore.innerHTML = scoreCount;
        }else{
            scoreCount -=10;           
            totalScore.innerHTML = scoreCount;            
        }
    })
});


//Display 1 question on the screen at a time.
function step()
{
    count +=1;
    for(var i=0; i< qaSet.length; i++){
        qaSet[i].className= 'question_set';
    }
    qaSet[count].className = 'question_set active';
    if(count == 10){
        next.style.display = 'none';
        clearInterval(durationTime);
        timer.innerHTML=0;       
        
        //Store user's result in browser's local storage
        localStorage.setItem("Result", scoreCount)

        //Store result in MYSQL using ajax call
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("POST", "./ajaxFile/get_data.php",true);
        httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        httpRequest.onreadystatechange=function(){
            if(httpRequest.readyState==4 && httpRequest.status==200){
                document.getElementById("response").innerHTML=httpRequest.responseText;
            }
        }
        httpRequest.send(scoreCount);
    }
}


//Calculate time in seconds.
var durationTime = setInterval(function(){
    if(duration == 60){
        duration = 0;
    }
    duration +=1;
    timer.innerHTML=duration;
    if(timer.innerHTML == "60"){
        step();
    }
},1000);