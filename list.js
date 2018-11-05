const express = require('express');
const router = express.Router();

class user{
    constructor (id,name,password){
        this.id = id;
        this.name = name;
        this.password = password;
    }
}

class items{
    constructor (id,label,image, description){
        this.id = id;
        this.label = label;
        this.image = image;
        this.description = description;
    }
}

class list{
    constructor (id, name, user, items){
        this.id = id;
        this.name = name;
        this.user = user;
        this.items = items;
    }
}


const lists = [new list(1, "Liste", new user(1,'Jordan', 'test'), new items(1, 'Jordan', 'ww', 'google'))];

router.get('/',(req,res) => {
    res.send(lists);
});

router.get('/:id', (req,res) => {
    u = lists.find(list => list.id == parseInt(req.params.id))
    if(u === undefined){
        res.send('List not find');
    } else {
        res.send(`One list with name : ${u.name}`);
    }
});

router.post('/:id/',(req,res) => {
    i = parseInt(req.params.id)
    while(lists.find(list => list.id == i) != undefined){
        i++
    }
    u = new list(i, req.body.name, new user(req.body.user.id,req.body.user.name,req.body.user.password),
    new items(req.body.items.id, req.body.items.label, req.body.items.image, req.body.items.description));
    lists.push(u);
    res.send(`Nouvelle list : ${u.name}`)
});

router.put('/:id/',(req,res) => {
     u= lists.find(list => list.id == parseInt(req.params.id));
     i = lists.indexOf(u);

     if(req.body.name === undefined) bodyName = u.name; else bodyName = req.body.name;
     if(req.body.user.name === undefined) userName = u.user.name; else userName = req.body.user.name;
     if(req.body.user.password === undefined) userPassword = u.user.password; else userPassword = req.body.user.password;
     if(req.body.items.label === undefined) itemsLabel = u.items.label; else itemsLabel = req.body.items.label;
     if(req.body.items.image === undefined) itemsImage = u.items.image; else itemsImage = req.body.items.image;
     if(req.body.items.description === undefined) itemsDescription = u.items.description; else itemsDescription = req.body.items.description;

     lists.splice(i, 1, new list(u.id, bodyName, new user(u.user.id, userName, userPassword), 
     new items(u.items.id, itemsLabel, itemsImage, itemsDescription)));
     res.send(lists[i])
});

router.delete('/:id',(req,res) => {
    u= lists.find(list => list.id == parseInt(req.params.id));
    i = lists.indexOf(u);
    if(i == -1){
        res.send('Item not found')
    } else {
        lists.splice(i, 1); 
        res.send(lists)
    }
});

module.exports = router;