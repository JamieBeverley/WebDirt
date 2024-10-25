webpack:
	npx webpack
	cp -f js-src/AudioWorklets.js dist/AudioWorklets.js
	cp -f js-src/AudioWorkletsWasm.js dist/AudioWorkletsWasm.js

purs:
	spago build

profile: webpack
	cp -r dist/* profiling/test-app/WebDirt