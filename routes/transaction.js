const express = require('express');
const User = require('../models/User')
const router = express.Router();
const Transaction = require('../models/Transaction')


isLoggedIn = (req,res,next) => {
    if (res.locals.loggedIn) {
      next()
    } else {
      res.redirect('/login')
    }
  }


router.get('/transactions/',
    isLoggedIn,
    async (req, res, next) => {
        const sort = req.query.sort
        let transactions= await Transaction.find({userId:req.user._id});
    
        if (sort=='category') {
          transactions = await Transaction.find({userId:req.user._id})
                                        .sort({category:1}) 
        } 
        else if (sort=='date') {
          transactions = await Transaction.find({userId:req.user._id})
                                        .sort({date:-1})
        } 
        else if (sort=='amount') {
          transactions = await Transaction.find({userId:req.user._id})
                                        .sort({amount:-1})
        } 
        else if (sort=='description') {
          transactions = await Transaction.find({userId:req.user._id})
                                        .sort({description:1})
        } 
        res.render('transactions',{transactions,sort});
      }
 );


 router.post('/transactions',
 isLoggedIn,
 async (req, res, next) => {
     const transaction = new Transaction(
     {transaction:req.body.transaction,
      // createdAt: new Date(), //maybe
       amount: req.body.amount,
       category: req.body.category,
       description: req.body.description,
       date: req.body.date,
       userId: req.user._id
     })
     await transaction.save();
     res.redirect('/transactions')
 });
 


 router.get('/transactions/category',
 isLoggedIn,
 async (req, res, next) => {
     const sort = req.query.sort
     transactions = await Transaction.find({userId:req.user._id})
                                   .sort({category:1}) 
     console.log("inside /transactions/category")
     res.render('category',{transactions,sort})
});
  
  router.get('/transactions/edit/:transactionId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /transactions/edit/:transactionId")
      const transaction = 
       await Transaction.findById(req.params.transactionId);
      res.locals.transaction = transaction
      res.render('edit')

});

router.post('/transactions/updateTransaction',
  isLoggedIn,
  async (req, res, next) => {
    const {transactionId,description,amount,category,date} = req.body;
    console.log("inside /transactions/complete/:transactionId");
    await Transaction.findOneAndUpdate(
      {_id:transactionId},
      {$set: {description,amount,category,date}} );
    res.redirect('/transactions')
});



router.get('/transactions/remove/:transactionId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /transactions/remove/:transactionId")
      await Transaction.deleteOne({_id:req.params.transactionId});
      res.redirect('/transactions')
});


module.exports = router;

