all:
	uglifyjs --compress --mangle --mangle-props 1 --mangle-regex="/^m_/" -o assets/affinity.min.js -- src/js/*.js
	cleancss -o assets/affinity.min.css $(wildcard src/css/*.css)
