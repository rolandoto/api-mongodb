const {response} = require("express")
const { Vendedor,Venta } = require("./models.js");

exports.postVendedor = (req, res =response) =>{
    
    new Vendedor({ idvend: req.body.idvend, nombre: req.body.nombre, apellido: req.body.apellido,correoe:req.body.correoe, })
    .save((err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });

}

exports.postVenta =async(req, res =response) =>{

    const vendedor = await Vendedor.findById("63755c5a36c4fb1fec39bc15")

    const newVenta = new Venta({
                idvend:vendedor._id,
                zona:"norte",
                fecha:"sdkask",
                valorventa:"10000"})

    try {

        const savedNewVenta = await  newVenta.save()

        vendedor.totalcomision =vendedor.totalcomision.concat(savedNewVenta._id)
        await vendedor.save()

        res.status(201).json({
            ok:true
        })

    } catch (error) {

        res.status(401).json({
            ok:false
        })

    }
 
}

exports.getVenta =async(req, res =response) =>{   
    
    const vendedor =  await (await Vendedor.find({_id:"63755c5a36c4fb1fec39bc15"}).populate("Venta"))

    const venta =  await (await Venta.find({idvend:"63755c5a36c4fb1fec39bc15"}).populate("Vendedor"))

    const initialValue = 0;
    const sumWithInitial = venta.reduce(
        (previousValue, currentValue) => previousValue + parseInt (currentValue.valorventa),initialValue
      );

    const to = vendedor.map(index => {
        const {idvend,nombre,apellido,correoe} = index

        return {idvend,nombre,apellido,correoe,totalcomision:sumWithInitial}
    })
    

    res.status(201).json({
        ok:true,
        to
    })

}