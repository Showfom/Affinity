all: js css

js:
	uglifyjs --compress --mangle --mangle-props 1 --mangle-regex="/^m_/" -o assets/affinity.min.js -- src/js/*.js

css:
	cleancss -o assets/affinity.min.css $(wildcard src/css/*.css)
