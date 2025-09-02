import { Router } from 'express'
import User from '../models/user.model.js'

const userRouter = Router(); 

// Get all user
userRouter.get('/', async(req, res) => {
     try {
          const user= await User.find()
          res.send(user.routes)
     } catch (error) {
          res.status(500).send(error.message)
    }
})

// Get user By ID
userRouter.get('/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user.route)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Update user.route By ID
// userRouter.put('/:id', async(req, res) => {
//     try {
//         const user.route = await User.route.findByIdAndUpdate(req.params.id, {
//             key:value
//         },{new: true})
//         res.send(user.route)
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// })

// Delete user.route By ID
userRouter.delete('/:id', async(req, res) => {
    try {
        const user= await User.route.findByIdAndDelete(req.params.id)
        res.send(user.route)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

export default userRouter