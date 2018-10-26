// Converts from degrees to radians.
Number.prototype.toRadians = function () {
    return this * Math.PI / 180;
};


function distanceFromAnnecy(city) {
    var annecyPos = [45.8494545, 6.1106385];

    var lat1 = annecyPos[0];
    var lon1 = annecyPos[1];
    var lat2 = parseFloat(city.latitude);
    var lon2 = parseFloat(city.longitude);

    var r = 6371;
    var a1 = lat1.toRadians();
    var a2 = lat2.toRadians();
    var bA = (lat2 - lat1).toRadians();
    var aA = (lon2 - lon1).toRadians();

    var a = Math.sin(bA / 2) * Math.sin(bA / 2) + Math.cos(a1) * Math.cos(a2) * Math.sin(aA / 2) * Math.sin(aA / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = r * c;

    return d;
}

function swap(i, j) // Swap the values in array csvData
{

    displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)
    var temp = csvData[i];
    csvData[i] = csvData[j];
    csvData[j] = temp;

}

function isLess(A, B) {

    displayBuffer.push(['compare', A, B]); // Do not delete this line (for display)

    return distanceFromAnnecy(csvData[A]) < distanceFromAnnecy(csvData[B])

}


function insertsort() {
    console.log("insertsort()  START AT : " + new Date());
    for (i = 1; i < csvData.length; ++i) {
        for (j = i; j > 0; --j) {
            if (isLess(j, j - 1)) {
                swap(j, j - 1);
            } else {
                break;
            }
        }
    }

    console.log("insertsort()  END AT : " + new Date());
}

function selectionsort() {
    console.log("selectionsort()  START AT : " + new Date());
    for (i = 0; i < csvData.length; ++i) {

        for (j = i + 1; j < csvData.length; ++j) {
            if (isLess(j, i)) {
                swap(j, i);
            }
        }

    }
    console.log("selectionsort()  END AT : " + new Date());
}

function bubblesort() {
    console.log("bubblesort()  START AT : " + new Date());
    var lenght = csvData.length;
    do {
        for (j = 1; j < lenght; ++j) {
            if (isLess(j, j - 1)) {
                swap(j, j - 1);
            }
        }
        lenght -= 1;
    } while (lenght - 1);

    console.log("bubblesort()  END AT : " + new Date());
}

function shellsort() {
    console.log("implement me !");
}

function mergesort(data) {
    console.log("implement me !");
}

function heapsort(data) {
    console.log("implement me !");
}

function quicksort() {
    console.log("quicksort()  START AT : " + new Date());

    // mySort(csvData);
    mySort2(csvData, 0, csvData.length - 1);

    console.log("FINI");

    console.log("quicksort()  END AT : " + new Date());
}

/**
 * 
 * @param {Array} table Array
 * @returns {Object} Object
 */
function getIndexRandom(table) {
    return Math.floor(Math.random() * Math.floor(table.length));

}

function getIndexRandomFromLR(left, right) {
    var min = Math.floor(left);
    var max = Math.floor(right);
    return Math.floor(Math.random() * (max - min) + min);
}

function mySort(table) {
    var pivotIndex = getIndexRandom(table);
    var T1 = [];
    var T2 = [];
    var finalTable = [];

    for (i = 0; i < table.length; ++i) {
        if (distanceFromAnnecy(table[i]) < distanceFromAnnecy(table[pivotIndex])) {
            T1.push(table[i]);
        } else if (distanceFromAnnecy(table[pivotIndex]) < distanceFromAnnecy(table[i])) {
            T2.push(table[i]);
        }
    }
    if (T1.length > 1) {
        T1 = mySort(T1);
    }
    if (T2.length > 1) {
        T2 = mySort(T2);
    }
    finalTable = T1.concat(table[pivotIndex]).concat(T2);

    return finalTable;
}

