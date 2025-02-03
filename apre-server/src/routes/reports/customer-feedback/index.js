/**
 * Author: Professor Krasso
 * Date: 8/14/24
 * File: index.js
 * Description: Apre customer feedback API for the customer feedback reports
 */

'use strict';

const express = require('express');
const { mongo } = require('../../../utils/mongo');
const createError = require('http-errors');

const router = express.Router();

/**
 * @description
 *
 * GET /channel-rating-by-month
 *
 * Fetches average customer feedback ratings by channel for a specified month.
 *
 * Example:
 * fetch('/channel-rating-by-month?month=1')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/channel-rating-by-month', (req, res, next) => {
  try {
    const { month } = req.query;

    if (!month) {
      return next(createError(400, 'month and channel are required'));
    }

    mongo (async db => {
      const data = await db.collection('customerFeedback').aggregate([
        {
          $addFields: {
            date: { $toDate: '$date' }
          }
        },
        {
          $group: {
            _id: {
              channel: "$channel",
              month: { $month: "$date" },
            },
            ratingAvg: { $avg: '$rating'}
          }
        },
        {
          $match: {
            '_id.month': Number(month)
          }
        },
        {
          $group: {
            _id: '$_id.channel',
            ratingAvg: { $push: '$ratingAvg' }
          }
        },
        {
          $project: {
            _id: 0,
            channel: '$_id',
            ratingAvg: 1
          }
        },
        {
          $group: {
            _id: null,
            channels: { $push: '$channel' },
            ratingAvg: { $push: '$ratingAvg' }
          }
        },
        {
          $project: {
            _id: 0,
            channels: 1,
            ratingAvg: 1
          }
        }
      ]).toArray();

      res.send(data);
    }, next);

  } catch (err) {
    console.error('Error in /rating-by-date-range-and-channel', err);
    next(err);
  }
});

/**
 * @description
 *
 * GET /feedbackTypes
 *
 * Fetches a list of distinct agent teams.
 *
 * Example:
 * fetch('/feedbackTypes')
 *  .then(response => response.json())
 *  .then(data => console.log(feedbackTypes));
 */
router.get('/feedbackTypes', (req, res, next) => {
  try {

  //  const { feedbackType } = req.query;

 /*   if (!feedbackType) {
      return next(createError(400, 'Feedback Type is required.'));
    }*/
    mongo (async db => {
      const feedbackTypes = await db.collection('customerFeedback').distinct('feedbackType');
      res.send(feedbackTypes);
      console.log(feedbackTypes);
    }, next);
  } catch (err) {
    console.error('Error getting feedback types: ', err);
    next(err);
  }
}); 

/**
 * @description
 *
 * GET /feedbackTypes
 *
 * Fetches a list of distinct agent teams.
 *
 * Example:
 * fetch('/feedbackTypes/feedbackType')
 *  .then(response => response.json())
 *  .then(data => console.log(CustomerFeedbackData));
 */
router.get('/feedbackTypes/:feedbackType', (req, res, next) => {
  try {
    mongo (async db => {
      const customerFeedbackData = await db.collection('customerFeedback').aggregate([{$match: { feedbackType: req.params.feedbackType }}]).toArray();   
      res.send(customerFeedbackData);
      console.log(customerFeedbackData);
    }, next);
  } catch (err) {
    console.error('Error getting Customer Feedback Data: ', err)
    next(err);
  }
})


module.exports = router;