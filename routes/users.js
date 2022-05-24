var express = require('express');
var router = express.Router();
var User = require('../models/User')
var Response = require('../models/Response')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const response = new Response()
  try {
    const users = await User.find({}).populate('todos')
    response.data = users
  } catch (e) {
    response.err = true
    response.data = 'gagal menampilkan data users'
  }
  res.json(response)
});

router.post('/', async function (req, res, next) {
  const response = new Response()
  try {
    const user = await User.create({
      email: req.body.email
    })
    response.data = user
  } catch (e) {
    response.err = true
    response.data = 'gagal menyimpan data users'
  }
  res.json(response)
});


router.delete('/:id', async function (req, res, next) {
  const response = new Response()
  try {
    const user = await User.findByIdAndRemove(req.params.id)
    response.data = user
  } catch (e) {
    response.err = true
    response.data = 'gagal menghapus data users'
  }
  res.json(response)
});


router.put('/:id', async function (req, res, next) {
  const response = new Response()
  try {
    const user = await User.findByIdAndUpdate(req.params.id,
      {
      email: req.body.email
    }, {new: true}
    )
    response.data = user
  } catch (e) {
    response.err = true
    response.data = 'gagal merubah data users'
  }
  res.json(response)
});

module.exports = router;
