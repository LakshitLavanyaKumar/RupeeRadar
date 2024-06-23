import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //adding states to make the form functional
    const [name,setName] = useState('');
    const [datetime,setDatetime] =useState('');
    const [description,setDescription] =useState('');
    // we want to sdave those transactions in a state
    const [transactions,setTransactions] =useState([]);
    //useEffect to display transaction from mongoDB 
   useEffect( () => {
   getTranscations().then(setTransactions);
   },[]);
   async function getTranscations() {
    // get request is default for fetch function
    const url = process.env.REACT_APP_API_URL+'/transactions';
     const response = await fetch( url);
     return await response.json();
   }
    async function addNewTransaction(ev){
      ev.preventDefault();
      //this function takes 
      //all the state and gives it to backend
      const url = process.env.REACT_APP_API_URL+'/transaction';
      // from name we need price and a string"name"
      const parts = name.split(' ');
      const priceStr = parts[0]; // Get the first part as price
      const itemName = parts.slice(1).join(' '); // Join the remaining parts as name
   
      const price =parseFloat(priceStr);
      const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
     price,
     name: itemName,
     description,
     datetime })
}).then(response => {
  setName('');
  setDatetime('');
  setDescription('');
  setTransactions((prevTransactions) => [...prevTransactions, json]);
  response.json().then(json => {
    console.log('result',json);
  });
}

);



    }
    ////code fro balance////
    let balance = 0;
    for( const transaction of transactions)
      {
         balance=balance +transaction.price;
      }
   balance = balance.toFixed(2);
   //now balance is a string   
   
   const fraction = balance.split('.')[1];

   balance = balance.split('.')[0];
  return (
   <main>
    <div class='h'><h1> RupeeRadar!</h1></div>
    <div><h1><span class="first">I</span><span class="second">N</span><span class="third">R</span>{balance}<span>{fraction}</span></h1></div>
    <form onSubmit={addNewTransaction}>
      <div class='basic'>
      <input type='text'
       value={name} 
       onChange={ev => setName(ev.target.value)}
       placeholder={'+200 nwe samsung tv'}/>
      <input value={datetime} onChange={ev=> setDatetime(ev.target.value)} type='datetime-local'/>
      </div>
      <div class='description'>
      <input type='text' 
      value={description}
      onChange={ev => setDescription(ev.target.value)}
      placeholder='description'/>
      </div>
      <button type='submit'>Add new transaction</button>
      
    </form>
    <div class="transactions">
      {transactions.length >0 && transactions.map(transaction => (
         <div class="transaction" key={transaction._id}>
         <div class="left">
           <div class="name">{transaction.name}</div>
           <div class="description">{transaction.description}</div>
         </div>
         <div class="right">
           <div class={"price " + (transaction.price<0?"red":"green")}>
           {transaction.price}
           </div>
           <div class="datetime">{transaction.datetime}</div>
   
         </div>
       </div>
      ))}
    
    
   </div>
   </main>
  )
}

export default App
