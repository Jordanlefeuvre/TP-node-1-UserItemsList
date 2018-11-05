const express = require('express');
const router = express.Router();

class user{
    constructor (id,name,password){
        this.id = id;
        this.name = name;
        this.password = password;
    }
}

const users = [new user(1,'Jordan', 'test')];

router.get('/',(req,res) => {
    res.send(users);
});

router.get('/:id', (req,res) => {
    u = users.find(user => user.id == parseInt(req.params.id))
    if(u === undefined){
        res.send('User not find');
    } else {
        res.send(`One user with name : ${u.name}`);
    }
});

router.post('/:id/:name/:password',(req,res) => {
    i = parseInt(req.params.id)
    while(users.find(user => user.id == i) != undefined){
        i++
    }
    u = new user(i,req.params.name,req.params.password);
    users.push(u);
    res.send(`Nouvel utilisateur : ${u.name}`)
});

router.put('/:id/',(req,res) => {
    u= users.find(user => user.id == parseInt(req.params.id));
    i = users.indexOf(u);

    if(req.body.name === undefined) userName = u.items.name; else userName = req.body.name;
    if(req.body.password === undefined) userPassword = u.items.password; else userPassword = req.body.password;

    users.splice(i, 1, new user(u.id, userName, userPassword));
    res.send(users[i])
});

router.delete('/:id',(req,res) => {
    u= users.find(user => user.id == parseInt(req.params.id));
    i = users.indexOf(u);
    if(i == -1){
        res.send('User not found')
    } else {
        users.splice(i, 1); 
        res.send(users)
    }
});

module.exports = router;