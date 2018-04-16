document
    .querySelector('#myButton')
    .onclick = () => 
        fetch(`http://localhost:3000/notas`)
            .then(res => res.json())
            .then(invoices => console.log(invoices))
            .catch(console.log);