function myPart(table, left, right) {
    
    if (left == null || typeof left == 'undefined') {
        left = 0;
    }
    if (right == null || typeof left == 'undefined') {
        right = table.length - 1;
    }

    var pivot = getIndexRandomFromLR(left, right);
    
    console.log(left , '<==>' , right , 'pivot : ' , pivot);

    while (left != pivot) {
        // Tester

        if(isLess(pivot,left)) {
           table.splice(pivot + 1 , 0 , table[left]);
           pivot =-1;
        }
        // Inserere apres pivot ...
        left++;
    }

    while (right != pivot) {
        // Tester
        // Inserere apres pivot ...
        if(isLess(right,pivot)) {
            table.splice(pivot - 1 , 0 , table[right]);
            pivot =+1;
         }
        right--;
    }



    // do {

    //     //left inferieur a pivot
    //     while (isLess(left, pivot)) {
    //         ++left;
    //     }
    //     //right superieur a pivot
    //     while (isLess(pivot, right)) {
    //         --right;
    //     }

    //     //left superieur a pivot ET right inferieur a pivot
    //     if (isLess(pivot,left) && isLess(right,pivot)) {
    //         swap(left, right);
    //         ++left;
    //         --right;
    //     }
    //    // index left == index pivot ET right inferieur a pivot
    //     if (left == pivot && isLess(right,pivot) ) {
    //         swap(right, pivot);
    //         pivot = right;
    //     }
    //     //  index right == index pivot Et left superieur a pivot
    //     if (right == pivot && isLess(pivot,left)) {
    //         swap(left, pivot);
    //         pivot = left;
            
    //     }

    // } while (left != right );
    
    return pivot;
}

function mySort2(table, left ,right) {

    console.log("Left : " + pivot);
    console.log("Right : " + pivot);

    var pivot = myPart(table, left, right);

    console.log("Pivot : " + pivot);
    console.log("Left : " + pivot);
    console.log("Right : " + pivot);
    
    if(left < pivot)
        mySort2(table, 0, pivot - 1); // [0,1,2] , 0 - 2

    if (right > pivot)
        mySort2(table, pivot + 1, table.length - 1);

}

function quick3sort(data) {
    console.log("implement me !");
}


var algorithms = {
    'insert': insertsort,
    'select': selectionsort,
    'bubble': bubblesort,
    'shell': shellsort,
    'merge': mergesort,
    'heap': heapsort,
    'quick': quicksort,
    'quick3': quick3sort
}

function sort(algo) {
    if (!algorithms.hasOwnProperty(algo)) {
        throw 'Invalid algorithm ' + algo;
    }
    var sort_fn = algorithms[algo];
    sort_fn();
}

//////////////////// OK ///////////////////////////////////
// function quicksort() {
//     quicksortin(csvData, 'random', 0, csvData.length - 1);
// }

// function quicksortin(aa, pivot_type, left, right) {
//     if (typeof(left) === 'undefined') left = 0;
//     if (typeof(right) === 'undefined') left = aa.length - 1;

//     if (left >= right) return;

//     var pivot = partition(aa, pivot_type, left, right);
//     quicksortin(aa, pivot_type, left, pivot - 1);
//     quicksortin(aa, pivot_type, pivot + 1, right);
// }

// function partition(aa, pivot_type, left, right) {
//     var pivot = choose_pivot(aa, pivot_type, left, right);
//     swap(pivot, right);

//     pivot = left;
//     for (var i = left; i < right; i++) {
//         if (isLess(i, right)) {
//             if (i !== pivot) {
//                 swap(i, pivot)
//             }
//             pivot += 1;
//         }
//     }
//     swap(right, pivot);

//     return pivot;
// }

// function choose_pivot(aa, pivot_type, left, right) {
//     if (typeof(left) === 'undefined') left = 0;
//     if (typeof(right) === 'undefined') right = aa.length - 1;
//     var pivot = null;

//     if (pivot_type === 'random') {
//         pivot = Math.floor(Math.random() * (right - left)) + left;
//     } else if (pivot_type === 'first') {
//         pivot = left;
//     } else if (pivot_type === 'last') {
//         pivot = right;
//     } else if (pivot_type === 'middle') {
//         pivot = Math.round((left + right) / 2)
//     } else if (pivot_type === 'median') {

//     } else {
//         throw 'invalid pivot_type ' + pivot_type;
//     }

//     return pivot;
// }