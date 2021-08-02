//****************************************************************
//--------------------------gulpfile.js---------------------------
//::S J Saha::
//Make sure you copy this file to the WebContent folder
//of your Fiori app project in Eclipse workspace
//It is safe to close Eclipse while working with the files - 
//gulpfile.js and gulpcmd.bat
//*****************************************************************
var gulp = require('gulp');
var tap = require('gulp-tap');
var fs = require('fs');
var path = require('path');
var uglify = require('gulp-uglify');
var prettyData = require('gulp-pretty-data');
//********
var sMyAppName = "capml1"; //****Change it to your app name before you run gulpcmd.bat
//********
var sFilename = "Component-preload";
var oComp = {
	name : sMyAppName + "/" + sFilename,
	version : "0.1.0",
	modules : {}
};

gulp.task('streamifyComponentJS', function () {
	console.log('start ComponentJS');
	return gulp.src('Component.js')
	.pipe(uglify())
	.pipe(tap(function (file, t) {
			fPath = sMyAppName + '/' + path.basename(file.path);
			oComp.modules[fPath] = file._contents.toString();
			console.log(fPath.toString());
			console.log('__________________');
		}));
	console.log('end ComponentJS');
});

gulp.task('streamifyViewXML', ['streamifyComponentJS'], function () {
	console.log('start ViewXML');
	return gulp.src('./view/*.xml')
	.pipe(prettyData({
			type : 'minify',
			preserveComments : false
		}))
	.pipe(tap(function (file, t) {
			var fPath = sMyAppName + '/view/' + path.basename(file.path);
			oComp.modules[fPath] = file._contents.toString();
			console.log(fPath.toString());
			console.log('__________________');
		}));
	console.log('end ViewXML');
});

gulp.task('streamifyViewJS', ['streamifyViewXML'], function () {
	console.log('start ViewJS');
	return gulp.src('./view/*.js')
	.pipe(uglify())
	.pipe(tap(function (file, t) {
			fPath = sMyAppName + '/view/' + path.basename(file.path);
				oComp.modules[fPath] = file._contents.toString();
			console.log(fPath.toString());
			console.log('__________________');
		}));
	console.log('end ViewJS');
});

gulp.task('streamifyUtilsJS', ['streamifyViewJS'], function () {
	console.log('start UtilsJS');
	return gulp.src('./utils/*.js')
	.pipe(uglify())
	.pipe(tap(function (file, t) {
			fPath = sMyAppName + '/utils/' + path.basename(file.path);
				oComp.modules[fPath] = file._contents.toString();
			console.log(fPath.toString());
			console.log('__________________');
		}));
	console.log('end UtilsJS');
});

gulp.task('streamifyModelJSON', ['streamifyUtilsJS'], function () {
	console.log('start ModelJSON');
	return gulp.src('./model/*.json')
	.pipe(prettyData({
			type : 'minify',
			preserveComments : false
		}))
	.pipe(tap(function (file, t) {
			fPath = sMyAppName + '/model/' + path.basename(file.path);
				oComp.modules[fPath] = file._contents.toString();
			console.log(fPath.toString());
			console.log('__________________');
		}));
	console.log('end ModelJSON');
});
gulp.task('streamifyModelXML', ['streamifyModelJSON'], function () {
	console.log('start ModelXML');
	return gulp.src('./model/*.xml')
	.pipe(prettyData({
			type : 'minify',
			preserveComments : false
		}))
	.pipe(tap(function (file, t) {
			fPath = sMyAppName + '/model/' + path.basename(file.path);
				oComp.modules[fPath] = file._contents.toString();
			console.log(fPath.toString());
			console.log('__________________');
		}));
	console.log('end ModelXML');
});

gulp.task('myWriteToFile', ['streamifyModelXML'], function () {
	console.log('start writefile');
	var sFileTmp = "jQuery.sap.registerPreloadedModules(" + JSON.stringify(oComp) + ")";
	var sFileNameQ = sFilename + ".js"; //Component-preload.js;
	fs.writeFile(sFileNameQ, sFileTmp,
		function (err) {
		if (err) {
			console.log('It is ERROR!');
			throw err;
		}
		console.log('It is saved!');
	});
	console.log('end writefile');
});

gulp.task('default', ['myWriteToFile']);
