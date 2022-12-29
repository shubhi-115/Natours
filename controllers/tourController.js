const fs = require('fs')

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8')
    )

//MIDDLEWARES
exports.checkID = (req,res,next,val)=>{
    console.log(`Tour id is ${val}`)
    if(val*1>tours.length-1) {
        return res.status(404).json({
            status: 'error',
            result: 'No such tour with this ID'
        })
    }
    next(); 
}
exports.checkBody = (req,res,next,val)=>{
    if(!req.body.name )
}
exports.getAllTours = (req, res) => {
    res.status(200).json({
       status: 'success',
       result: tours.length,
       data: {
           tours: tours
       }
    })
   }
exports.getTour = (req, res) => {
    const id = req.params.id*1;
    const tour = tours.find(el=> el.id == req.params.id)
    res.status(200).json({
    status:'success',
    data: {
        tour: tour
    }
 })
}
exports.updateTour = (req, res) => {
    const id = req.params.id*1;
    res.status(200).json({
        status:'success',
        data:{
            tour: '<Updated tour data>'
        }

    })
}
exports.deleteTour = (req, res) => {
    const id = req.params.id*1;
    res.status(204).json({
        status:'success',
        data: null
    })
}
exports.createTour = (req, res) => {
    //  console.log(req.body);
    const newId = tours[tours.length-1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, 
    JSON.stringify(tours), 
    err=>{
     res.status(201).json({
        status: 'success',
        data:{
            tour: newTour
        }
     })
    })
    }