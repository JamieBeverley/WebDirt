import init, { processCoarse } from 'webdirt-rs';

class MyAudioProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.memory = new WebAssembly.Memory({ initial: 1 }); // Initialize memory
        this.processAudio = processCoarse;
        this.initWasm();
    }

    async initWasm() {
        await init();
        this.inputView = new Float32Array(this.memory.buffer);
        this.ready = true;
    }

    process(inputs, outputs) {
        if (!this.ready) return true; // Check if WASM is ready

        const inputChannelData = inputs[0][0];
        const outputChannelData = outputs[0][0];

        this.inputView.set(inputChannelData);
        this.processAudio();
        outputChannelData.set(this.inputView.subarray(0, inputChannelData.length));

        return true;
    }
}

registerProcessor('coarse-processor-wasm', MyAudioProcessor);
