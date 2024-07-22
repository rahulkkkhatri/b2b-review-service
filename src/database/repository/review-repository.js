const { reviewModel } = require('../models');
const mongoose = require("mongoose");

const addReview = async (reviewInputs) => {
    try {
        const reviewDetail = new reviewModel({ ...reviewInputs });
        const result = await reviewDetail.save();
        return result;
    } catch (err) {
        throw (err);
    }
}

const getReviewList = async (reviewInputs, page, pageSize) => {
    try {
        let condition = {}, result = {}, pipelineList = [];
        if (reviewInputs && reviewInputs.rating) {
            condition['rating'] = reviewInputs.rating;
        }
        if (reviewInputs && reviewInputs.shop_id) {
            condition['shop_id'] = mongoose.Types.ObjectId(reviewInputs.shop_id)
        }
        if (reviewInputs && reviewInputs.product_id) {
            condition['product_id'] = mongoose.Types.ObjectId(reviewInputs.product_id)
        }
        if (reviewInputs && reviewInputs.customer_id) {
            condition['customer_id'] = mongoose.Types.ObjectId(reviewInputs.customer_id)
        }
        pipelineList.push({
            $match: condition
        })
        pipelineList.push({
            $lookup: {
                from: 'products',
                localField: "product_id",
                foreignField: "_id",
                as: "productData"
            }
        })
        pipelineList.push({
            $lookup: {
                from: 'shopdatas',
                localField: "customer_id",
                foreignField: "_id",
                as: "customerData"
            }
        })

        if (page && pageSize) {
            result['data'] = await reviewModel.aggregate([
                ...pipelineList,
                { $skip: (page - 1) * pageSize },
                { $limit: +pageSize }
            ])
        } else {
            result['data'] = await reviewModel.aggregate([
                ...pipelineList
            ])
        }
        result['total'] = await reviewModel.find(condition).count();
        return result
    } catch (err) {
        throw (err);
    }
}

const getReviewbyId = async (id) => {
    try {
        let condition = {}, result, pipelineList = [];
        if (id) {
            condition['_id'] = mongoose.Types.ObjectId(id)
        }
        pipelineList.push({
            $match: condition
        })
        pipelineList.push({
            $lookup: {
                from: 'products',
                localField: "product_id",
                foreignField: "_id",
                as: "productData"
            }
        })
        pipelineList.push({
            $lookup: {
                from: 'shopdatas',
                localField: "customer_id",
                foreignField: "_id",
                as: "customerData"
            }
        })
        result = await reviewModel.aggregate([
            ...pipelineList
        ])
        return result
    } catch (err) {
        throw (err);
    }
}

const getAvgShopRating = async (shop_id) => {
    try {
        let condition = {}, result, pipelineList = [];
        if (shop_id) {
            condition['shop_id'] = mongoose.Types.ObjectId(shop_id);
        }
        // condition['review_type'] = 'SHOP';
        pipelineList.push({
            $match: condition
        })
        pipelineList.push({
            $group: { "_id": "$shop_id", "avg_rating": { $avg: "$rating" } }
        })

        result = await reviewModel.aggregate([
            ...pipelineList
        ])
        return result
    } catch (err) {
        throw (err);
    }
}

const getAvgProductRating = async (product_id) => {
    try {
        let condition = {}, result, pipelineList = [];
        if (product_id) {
            condition['product_id'] = mongoose.Types.ObjectId(product_id);
        }
        condition['review_type'] = 'PRODUCT';
        pipelineList.push({
            $match: condition
        })
        pipelineList.push({
            $group: { "_id": "$product_id", "avg_rating": { $avg: "$rating" } }
        })

        result = await reviewModel.aggregate([
            ...pipelineList
        ])
        return result
    } catch (err) {
        throw (err);
    }
}

const getRatingCounts = async (reviewInputs) => {
    try {
        let condition = {}, pipelineList = [];
        if (reviewInputs && reviewInputs.shop_id) {
            condition['shop_id'] = mongoose.Types.ObjectId(reviewInputs.shop_id);
        }
        pipelineList.push({
            $match: condition
        })
        let total = await reviewModel.aggregate([
            ...pipelineList,
            { $group: {
                "_id": "$rating",
                "sum": { $sum: 1 }
            } },
            { $sort: {
                "_id": -1
            }}
        ])
        return total
    } catch (err) {
        throw (err);
    }
}

module.exports = {
    addReview,
    getReviewList,
    getReviewbyId,
    getAvgShopRating,
    getAvgProductRating,
    getRatingCounts
}