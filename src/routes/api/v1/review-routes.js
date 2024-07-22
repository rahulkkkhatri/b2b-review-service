const express = require('express');
const { reviewService } = require('../../../services');

const router = express.Router();

router.post('/add', async(req, res, next) => {
    try {
        const result = await reviewService.addReview(req, res, next);
        return res.status(200).json(result);
    } catch (err) {
        next(err)
    }
})

router.post('/fetch', async(req, res, next) => {
    try {
        const result = await reviewService.fetchReview(req, res, next);
        return res.status(200).json(result);
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const result = await reviewService.getReviewbyId(req, res, next);
        return res.status(200).json(result);
    } catch (err) {
        next(err)
    }
})

router.get('/shop-avg/:shop_id', async (req, res, next) => {
    try {
        const result = await reviewService.getAvgShopRating(req, res, next);
        return res.status(200).json(result);
    } catch (err) {
        next(err)
    }
})

router.get('/product-avg/:product_id', async (req, res, next) => {
    try {
        const result = await reviewService.getAvgProductRating(req, res, next);
        return res.status(200).json(result);
    } catch (err) {
        next(err)
    }
})

router.post('/rating-counts', async (req, res, next) => {
    try {
        const result = await reviewService.getRatingCounts(req, res, next);
        return res.status(200).json(result);
    } catch (err) {
        next(err)
    }
})

module.exports = router