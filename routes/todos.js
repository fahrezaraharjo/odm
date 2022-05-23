var express = require('express');
var router = express.Router();
var todo = require('../models/Todo')
var Response = require('../models/Response')

/* GET todos listing. */
router.get('/', async function (req, res, next) {
  const response = new Response()
  try {
    const todos = await Todo.find({})
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
    const todo = await Todo.create({
      title: req.body.title
    })
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
