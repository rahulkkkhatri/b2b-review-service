const { reviewRepository } = require('../database');

const addReview = async (req, res, next) => {
    try {
        let reqObj = req.body;
        const result = await reviewRepository.addReview(reqObj);
        return result;
    } catch (err) {
        throw (err);
    }
}

const fetchReview = async (req, res, next) => {
    try {
        let reqObj = req.body;
        let { page, pageSize } = req.query;
        const result = await reviewRepository.getReviewList(reqObj, page, pageSize);
        return result;
    } catch (err) {
        throw (err);
    }
}

const getReviewbyId = async (req, res, next) => {
    try {
        let { id } = req.params;
        const result = await reviewRepository.getReviewbyId(id);
        return result;
    } catch (err) {
        throw (err);
    }
}

const getAvgShopRating = async (req, res, next) => {
    try {
        let { shop_id } = req.params;
        const result = await reviewRepository.getAvgShopRating(shop_id);
        return result;
    } catch (err) {
        throw (err);
    }
}

const getAvgProductRating = async (req, res, next) => {
    try {
        let { product_id } = req.params;
        const result = await reviewRepository.getAvgProductRating(product_id);
        return result;
    } catch (err) {
        throw (err);
    }
}

const getRatingCounts = async (req, res, next) => {
    try {
        let reqObj = req.body;
        const result = await reviewRepository.getRatingCounts(reqObj);
        return result;
    } catch (err) {
        throw (err);
    }
}

module.exports = {
    addReview,
    fetchReview,
    getReviewbyId,
    getAvgShopRating,
    getAvgProductRating,
    getRatingCounts
}