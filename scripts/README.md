# scripts

This folder stores reusable scripts.

Recommended subfolders:

- `powershell/`
- `python/`
- `ahk/`

Scripts should include comments explaining their purpose, expected inputs, and usage.

## Python

| Script | Purpose |
|--------|---------|
| `python/weekly_review_scan.py` | 未決事項の機械スキャン（週次レビュー Automation の補助） |
| `renderer-demos/` | 描画エンジン比較デモ（Remotion / PixiJS / Three.js 等のブラウザプレビュー） |

```bash
python3 scripts/python/weekly_review_scan.py
cd scripts/renderer-demos && npm install && npm run dev
```
