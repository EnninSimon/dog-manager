const Dog = require('../model/model');

const getAllDogs = async (req, res) => {
    try {
        const allDogs = await Dog.find({})
        return res.status(200).json({ allDogs })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

const getSingleDog = async (req, res) => {
    try {
        const { id } = req.params;
        const dog = await Dog.findById(id);
        return res.status(200).json({ dog })
    } catch (error) {
        return res.status(404).json(error)
    }
}

const createDog = async (req, res) => {
    try {
        const newDog = new Dog({ ...req.body });
        const insertedDog = await newDog.save();
        return res.status(201).json({ insertedDog })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateDog = async (req, res) => {
    try {
        const { id } = req.params;
        await Dog.findByIdAndUpdate( id, req.body, {
            new: true,
            runValidators: true
        });
        const updatedDog = await Dog.findById(id);
        return res.status(200).json({ updatedDog })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const deleteDog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDog = await Dog.findByIdAndDelete(id);
        return res.status(200).json({ deletedDog })
    } catch (error) {
        return res.status(404).json(error)
    }
}

module.exports = {
    getAllDogs,
    getSingleDog,
    createDog,
    updateDog,
    deleteDog
}