import set from "101/set";
import doxme from "doxme";
import gutil from "gulp-util";
import {obj as through} from "through2";

var DoxmeError = gutil.PluginError.bind(null, "gulp-doxme");


export default (settings) => {
  return through(function gulpDoxme (file, encoding, done) {
    var data = file.data || (() => {
      try {return JSON.parse(file.contents.toString());}
      catch (error) {done(new DoxmeError(
        "Input must be a valid JSON file."
        ));}
      })();

    var markdown;
    try {markdown = doxme(data);}
    catch (error) {return done(new DoxmeError
      ( "Something went wrong with the doxme call. Here's what doxme says:\n"
      + error.message
      ));}

    done(null
      , set(file, "contents", new Buffer(markdown))
      );
    });
  };
