document
    .querySelector('#myButton')
    .onclick = () => 
        fetch(`http://localhost:3000/notas`)
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(res.statusText);
            })
            .then(invoices => console.log(invoices))
            .catch(console.log);