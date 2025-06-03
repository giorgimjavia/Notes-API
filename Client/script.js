const get_btn = document.getElementById('get');
const post_btn = document.getElementById('post');
const delete_btn = document.getElementById('delete');
const post_input = document.getElementById('post-input');
const delete_input = document.getElementById('delete-input');
const list = document.getElementById('list');

const base_url = "http://localhost:4000/main";


get_btn.addEventListener('click', async () => {
    try{
        const response = await fetch(base_url);

        if(!response.ok) {
            throw new Error(`Error`, response.status)
        }
        const data = await response.json();

        list.innerHTML = data.map(data => `<span>${data.country}</span>`).join('');

        console.log(data);
        console.log(response)
    }catch(err) {
        console.log(err)
    }
});

post_btn.addEventListener('click', async () => {
    try{
        const response = await fetch(base_url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({country: post_input.value}),
    
        });

        if(!response.ok) {
            throw new Error(`Error`, response.status)
        };

        post_input.value = '';
        const new_data = await response.json();
        console.log('Note added', new_data);
    }catch(err) {
        console.log(err);
    }
});

delete_btn.addEventListener('click', async () => {
    try{
        const ID = Number(delete_input.value.trim());
        if(!ID) {
            alert('Invalid ID');
            return
        }

        const response = await fetch (`${base_url}/${ID}`, {
            method: 'DELETE'
        });

        if(!response.ok) {
            throw new Error(`Error ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        delete_input.value = '';
    }catch(err) {
        console.log(err);
    };
});