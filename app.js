function toReverseString(str){
   var splitString=str.split("");
   var charList=splitString.reverse();
   var stringReversed=charList.join("");
   return stringReversed;
}

function isPalindrome(str){
    var reversedString=toReverseString(str);
    
    return str===reversedString;
}



function convertDateToString(date){
    var dateStr={day:'',month:'',year:''};
    if(date.day<10){
        dateStr.day='0'+date.day
    }else{
        dateStr.day=date.day.toString();
    }
    if(date.month<10){
        dateStr.month='0'+date.month
    }else{
        dateStr.month=date.month.toString();
    }
    dateStr.year=date.year.toString();

    return dateStr;
}

function allDateFormat(date){
    var convertedDate=convertDateToString(date);
    var ddmmyyyy = convertedDate.day  + convertedDate.month +convertedDate.year
    var mmddyyyy = convertedDate.month + convertedDate.day +convertedDate.year;
    var yyyymmdd = convertedDate.year + convertedDate.month +convertedDate.day
    var ddmmyy = convertedDate.day + convertedDate.month +convertedDate.year.slice(-2);
    var mmddyy = convertedDate.month + convertedDate.day +convertedDate.year.slice(-2);
    var yymmdd = convertedDate.year.slice(-2) +convertedDate.month + convertedDate.day;

    var listDateFormat=[ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
    return listDateFormat;
}
// console.log(allDateFormat(currdate));
function checkPalindromeForAllDateFormats(date){
    var datesInAllFormat=allDateFormat(date);
    var flag=false;
    
    for(var i=0;i<datesInAllFormat.length;i++){
        if(isPalindrome(datesInAllFormat[i])){
            flag=true;
            // var palindromeFormat=datesInAllFormat[i];
            // break;
        }
    }
    // if(flag){
    //     console.log("your birthday is a palindrome",palindromeFormat);
    // }
    // else{
    //     console.log("Not palindrome");
    // }
    return flag
}


function isLeap(year){
    if(year%4===0){
        if(year%100===0){
            if(year%400===0){
                return true;
            }
            else{
                return false;
            }
        }else{
            return true;
        }
    }
    else{
        return false;
    }
}

function getNextDate(date){
    var day=date.day;
    var month=date.month;
    var year=date.year;

    day=day+1;

    var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
    if(month===2){
        if(isLeap(year)){
            if(day>29){
                day=1;
                month++;
            }
        }else{
            if(day>28){
                day=1;
                month++;
            }
        }
    }else{
        if(day>daysInMonth[month-1]){
        day=1;
        month++;
    }
    }
    if(month>12){
        month=1;
        year++;
    }

    return {
        day:day,
        month:month,
        year:year
    }
    

}

function nextPalindromeDate(date){
    var nextDate=getNextDate(date);
    var counter=0;
    while(1){
        counter++;
        if(checkPalindromeForAllDateFormats(nextDate)){
            break;
            
        }
        
            nextDate=getNextDate(nextDate);
        
        
    }
    return [counter,nextDate];
}
currdate={
    day:11,
    month:2,
    year:2020
}

console.log(nextPalindromeDate(currdate))