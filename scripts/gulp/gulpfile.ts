import { generateIconNamesTask } from './generateIconNames';
import { generateIconPathsTask } from './generateIconPaths';
import gulp from 'gulp';
import { series } from 'gulp';

export default series(generateIconNamesTask, generateIconPathsTask);

gulp.task('generateIconNames', generateIconNamesTask);
gulp.task('generateIconPaths', generateIconPathsTask);
