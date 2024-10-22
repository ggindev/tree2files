![tree2file and folder structure](https://github.com/ggindev/tree2files/blob/master/logo.png?raw=true)

# Tree Structure to Files

Convert text-based tree structures into real directories and files in VS Code.

## Usage

1. `Ctrl+Shift+P` → `Create Folders and Files from Tree Structure`
2. Paste your tree:
```
project
├── src
│   ├── index.js
│   └── styles.css
└── package.json
```
3. Press Enter

## Supported Formats

```
# Basic
root
└── file.txt

# Standard Tree
root
├── folder
│   └── file.txt
└── config.json

# Inline Files
root
└── folder file1.txt file2.txt
```

## Key Features

- Creates nested directories and files
- Handles common tree symbols (├, │, └, ─)
- Skips existing files/folders
- Works with multiple files per line

## Next Up

1. File Templates
   - Basic content for package.json, tsconfig.json
   - Custom templates support

2. Enhanced UX
   - Tree preview
   - Structure validation
   - Quick undo

3. Import/Export
   - Copy from folders
   - Save templates

## Issues?

Open an issue with your tree structure and expected result.
