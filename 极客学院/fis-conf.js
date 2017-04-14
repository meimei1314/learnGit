fis.match('::packager', {
	spriter: fis.plugin('csssprites')
});

fis.match('*.{css,js,png,jpg}', {
	useHash: true
});

fis.match('*.js', {
	optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
    useSprite: true,
    optimizer: fis.plugin('clean-css')
});

fis.match('*.html', {
  optimizer: fis.plugin('html-minifier')
});

fis.match('::package', {
  postpackager: fis.plugin('loader', {
    allInOne: true
  })
});
fis.match('**/*.less', {
    rExt: '.css', // from .less to .css
    parser: fis.plugin('less-2.x', {
        // fis-parser-less-2.x option
    })
});