//dependencies
const bands = require('express').Router()
const db = require('../models')
const { Band } = db
const { Op } = require('sequelize')

//routes
//find all bands
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [ [ 'available_start_time', 'ASC'] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}% `}
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Sever error' })
    }
})

//find a specific band
bands.get('/:id', async (req,res) => {
    try {
        const foundBand = await Band.findOne({
            where: { band_id: req.params.id }
        })
        res.status(200).json(foundBand)
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' })
    }
})

//create a band
bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        })
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

//update a band
bands.put('/:id', async (req, res) => {
    try {
        const updateBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updateBands} band(s)`
        })
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

//delete a band 
bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch(error) {
        res.status(500).json({ message: "Server error" });
    }
})

//export
module.exports = bands