
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var transactionSchema = Schema( {
  description: String,
  category: String,
  amount: Schema.Types.Decimal128,
  date: Date,
  userId: {type:ObjectId, ref:'user' }
} );

module.exports = mongoose.model( 'Transaction', transactionSchema );
