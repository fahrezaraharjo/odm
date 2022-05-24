var express = require('express');
var router = express.Router();
var Todo = require('../models/Todo')
var Response = require('../models/Response');
const User = require('../models/User');

/* GET todos listing. */
router.get('/', async function (req, res, next) {
  const response = new Response()
  try {
    const todos = await Todo.find({}).populate('owner')
    response.data = todos  
  } catch (e) {
    response.err = true
    response.data = 'gagal menampilkan data todos'
  }
  res.json(response)
});

router.post('/', async function (req, res, next) {
  const response = new Response()
  try {
    const user = await User.findById(req.body.userid)
    
    const todo = await Todo.create({
      title: req.body.title,
      owner: user._id
    })
    
    user.todos.push(todo_id)
    await user.save()

    response.data = todo
  } catch (e) {
    response.err = true
    response.data = 'gagal menyimpan data todos'
  }
  res.json(response)
});


router.delete('/:id', async function (req, res, next) {
  const response = new Response()
  try {
    const todo = await Todo.findByIdAndRemove(req.params.id)
    response.data = todo
  } catch (e) {
    response.err = true
    response.data = 'gagal menghapus data todos'
  }
  res.json(response)
});


router.put('/:id', async function (req, res, next) {
  const response = new Response()
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id,
      {
      title: req.body.title,
      complete: req.body.complete
    }, {new: true}
    )
    response.data = todo
  } catch (e) {
    response.err = true
    response.data = 'gagal merubah data todos'
  }
  res.json(response)
});

module.exports = router;
