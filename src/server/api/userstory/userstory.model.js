'use strict';

var mongoose = require('mongoose');

var UserStorySchema = new mongoose.Schema({
	title: String,
	description: String,
	state: String,
	project: String,
	sprint: {type: String, default: null},
	number: Number,
	priority: Number,
	difficulty: Number,
	updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model("UserStory", UserStorySchema);