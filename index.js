const axios = require('axios');
let myBtn = document.querySelector('.show');
myBtn.addEventListener('click', getId);
let div = document.querySelector('.result');
let div2 = document.querySelector('.result2');
const table = document.createElement('table');
let pager = document.querySelector('.pager');
let subPager = document.querySelector('.subPager');
let xvicha = 231231231
function getId() {
  pager.innerHTML = ''; // clearing pager(ul)
  table.innerHTML = `<img src='iOSLoading.gif' />`; // adding loader picture
  let myInput = document.querySelector('#myInput').value; //input value
  let k = 1;
  while (k < 11) { // setting pager
    pager.innerHTML += `<li><a class="linkers" data-id="${k}"> ${k} </a></li>`; // setting li -s
    k++;
  };

  const linkers = document.querySelectorAll('.linkers'); // a hrefs
  for (let i = 0; i < linkers.length; i++){
    linkers[i].addEventListener('click',function(){
      table.innerHTML = `<img src='iOSLoading.gif' />`; // adding loader picture
    myInput = this.getAttribute('data-id'); // getting data-id from a hrefs
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${myInput}`).then(datas => {
      table.innerHTML = ''; // deleting everything while json is set 
    
        datas.data.map((word,index) => {

         const tr = document.createElement('tr'); // creating tr and then getting each elements and putting in td 
          tr.innerHTML = `<td>${word.id} </td> 
                             <td  width=300>${word.title}</td>
                             <td>${word.body}</td>
                             <td width=200><button class="commentsClass" style="height:60px">კომენტარის დათვალიერება</button></td>`;
          table.appendChild(tr); // adding tr to table
          div.appendChild(table); // adding table to div
          });

          let page = datas.data.length / 10;
          subPager.innerHTML = page;
      }, error => {
        // if error, getting error
        let h2= document.createElement('h2');
        h2.innerHTML = `${error}`;
        document.body.appendChild(h2);
     }).then(oldDatas => {
        let commentsBtn = document.querySelectorAll('.commentsClass');
        for (let i = 0; i < commentsBtn.length; i++) {
          commentsBtn[i].addEventListener('click', function (e) {
            div2.innerHTML = `<img src='iOSLoading.gif' />`;
            let table2 = document.createElement('table');
            e.preventDefault();
            const mainTd = this.parentNode.parentNode;
            for (let j = 0; j < commentsBtn.length; j++) {
              if (mainTd.style.backgroundColor) {
                commentsBtn[j].parentNode.parentNode.style.backgroundColor = 'transparent';
                mainTd.style.backgroundColor = 'green';
              } else {
                commentsBtn[j].parentNode.style.backgroundColor = 'transparent';
                mainTd.style.backgroundColor = 'green';
              }
            }
            const th = document.createElement('th');
            th.innerHTML = `<th>Comments About This Topic</th>`;
            table2.appendChild(th);
            const myInput = document.querySelector('#myInput').value;
            const postId = this.parentNode.parentNode.firstElementChild.textContent;
            const comments = axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
            comments.then((datas) => {
             div2.innerHTML = '';
              let x = datas.data.map((objects) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${objects.name} </td>`;
                return tr;
              });
              for (let y of x) {
                table2.appendChild(y);
              }
              div2.appendChild(table2);
            })
  
          })
        }
      }, error => {
         let h2= document.createElement('h2');
         h2.innerHTML = `${error}`;
         document.body.appendChild(h2);
      })
    });
  }
  axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${myInput}`).then(datas => {
    if(myInput > 10){
      let h2= document.createElement('h2');
      h2.className='ifError'
       h2.innerHTML = `No Id Found: ${myInput}`;
       document.body.appendChild(h2);
    } else if(myInput <= 10) {
      let h2 = document.querySelector('.ifError');
      document.body.classList.remove(h2)
    }
    table.innerHTML = ''; // deleting everything while json is set 
      let page = datas.data.length;
      datas.data.map((word) => {
       const tr = document.createElement('tr');
        tr.innerHTML = `<td>${word.id} </td> 
                           <td  width=300>${word.title}</td>
                           <td>${word.body}</td>
                           <td width=200><button class="commentsClass" style="height:60px">კომენტარის დათვალიერება</button></td>`;
        table.appendChild(tr);
        div.appendChild(table);
        })
    }, error => {
      let h2= document.createElement('h2');
      h2.innerHTML = `${error}`;
   }).then(oldDatas => {
      let commentsBtn = document.querySelectorAll('.commentsClass');
      for (let i = 0; i < commentsBtn.length; i++) {
        commentsBtn[i].addEventListener('click', function (e) {
          div2.innerHTML = `<img src='iOSLoading.gif' />`;
          let table2 = document.createElement('table');
          e.preventDefault();
          const mainTd = this.parentNode.parentNode;
          // buttons styling on click
          for (let j = 0; j < commentsBtn.length; j++) {
            if (mainTd.style.backgroundColor) {
              commentsBtn[j].parentNode.parentNode.style.backgroundColor = 'transparent';
              mainTd.style.backgroundColor = 'green';
            } else {
              commentsBtn[j].parentNode.style.backgroundColor = 'transparent';
              mainTd.style.backgroundColor = 'green';
            }
          }
          const th = document.createElement('th');
          th.innerHTML = `<th>Comments About This Topic</th>`;
          table2.appendChild(th);
          const postId = this.parentNode.parentNode.firstElementChild.textContent;
          const comments = axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
          comments.then((datas) => {
            if (div2.firstChild === null) {
              div2.innerHTML = 'No Comments';
            }
            div2.innerHTML = '';
            let x = datas.data.map((objects) => {
              const tr = document.createElement('tr');
              tr.innerHTML = `<td>${objects.name} </td>`;
              return tr;
            });
            for (let y of x) {
              table2.appendChild(y);
            }
            div2.appendChild(table2);
          })
        })
      }
    }, error => {
       let h2= document.createElement('h2');
       h2.innerHTML = `${error}`;
       document.body.appendChild(h2);
    })
}

