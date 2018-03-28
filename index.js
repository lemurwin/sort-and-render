

userObj ={
  1 :{
    name: 'miles',
    age: 29,
    state: 'new york'
  },
  2: {
    name: 'abbey',
    age: 30,
    state: 'california'
  },
  3: {
    name: 'michael',
    age: 44,
    state: 'pennsylvania'
  },
  4: {
    name: 'david',
    age: 34,
    state: 'massachusetts'
  },
  5: {
    name: 'paul',
    age: 24,
    state: 'california'
  },
  6: {
    name: 'lola',
    age: 31,
    state: 'california'
  },
  7: {
    name: 'marcel',
    age: 24,
    state: 'texas'
  },
  8: {
    name: 'mimi',
    age: 24,
    state: 'texas'
  },
  9: {
    name: 'ryan',
    age: 29,
    state: 'japan'
  },
  10: {
    name:'inshik',
    age: 57,
    state: 'new york'
  },
  11: {
    name:'scoot',
    age: 8,
    state: 'new york'
  },
  12: {
    name: 'emile',
    age: 27,
    state: 'new york'
  },
  13: {
    name: 'matt',
    age: 34,
    state: 'new york'
  }
};
//search function

//array containing data to render
var myPages=[];
var staticArray =[];
var myArray =[];
var pagination=[];
var nameOrder='asc';
var ageOrder = 'asc';
var stateOrder = 'asc';
//array, can be changed, acts as userObj replacement
function createStaticArray(){
for(var x in userObj){
  staticArray.push([userObj[x].name, userObj[x].age, userObj[x].state])};
};
createStaticArray();
myArray = staticArray.map(x=>x);



// makes array myPages of pages to render from myArray, takes n as number of items per table
function pageMaker(){
  var n=document.getElementById('pageInput').value;


  var tempMyPages=[]
  var tempPages =[];
  var cutArray = myArray.map(x=>x);
  if (n>=1){
  do{
    tempPages=[];
  for (i=0; i<n; i++){
    if (cutArray.length >0){
    tempPages.push(cutArray.shift());
    } else {break}
    }
    tempMyPages.push(tempPages);
  } while (cutArray.length > 0);
  myPages=tempMyPages;
  paginationMaker();
  }
}


//makes pagination links
//leave this alone for now
function paginationMaker(){
  var pagesArray =[];
  for (i=0; i<myPages.length; i++){
    pagesArray.push('<li class="pageItem" onclick="classes();renderHtml(myPages['+i+']) "><a>'+i+'</a></li>');
  }
  pagination = pagesArray;
  $('#pages').html(pagination);
  $('.pageItem').first().addClass('active');
}


//takes any two level array and generates table html, then renders it to the table
function renderHtml(someArray){

  var htmlArray =[];
  var tableHeader ="<tr class='header'><th onclick='sortByWord(0)'style='width:40%;'>Name</th><th onclick='sortByAge()' style='width:30%;'>Age</th><th onclick = 'sortByWord(2)'style='width:30%;'>Country</th></tr>"
  someArray.forEach(function(array){
    var insideArray=[];
    array.forEach(function(data){
      insideArray.push('<td>'+data+'</td>')
    });
    htmlArray.push('<tr>'+insideArray.join('')+'</tr>');
    });

  $('#myTable').html(tableHeader);
  $('#myTable').append(htmlArray);
}

//search function that sorts out userObj to display
function myFunction(){
  var string = document.getElementById("myInput").value.toLowerCase();
  var renderArray=[];

  for(var x in userObj){
    if ((userObj[x].name.indexOf(string) >-1) ||(((userObj[x].age).toString()).indexOf(string) >-1) || (userObj[x].state.indexOf(string) >-1)) {
      renderArray.push([userObj[x].name, userObj[x].age, userObj[x].state]);
    }
  }
  myArray=renderArray;

  refresh();

}

function sortByAge(){
    //sort by number
    if (ageOrder === 'asc'){
      myArray=myArray.sort(function (a, b) {
        return a[1] - b[1];
      });
      ageOrder = 'desc';
  } else {
    myArray=myArray.sort(function (a, b) {
      return a[1] - b[1];
    });
    myArray=myArray.reverse();
    ageOrder = 'asc';
  }
    console.log(myArray);
    refresh();
}

  function sortByWord(n){
  // sort by string
    if (n===0){
        if (nameOrder==='asc'){
          myArray = myArray.sort(function(a, b) {
              return a[n].localeCompare(b[n]);
          });
          nameOrder = 'desc';
        } else {
          myArray = myArray.sort(function(a, b) {
              return a[n].localeCompare(b[n])
            });
          myArray = myArray.reverse();
          nameOrder='asc';
        };
      };
      if (n===2){
          if (stateOrder==='asc'){
            myArray = myArray.sort(function(a, b) {
                return a[n].localeCompare(b[n]);
            });
            stateOrder = 'desc';
          } else {
            myArray = myArray.sort(function(a, b) {
                return a[n].localeCompare(b[n])
              });
            myArray = myArray.reverse();
            stateOrder='asc';
          };
        };

      refresh();
      }
function refresh(){
  pageMaker();
  renderHtml(myPages[0]);
};

function classes(){
$('.pageItem').click(function(){
  $(this).addClass('active');
  $(this).siblings().removeClass('active');
})
};
$(document).ready(function(){
      pageMaker();

      renderHtml(myPages[0]);

});
