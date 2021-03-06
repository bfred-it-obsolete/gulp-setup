'use strict';
// @todo: remove gulp-notify and simply serve a vinyl stream
var notifier = require('node-notifier');
var notify = require('gulp-notify');
var util = require('gulp-util');

function getAdditionalMessage (options) {
	if (options.title && options.title !== 'Gulp notification') {
		return util.colors.magenta(options.title);
	}
	return '';
}

var log = {};
log._message = function (options, callback) {
	util.log(options.title+':', util.colors.magenta(options.message));
	if (callback) {
		callback();
	}
};
log._working = function (options, callback) {
	if (options.message) {
		util.log(util.colors.cyan('⦿'), options.message, getAdditionalMessage(options));
	}
	if (callback) {
		callback();
	}
};
log._done = function (options, callback) {
	if (options.message) {
		util.log(util.colors.green('✓'), options.message, getAdditionalMessage(options));
	}
	if (callback) {
		callback();
	}
};
log._info = function (options, callback) {
	if (options.message) {
		util.log(util.colors.blue('ℹ︎'), options.message, getAdditionalMessage(options));
	}
	if (callback) {
		callback();
	}
};
log._error = function (options, callback) {
	if (options.message) {
		if (options.title === 'Gulp notification' || options.title === 'Error running Gulp') {
			util.log('×', util.colors.red(options.message));
		} else {
			util.log(util.colors.red('×'), options.message, util.colors.red(options.title));
		}
		notifier.notify(options);
	}
	if (callback) {
		callback();
	}
};

//for gulp piping
log.message = notify.withReporter(log._message);
log.working = notify.withReporter(log._working);
log.done = notify.withReporter(log._done);
log.info = notify.withReporter(log._info);
log.error = notify.withReporter(log._error);
log.onError = log.error.onError('<%= error.message %>');

notify.logLevel(0); //disable normal notifications
module.exports = log;
