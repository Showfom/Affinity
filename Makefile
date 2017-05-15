commit = $(shell git rev-parse HEAD)
commit_short = $(shell git rev-parse --short HEAD)
comment = Build from $(shell git symbolic-ref --short HEAD)\#$(commit)

all:
	gulp build minify
	cp -f README.md affinity/README.md
	echo $(comment) > affinity/.build
	rm -f build/affinity-$(commit_short).zip
	zip -9llrX build/affinity-$(commit_short).zip affinity