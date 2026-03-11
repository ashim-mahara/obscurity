## Open Job Shell

```bash
srun --pty --overlap --jobid <job-id> bash
```

## Compiling Flash-Attn

When compiling, use MAX_JOBS=10. The process often fails because of low memory since each JOB takes around 20GB.

## Compiling Llama.cpp

You also need to activate the ld-library path like:

```bash
export LD_LIBRARY_PATH=~/miniconda3-aarch64/envs/vllm-aarch64/lib:$LD_LIBRARY_PATH
```

This is for access to build-tools that are a hassle to gain access to with spack. Then build it:

```bash
cmake -B build -DGGML_CUDA=ON -DGGML_CCACHE=OFF -DCMAKE_CUDA_ARCHITECTURE="89;90" -DGGML_NATIVE=OFF -DBUILD_SHARED_LIBS=OFF && cmake --build build --config Release -j72
```

The DBUILD_SHARED_LIBS=OFF helps the server is the libcuda-art.so missing stuff.
