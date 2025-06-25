## Open Job Shell

```bash
srun --pty --overlap --jobid <job-id> bash
```

## Compiling Flash-Attn

When compiling, use MAX_JOBS=10. The process often fails because of low memory since each JOB takes around 20GB.
