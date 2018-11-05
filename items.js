const express = require('express');
const router = express.Router();

class items{
    constructor (id,label,image, description){
        this.id = id;
        this.label = label;
        this.image = image;
        this.description = description;
    }
}

const itemsList = [new items(1,'Jordan', 'www.google.fr/logo','logo de google')];

router.get('/',(req,res) => {
    res.send(itemsList);
});

router.get('/:id', (req,res) => {
    u = itemsList.find(items => items.id == parseInt(req.params.id))
    if(u === undefined){
        res.send('Items not find');
    } else {
        res.send(`One items with name : ${u.label}`);
    }
});

router.post('/:id/:label/:image/:description',(req,res) => {
    i = parseInt(req.params.id)
    while(itemsList.find(items => items.id == i) != undefined){
        i++
    }
    u = new items(i, req.params.label, req.params.image, req.params.description);
    itemsList.push(u);
    res.send(`Nouvel items : ${u.label}`)
});

router.put('/:id/',(req,res) => {
     u= itemsList.find(items => items.id == parseInt(req.params.id));
     i = itemsList.indexOf(u);

     if(req.body.label === undefined) itemsLabel = u.items.label; else itemsLabel = req.body.label;
     if(req.body.image === undefined) itemsImage = u.items.image; else itemsImage = req.body.image;
     if(req.body.description === undefined) itemsDescription = u.items.description; else itemsDescription = req.body.description;

     itemsList.splice(i, 1, new items(u.id, itemsLabel, itemsImage, itemsDescription));
     res.send(itemsList[i])
});

router.delete('/:id',(req,res) => {
    u= itemsList.find(items => items.id == parseInt(req.params.id));
    i = itemsList.indexOf(u);
    if(i == -1){
        res.send('Item not found')
    } else {
        itemsList.splice(i, 1); 
        res.send(itemsList)
    }
});

module.exports = router;