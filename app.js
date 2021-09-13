function toReverseString(str) {
    var splitString = str.split("");
    var charList = splitString.reverse();
    var stringReversed = charList.join("");
    return stringReversed;
}

function isPalindrome(str) {
    var reversedString = toReverseString(str);

    return str === reversedString;
}



function convertDateToString(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    };
    if (date.day < 10) {
        dateStr.day = '0' + date.day
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = '0' + date.month
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr;
}

function allDateFormat(date) {
    var convertedDate = convertDateToString(date);
    var ddmmyyyy = convertedDate.day + convertedDate.month + convertedDate.year;
    var mmddyyyy = convertedDate.month + convertedDate.day + convertedDate.year;
    var yyyymmdd = convertedDate.year + convertedDate.month + convertedDate.day
    var ddmmyy = convertedDate.day + convertedDate.month + convertedDate.year.slice(-2);
    var mmddyy = convertedDate.month + convertedDate.day + convertedDate.year.slice(-2);
    var yymmdd = convertedDate.year.slice(-2) + convertedDate.month + convertedDate.day;

    var listDateFormat = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
    return listDateFormat;
}
// console.log(allDateFormat(currdate));
function checkPalindromeForAllDateFormats(date) {
    var datesInAllFormat = allDateFormat(date);
    var flag = false;

    for (var i = 0; i < datesInAllFormat.length; i++) {
        if (isPalindrome(datesInAllFormat[i])) {
            flag = true;
            
        }
    }
  
    return flag
}


function isLeap(year) {
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year % 400 === 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function getNextDate(date) {
    var day = date.day;
    var month = date.month;
    var year = date.year;

    day = day + 1;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
        if (isLeap(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }


}

function nextPalindromeDate(date) {
    var nextDate = getNextDate(date);
    var counter = 0;
    while (1) {
        counter++;
        var isdatePalindrome = checkPalindromeForAllDateFormats(nextDate)
        if (isdatePalindrome) {
            break;

        }

        nextDate = getNextDate(nextDate);


    }
    return [counter, nextDate];
}
// currdate = {
//     day: 8,
//     month: 8,
//     year: 2021
// }

var dateInputRef = document.querySelector("#birth-date");
var showBtnRef = document.querySelector("#check-palindrome");
var resultRef = document.querySelector(".output")

function clickHandler() {
    hidemessage();
    var bdayStr = dateInputRef.value;

    if (bdayStr !== '') {
        var dateInList = bdayStr.split("-");
        var birthDate = {
            day: Number(dateInList[2]),
            month: Number(dateInList[1]),
            year: Number(dateInList[0])
        }
        var isBirthDatePalindrome = checkPalindromeForAllDateFormats(birthDate);
        if (isBirthDatePalindrome) {
            resultRef.innerText = 'Yay your birthdate is a palindrome';
        }
        else{
            var [noOfDays,palindromeDate] = nextPalindromeDate(birthDate);
            resultRef.innerText=`The next palindrome date is ${palindromeDate.day}-${palindromeDate.month} -${palindromeDate.year}, you missed by ${noOfDays}`
        }

    }
    else{
        resultRef.innerText="PLEASE INPUT YOUR BIRTHDATE TO CHECK FOR PALINDROME";
    }

}
function hidemessage(){
    resultRef.innerText="";
}
showBtnRef.addEventListener("click", clickHandler);



