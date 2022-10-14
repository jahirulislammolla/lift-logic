    var currentLevel = 0;
    var maxLevel = 4;
    var moveTopStatus = false;
    var moveBottomStatus = false;
    var moveTopRequest = [];
    var moveBottomRequest= [];
    var openRequest = [];
    var delayMove = 3000;
    var delayOpenClose = 2000;
    var stayStatus = true;
    var doorStatus = 'close';
    var lenMoveTop = 0;
    var lenMoveBottom = 0;
    var lenOpenTop = 0;
    var lenOpenBottom = 0;


    // door stuatus open/close
    var openDoor = function (level) {
        if(doorStatus != 'open' && stayStatus ){
            doorStatus='open';
            openRequest = openRequest ? openRequest.filter(element => element != level) : [];
            if(moveTopStatus){
                moveTopRequest = moveTopRequest ? moveTopRequest.filter(element=> element != level) : [];
            }
            if(moveBottomStatus){
                moveBottomRequest = moveBottomRequest ? moveBottomRequest.filter(element=> element != level) : [];
            }
            console.log("Open Door level : "+ level,moveTopRequest,moveBottomRequest,openRequest);
            setTimeout(closeDoor, 5000);
        }
    }
    var closeDoor = function (){
        doorStatus='close';
        console.log("Close Door");
        if(moveTopStatus){
            moveTop();
        }
        if(moveBottomStatus){
            moveBottom();
        }
    }
    //type top/bottom
    var liftMoveRequest = function( level, type ){
        console.log('Resquest move : '+level);
        if(type=='top' && !moveTopRequest.includes(level)){
            moveTopRequest.push(level);
        }
        if(type=='down' && !moveBottomRequest.includes(level))
        {
            moveBottomRequest.push(level);
        }
        if(stayStatus){
            if(level > currentLevel){
                moveTopStatus = true;
                moveTop();
            }
            else{
                moveBottomStatus=true;
                moveBottom();
            }
        } 
    }
    var liftOpenRequest = function(level){
        console.log('Resquest Open : '+level);
        if(!openRequest.includes(level))
        {
            openRequest.push(level);
        }
        if(stayStatus){
            if(level < currentLevel){
                moveBottomStatus=true;
                moveTop();
            }
            if(level > currentLevel){
                moveTopStatus = true;
                moveBottom();
            }
        }
    }
    var moveTop = function(){
        console.log(currentLevel,moveTopRequest,moveBottomRequest,openRequest);

        if(openRequest.includes(currentLevel) || moveTopRequest.includes(currentLevel)){
            openDoor(currentLevel);
        }
        else{
            lenOpenTop = openRequest ? openRequest.filter(element=> element > currentLevel).length : 0;
            lenMoveTop = moveTopRequest ? moveTopRequest.filter(element=> element > currentLevel).length : 0;
            lenOpenBottom = openRequest ? openRequest.filter(element=> element < currentLevel).length : 0;
            lenMoveBottom = moveBottomRequest ? moveBottomRequest.filter(element=> element < currentLevel).length : 0;
            if(lenOpenTop || lenMoveTop){
                currentLevel +=1;
                setTimeout(moveTop,delayMove);
            }
            else if(lenOpenBottom || lenMoveBottom){
                moveTopStatus=true;
                moveBottomStatus=false;
                currentLevel -=1;
                setTimeout(moveBottom, delayMove);
            }
        }
    }
    var moveBottom = function(){
        console.log(currentLevel,moveTopRequest,moveBottomRequest,openRequest);
        if(openRequest.includes(currentLevel) || moveBottomRequest.includes(currentLevel)){
            openDoor(currentLevel);
        }
        else{
            lenOpenTop = openRequest ? openRequest.filter(element=> element > currentLevel).length : 0;
            lenMoveTop = moveTopRequest ? moveTopRequest.filter(element=> element > currentLevel).length : 0;
            lenOpenBottom = openRequest ? openRequest.filter(element=> element < currentLevel).length : 0;
            lenMoveBottom = moveBottomRequest ? moveBottomRequest.filter(element=> element < currentLevel).length : 0;
            if(lenOpenBottom || lenMoveBottom){
                currentLevel -=1;
                setTimeout(moveBottom, delayMove);
            }
            else if(lenOpenTop || lenMoveTop){
                currentLevel +=1;
                moveTopStatus=false;
                moveBottomStatus=true;
                setTimeout(moveTop, delayMove);
            }
        }
    }

