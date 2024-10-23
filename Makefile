webpack:
	npx webpack
	cp -f js-src/AudioWorklets.js dist/AudioWorklets.js

purs:
	spago build

profile: webpack
	cp -r dist/* profiling/test-app/WebDirt