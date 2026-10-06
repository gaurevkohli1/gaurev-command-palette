# Command Center monitor workflow

The public monitor consumes `command-center-status.json` and `gaurev-command-palette.meta.js` from `main`.

## Status compatibility

Keep the canonical scan object at `pipeline.scan` and mirror the same object at top-level `scan` for the v2.15+ browser monitor. The mirror must be content-identical. Keep `history` newest-first with at most 60 records; each record uses `updated_at`, `version`, `summary`, `test_state` and `deploy_state`.

## Release sequence

1. Fetch the current userscript, metadata and status with blob SHAs.
2. Mark scan/build/test/deploy truthfully; never claim browser installation from repository state.
3. Preserve the complete command catalogue, bundles, settings keys and personal intelligence.
4. For code changes, bump both `@version` and the System Monitor `BUILD_VERSION`.
5. Regenerate the metadata file from the userscript header.
6. Run syntax, preservation, duplicate, bundle, metadata, monitor-schema and runtime-anchor checks.
7. Publish userscript, metadata and status with conflict guards. If one write fails, set deploy to blocked and do not report verification.
8. Refetch public raw files, verify bytes/version/hash, then set deploy to verified.
9. Keep history newest-first and cap it at 60 entries.

Allowed states: `not_run`, `scheduled`, `running`, `passed`, `failed`, `prepared`, `published`, `verified`, `blocked`, `skipped`, `idle`, `unknown`.

The public status must never contain private conversation text, secrets, task IDs or private links.
